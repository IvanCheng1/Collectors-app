import React, { Component } from "react";
import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import {
  Image,
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
  useColorScheme,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AddStackParamList } from "./AddStack";
import { rootState } from "../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import { AllActionTypes } from "../store/actions";
import { RouteProp } from "@react-navigation/native";
import { bindActionCreators } from "redux";
import { handleAddItem } from "../store/actions/itemActions";
import { createItemObject, dateToDisplay } from "../utils/functions";
import { IItem } from "../store/reducers/itemReducer";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScrollView } from "react-native-gesture-handler";
import { useDarkMode } from "react-native-dynamic";
import Constants from "expo-constants";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

type StateKey = "name" | "description" | "image" | "city";

interface IProps {
  route: RouteProp<AddStackParamList, "NewItem">;
  navigation: StackNavigationProp<AddStackParamList>;
}

interface IState {
  name: string;
  id: string;
  description: string;
  image: string;
  city: string;
  dateCreated: Date;
  showDatePicker: boolean;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class NewItem extends React.Component<Props, IState> {
  state = {
    name: "",
    id: "",
    description: "",
    image: "",
    city: "",
    dateCreated: new Date(),
    showDatePicker: false,
  };

  componentDidMount() {
    this.resetState();
  }

  changeStateValues = (value: string, stateKey: StateKey): void => {
    switch (stateKey) {
      case "name":
        this.setState({ name: value });
        return;
      case "description":
        this.setState({ description: value });
        return;
      case "city":
        this.setState({ city: value });
        return;
    }
  };

  getPermissionAsync = async () => {
    if (Constants.platform?.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        // alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  pickImage = async () => {
    this.getPermissionAsync();

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getCameraPermissionAsync = async () => {
    if (Constants.platform?.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted") {
        // alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  cameraRoll = async () => {
    this.getCameraPermissionAsync();

    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      // console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  showDatePicker = (): void => {
    this.setState((prev) => ({
      showDatePicker: !prev.showDatePicker,
    }));
  };

  changeDate = (date: Date) => {
    this.setState({
      dateCreated: date,
      showDatePicker: false,
    });
  };

  onSubmit = (): void => {
    const { name, description, image, city, dateCreated } = this.state;
    const { collection } = this.props.route.params;

    const item = createItemObject(
      name,
      collection,
      description,
      city,
      image,
      dateCreated
    );

    this.props.handleAddItem(item);
    // clear state to do
    this.resetState();

    // go home
    this.props.navigation.navigate("AddQuestion");
  };

  resetState = (): void => {
    this.setState({
      name: "",
      description: "",
      image: "",
      city: "",
      dateCreated: new Date(),
      showDatePicker: false,
    });
  };

  render() {
    const { route } = this.props;
    const {
      name,
      description,
      image,
      city,
      showDatePicker,
      dateCreated,
    } = this.state;

    // const isDarkMode = useColorScheme() === 'dark';

    return (
      <SafeAreaView style={myStyles.container}>
        <ScrollView>
          <View style={myStyles.imgPlaceHolder}>
            {image ? (
              <Image style={myStyles.img} source={{ uri: image }} />
            ) : (
              <Text>No photo</Text>
            )}
          </View>
          <View style={myStyles.btnBar}>
            <TouchableOpacity
              style={myStyles.btnBarButtons}
              onPress={this.pickImage}
            >
              {Platform.OS === "android" ? (
                <MaterialCommunityIcons
                  name="google-photos"
                  size={24}
                  color="black"
                />
              ) : (
                <FontAwesome name="photo" size={24} color="black" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={myStyles.btnBarButtons}
              onPress={this.cameraRoll}
            >
              <View>
                <AntDesign name="camera" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          <TextInput
            style={myStyles.input}
            placeholder="Item Name"
            value={name}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              this.changeStateValues(e.nativeEvent.text, "name")
            }
          />
          <TextInput
            style={myStyles.input}
            placeholder="Description"
            value={description}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              this.changeStateValues(e.nativeEvent.text, "description")
            }
          />
          <TextInput
            style={myStyles.input}
            placeholder="City"
            value={city}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              this.changeStateValues(e.nativeEvent.text, "city")
            }
          />

          <TouchableOpacity style={myStyles.btn} onPress={this.showDatePicker}>
            <Text style={myStyles.btnText}>{dateToDisplay(dateCreated)}</Text>
            {/* <Text style={myStyles.btnText}>Change date</Text> */}
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={showDatePicker}
            date={dateCreated}
            mode="date"
            onConfirm={this.changeDate}
            onCancel={this.showDatePicker}
            // pickerContainerStyleIOS={{ color: "white" }}
            // textColor={isDarkMode ? "white" : undefined}
          />

          <TouchableOpacity style={myStyles.btn} onPress={this.onSubmit}>
            <Text style={myStyles.btnText}>
              Save Item to {route.params.collection}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

interface LinkStateProps {}

interface LinkDispatchProps {
  handleAddItem: (item: IItem) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({
  handleAddItem: bindActionCreators(handleAddItem, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewItem);

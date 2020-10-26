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
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AddStackParamList } from "./AddStack";
import { rootState } from "../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import { AllActionTypes } from "../store/actions";
import { RouteProp } from "@react-navigation/native";
import { bindActionCreators } from "redux";
import {
  handleAddItem,
  handleDeleteItem,
  handleEditItem,
} from "../store/actions/itemActions";
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
import RNPickerSelect from "react-native-picker-select";
// import { Picker } from "@react-native-community/picker";
import { ICollection } from "../store/reducers/collectionReducer";
import { CollectionStackParamList } from "./CollectionStack";
import Item from "./Item";

type StateKey = "name" | "description" | "image" | "city";

interface IProps {
  route: RouteProp<CollectionStackParamList, "NewItem">;
  navigation: StackNavigationProp<CollectionStackParamList>;
}

interface IState {
  name: string;
  id: string;
  description: string;
  image: string;
  city: string;
  collection: string;
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
    collection: "",
    dateCreated: new Date(),
    showDatePicker: false,
  };

  componentDidMount() {
    if (this.props.route.params?.id) {
      // edit mode
      const { id } = this.props.route.params;
      const oldItem: IItem = this.props.items.filter((i) => i.id === id)[0];

      this.setState({
        name: oldItem.name,
        description: oldItem.description,
        image: oldItem.image,
        city: oldItem.city,
        collection: oldItem.collection,
        id,
        dateCreated: oldItem.dateCreated,
      });
    } else {
      // new mode
      // this.resetState();
      this.setState({
        collection: this.props.route.params.collection,
      });
    }
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

  changeCollection = (value: string | number): void => {
    if (typeof value === "string") {
      this.setState({
        collection: value,
      });
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

  onDelete = (): void => {
    // check first

    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete ${this.state.name} from ${this.state.collection}?`,
      [
        {
          text: "Delete",
          onPress: () => {
            const collection = this.props.collections.filter(
              (c) => c.name === this.state.collection
            )[0];

            // store
            this.props.handleDeleteItem(this.state.id);

            // clear state
            this.resetState();

            // go back to collection
            this.props.navigation.goBack();
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  onSubmit = (): void => {
    const {
      name,
      description,
      image,
      city,
      dateCreated,
      collection,
    } = this.state;
    // const { collection } = this.props.route.params;

    let id: string;

    if (this.props.route.params?.id) {
      // edit mode
      id = this.props.route.params.id;
      const newItem: IItem = createItemObject(
        name,
        collection,
        description,
        city,
        image,
        dateCreated,
        id
      );

      this.props.handleEditItem(id, newItem);
    } else {
      // new mode
      const item = createItemObject(
        name,
        collection,
        description,
        city,
        image,
        dateCreated
      );

      id = item.id;
      this.props.handleAddItem(item);
    }

    // clear state
    this.resetState();

    // to do - check if collection is changed

    // go home
    this.props.navigation.goBack();
    // this.props.navigation.navigate("Item", {
    //   id,
    //   title: name,
    //   collection,
    //   sort: "Alphabetical",
    // });
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
    const { route, collections } = this.props;
    const {
      name,
      description,
      image,
      city,
      showDatePicker,
      dateCreated,
      collection,
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

          {route.params?.id && (
            <>
              <Text style={myStyles.btnText}>Change collection</Text>

              <RNPickerSelect
                onValueChange={(value: string) => {
                  this.changeCollection(value);
                }}
                items={collections.map((c) => {
                  return {
                    label: c.name,
                    value: c.name,
                    key: c.id,
                  };
                })}
                value={collection}
                // placeholder="hi"
                // useNativeAndroidPickerStyle={false}
                // textInputProps={{ color: "black" }}
                style={myStyles}
              />

              <TouchableOpacity
                style={[myStyles.btn, myStyles.btnDark]}
                onPress={this.onDelete}
              >
                <Text style={myStyles.btnText}>Delete Item</Text>
              </TouchableOpacity>
            </>
          )}

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

interface LinkStateProps {
  items: IItem[];
  collections: ICollection[];
}

interface LinkDispatchProps {
  handleAddItem: (item: IItem) => void;
  handleEditItem: (id: string, newItem: IItem) => void;
  handleDeleteItem: (id: string) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  items: state.item,
  collections: state.collection,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({
  handleAddItem: bindActionCreators(handleAddItem, dispatch),
  handleEditItem: bindActionCreators(handleEditItem, dispatch),
  handleDeleteItem: bindActionCreators(handleDeleteItem, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewItem);

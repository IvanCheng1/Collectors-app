import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { IItem } from "../store/reducers/itemReducer";
import { rootState } from "../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import {
  CollectionActionTypes,
  handleAddCollection,
  handleEditCollection,
} from "../store/actions/collectionActions";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  createCollectionObject,
  generateCollectionPicture,
} from "../utils/functions";
import { ICollection } from "../store/reducers/collectionReducer";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { StackNavigationProp } from "@react-navigation/stack";
import { CollectionStackParamList } from "./CollectionStack";
import { AddStackParamList } from "./AddStack";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { handleEditItemForCollection } from "../store/actions/itemActions";

interface IProps {
  route: RouteProp<CollectionStackParamList, "NewCollection">;
  navigation: StackNavigationProp<CollectionStackParamList>;
}

interface IState {
  name: string;
  id: string;
  image: string;
  dateCreated: Date;
  oldCollectionName: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class NewCollection extends React.Component<Props, IState> {
  state = {
    name: "",
    id: "",
    image: "",
    dateCreated: new Date(), // bypass
    oldCollectionName: "",
  };

  componentDidMount() {
    // check if new collection or edit collection
    if (this.props.route.params?.id) {
      // edit collection

      const { id } = this.props.route.params;
      const collection = this.props.collections.filter((c) => c.id === id)[0];
      this.setState({
        name: collection.name,
        id,
        image: collection.image,
        dateCreated: collection.dateCreated,
        oldCollectionName: collection.name,
      });
    } else {
      // new collection
      this.clearState();
    }
  }

  changeName = (value: string): void => {
    this.setState({
      name: value,
    });
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

      // console.log(result);
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

  onSubmit = (): void => {
    const { name, id, dateCreated, oldCollectionName, image } = this.state;
    if (this.props.route.params?.id) {
      // edit collection
      const newCollection: ICollection = createCollectionObject(
        name,
        dateCreated,
        image,
        id
      );

      this.props.handleEditCollection(id, newCollection);
      this.props.handleEditItemForCollection(oldCollectionName, name);
    } else {
      // new collection
      const collection = createCollectionObject(name, new Date(), image);

      this.props.handleAddCollection(collection);
    }
    // clear state to do
    this.clearState();

    // go home to do
    this.props.navigation.goBack();
    this.props.navigation.navigate("Items", { id, collection: name });
  };

  clearState = (): void => {
    this.setState({
      name: "",
      id: "",
      image: "",
      dateCreated: new Date(),
      oldCollectionName: "",
    });
  };

  render() {
    const { name, image, id } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={myStyles.container}
          keyboardVerticalOffset={200}
        >
          <>
            <View style={myStyles.imgPlaceHolder}>
              {image ? (
                <Image style={myStyles.img} source={{ uri: image }} />
              ) : (
                <Text>No Photo Selected</Text>
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
              placeholder="Collection name"
              value={name}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                this.changeName(e.nativeEvent.text)
              }
            />
            <TouchableOpacity
              style={myStyles.btn}
              onPress={() => this.onSubmit()}
            >
              <Text style={myStyles.btnText}>Save Collection</Text>
            </TouchableOpacity>
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

interface LinkStateProps {
  collections: ICollection[];
}

interface LinkDispatchProps {
  handleAddCollection: (collection: ICollection) => void;
  handleEditCollection: (id: string, newCollection: ICollection) => void;
  handleEditItemForCollection: (
    oldCollectionName: string,
    newCollectionName: string
  ) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  collections: state.collection,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, CollectionActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({
  handleAddCollection: bindActionCreators(handleAddCollection, dispatch),
  handleEditCollection: bindActionCreators(handleEditCollection, dispatch),
  handleEditItemForCollection: bindActionCreators(
    handleEditItemForCollection,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCollection);

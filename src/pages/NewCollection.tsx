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
  Dimensions,
} from "react-native";
import { IItem } from "../store/reducers/itemReducer";
import { rootState } from "../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import {
  CollectionActionTypes,
  handleAddCollection,
  handleDeleteCollection,
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
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import {
  handleDeleteItemForCollection,
  handleEditItemForCollection,
} from "../store/actions/itemActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface IProps {
  route: RouteProp<CollectionStackParamList, "NewCollection">;
  navigation: StackNavigationProp<CollectionStackParamList>;
}

interface IState {
  name: string;
  id: string;
  image: string;
  dateCreated: number;
  oldCollectionName: string;
  height: number;
  width: number;
  orientation: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class NewCollection extends React.Component<Props, IState> {
  state = {
    name: "",
    id: "",
    image: "",
    dateCreated: 0,
    oldCollectionName: "",
    height: 0,
    width: 0,
    orientation: "",
  };

  componentDidMount() {
    // check if new collection or edit collection
    if (this.props.route.params?.id) {
      // edit collection

      const { id } = this.props.route.params;
      const collection = this.props.collections.filter((c) => c.id === id)[0];

      // this.getImageDimensions(collection.image);

      this.setState({
        name: collection.name,
        id,
        image: collection.image,
        dateCreated: collection.dateCreated,
        oldCollectionName: collection.name,
        // orientation: collection.orientation,
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
        // allowsEditing: true,
        // aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({
          image: result.uri,
          orientation: result.height > result.width ? "portrait" : "landscape",
        });
        // this.getImageDimensions(result.uri);
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
        this.setState({
          image: result.uri,
          orientation: result.height > result.width ? "portrait" : "landscape",
        });
        // this.getImageDimensions(result.uri);
      }

      // console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  onSubmit = (): void => {
    const {
      name,
      id,
      dateCreated,
      oldCollectionName,
      image,
      orientation,
    } = this.state;
    if (this.props.route.params?.id) {
      // edit collection
      const newCollection: ICollection = createCollectionObject(
        name,
        image,
        orientation,
        dateCreated,
        id
      );

      this.props.handleEditCollection(id, newCollection);
      this.props.handleEditItemForCollection(oldCollectionName, name);
    } else {
      // new collection
      const collection = createCollectionObject(name, image, orientation);

      this.props.handleAddCollection(collection);
    }
    // clear state to do
    this.clearState();

    // go home to do
    this.props.navigation.goBack();
    this.props.navigation.navigate("Items", { id, collection: name });
  };

  onDelete = () => {
    const { items } = this.props;
    const numberOfItems = items.filter((i) => i.collection === this.state.name)
      .length;

    Alert.alert(
      "Delete Collection",
      `This will delete the collection and ${numberOfItems} item${
        numberOfItems === 0 || (numberOfItems > 1 ? "s" : "")
      } inside. Are you sure?`,
      [
        {
          text: "Delete",
          onPress: () => {
            this.props.handleDeleteCollection(this.state.id);
            this.props.handleDeleteItemForCollection(this.state.name);
            this.props.navigation.goBack();
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  // getImageDimensions = (imageURI: string): void => {
  //   Image.getSize(imageURI, (w, h) => {
  //     let factor: number;

  //     if (w > h) {
  //       const windowWidth = Dimensions.get("window").width;
  //       factor = w / (windowWidth * 0.9);
  //     } else {
  //       factor = h / 350;
  //     }

  //     this.setState({
  //       height: h / factor,
  //       width: w / factor,
  //     });
  //   });
  // };

  clearState = (): void => {
    this.setState({
      name: "",
      id: "",
      image: "",
      dateCreated: 0,
      oldCollectionName: "",
    });
  };

  render() {
    const { name, image, id, height, width, orientation } = this.state;
    const { route } = this.props;
    return (
      <SafeAreaView style={myStyles.container}>
        <KeyboardAwareScrollView>
          <View style={myStyles.containerTop}>
            {image ? (
              <Image
                style={[
                  myStyles.imgEdit,
                  orientation === "portrait"
                    ? myStyles.imgPortrait
                    : myStyles.imgLandscape,
                ]}
                source={{ uri: image }}
              />
            ) : (
              <View style={myStyles.imgPlaceHolder}>
                <Text>No Photo Selected</Text>
              </View>
            )}
            <View style={myStyles.btnBar}>
              <TouchableOpacity
                style={myStyles.btnBarButtons}
                onPress={this.pickImage}
              >
                {Platform.OS === "android" ? (
                  <MaterialCommunityIcons
                    name="google-photos"
                    size={24}
                    color="white"
                  />
                ) : (
                  <FontAwesome name="photo" size={24} color="white" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={myStyles.btnBarButtons}
                onPress={this.cameraRoll}
              >
                <View>
                  <AntDesign name="camera" size={24} color="white" />
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

            {route.params?.id && (
              <TouchableOpacity
                style={[myStyles.btn, myStyles.btnDark]}
                onPress={this.onDelete}
              >
                <Text style={myStyles.btnText}>Delete Collection</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={myStyles.btn}
              onPress={() => this.onSubmit()}
            >
              <Text style={myStyles.btnText}>Save Collection</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

interface LinkStateProps {
  collections: ICollection[];
  items: IItem[];
}

interface LinkDispatchProps {
  handleAddCollection: (collection: ICollection) => void;
  handleEditCollection: (id: string, newCollection: ICollection) => void;
  handleEditItemForCollection: (
    oldCollectionName: string,
    newCollectionName: string
  ) => void;
  handleDeleteCollection: (id: string) => void;
  handleDeleteItemForCollection: (collection: string) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  collections: state.collection,
  items: state.item,
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
  handleDeleteCollection: bindActionCreators(handleDeleteCollection, dispatch),
  handleDeleteItemForCollection: bindActionCreators(
    handleDeleteItemForCollection,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCollection);

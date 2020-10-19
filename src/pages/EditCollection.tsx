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
  Alert,
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
import { RouteProp } from "@react-navigation/native";
import { CollectionStackParamList } from "./CollectionStack";
import { ICollection } from "../store/reducers/collectionReducer";
import { handleEditItemForCollection } from "../store/actions/itemActions";
import { StackNavigationProp } from "@react-navigation/stack";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { createCollectionObject, dateToString } from "../utils/functions";

interface IProps {
  route: RouteProp<CollectionStackParamList, "EditCollection">;
  navigation: StackNavigationProp<CollectionStackParamList>;
}

interface IState {
  name: string;
  id: string;
  dateCreated: Date;
  oldCollectionName: string;
  image: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class EditCollection extends React.Component<Props, IState> {
  state = {
    name: "",
    id: "",
    dateCreated: new Date(), // bypass TypeScript
    oldCollectionName: "",
    image: "",
  };

  componentDidMount() {
    const { id } = this.props.route.params;
    const collection = this.props.collections.filter((c) => c.id === id)[0];
    this.setState({
      name: collection.name,
      id,
      dateCreated: collection.dateCreated,
      oldCollectionName: collection.name,
    });
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
        Alert.alert(
          "Sorry, we need camera roll permissions to make this work!"
        );
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

  onSubmit = (): void => {
    const { name, id, dateCreated, oldCollectionName, image } = this.state;
    // const newCollection: ICollection = {
    //   name,
    //   id,
    //   dateCreated,
    //   dateModified: new Date(),
    //   image: "",
    // };

    const newCollection: ICollection = createCollectionObject(
      name,
      dateToString(dateCreated),
      image,
      id
    );

    // to store for collection and items
    this.props.handleEditCollection(this.state.id, newCollection);
    this.props.handleEditItemForCollection(
      oldCollectionName,
      newCollection.name
    );
    // clear state to do
    this.setState({
      name: "",
      id: "",
      dateCreated: new Date(), // bypass TypeScript
      oldCollectionName: "",
      image: "",
    });

    // go back
    this.props.navigation.navigate("Items", {
      id,
      collection: newCollection.name,
    });
  };

  render() {
    const { name, id, image } = this.state;
    return (
      <SafeAreaView style={myStyles.container}>
        <ScrollView>
          <KeyboardAvoidingView>
            <Text>Edit Collection page</Text>

            <TouchableOpacity
              onPress={this.pickImage}
              style={{ marginBottom: 20 }}
            >
              {image ? (
                <Image style={myStyles.img} source={{ uri: image }} />
              ) : (
                <View style={myStyles.imgPlaceHolder}>
                  <Text>Choose Image</Text>
                </View>
              )}
            </TouchableOpacity>

            <TextInput
              style={myStyles.input}
              placeholder="Collection name"
              value={name}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                this.changeName(e.nativeEvent.text)
              }
            />
            <TouchableOpacity style={myStyles.btn} onPress={this.onSubmit}>
              <Text style={myStyles.btnText}>Save Collection</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

interface LinkStateProps {
  collections: ICollection[];
}

interface LinkDispatchProps {
  handleEditCollection: (id: string, newCollection: ICollection) => void;
  handleEditItemForCollection: (
    oldCollection: string,
    newCollection: string
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
  handleEditCollection: bindActionCreators(handleEditCollection, dispatch),
  handleEditItemForCollection: bindActionCreators(
    handleEditItemForCollection,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCollection);

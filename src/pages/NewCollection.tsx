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
} from "react-native";
import { IItem } from "../store/reducers/itemReducer";
import { rootState } from "../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import {
  CollectionActionTypes,
  handleAddCollection,
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

interface IProps {
  navigation: StackNavigationProp<AddStackParamList, "AddQuestion">;
}

interface IState {
  collectionName: string;
  image: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class NewCollection extends React.Component<Props, IState> {
  state = {
    collectionName: "",
    image: "",
  };

  changeName = (value: string): void => {
    this.setState({
      collectionName: value,
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

  onSubmit = (): void => {
    const collection = createCollectionObject(
      this.state.collectionName,
      "2020-02-02",
      this.state.image
    );

    this.props.handleAddCollection(collection);
    // clear state to do
    this.setState({
      collectionName: "",
      image: "",
    });

    // go home to do
    this.props.navigation.navigate("AddQuestion");
  };

  render() {
    const { collectionName, image } = this.state;
    return (
      <SafeAreaView style={myStyles.container}>
        <ScrollView>
          <KeyboardAvoidingView>
            <Text>New Collection page</Text>

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
              value={collectionName}
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
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

interface LinkStateProps {}

interface LinkDispatchProps {
  handleAddCollection: (collection: ICollection) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, CollectionActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({
  handleAddCollection: bindActionCreators(handleAddCollection, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCollection);

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
import { RouteProp } from "@react-navigation/native";
import { CollectionStackParamList } from "./CollectionStack";
import { ICollection } from "../store/reducers/collectionReducer";
import { handleDeleteItem, handleEditItem } from "../store/actions/itemActions";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { createItemObject, dateToString } from "../utils/functions";

type StateKey = "name" | "description" | "city";

interface IProps {
  route: RouteProp<CollectionStackParamList, "EditItem">;
  navigation: StackNavigationProp<CollectionStackParamList>;
}

interface IState {
  name: string;
  description: string;
  image: string;
  city: string;
  collection: string;
  id: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class EditItem extends React.Component<Props, IState> {
  state = {
    name: "",
    description: "",
    image: "",
    city: "",
    collection: "",
    id: "",
  };

  componentDidMount() {
    const { id } = this.props.route.params;
    const oldItem: IItem = this.props.items.filter((i) => i.id === id)[0];

    this.setState({
      name: oldItem.name,
      description: oldItem.description,
      image: oldItem.image,
      city: oldItem.city,
      collection: oldItem.collection,
      id,
    });
  }

  changeStateValues = (value: string, stateKey: StateKey): void => {
    this.setState({
      [stateKey]: value,
    } as Pick<IState, keyof IState>);
  };

  pickImage = async () => {
    // this.getPermissionAsync();

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
    const { id } = this.props.route.params;
    const oldItem: IItem = this.props.items.filter((i) => i.id === id)[0];

    const newItem: IItem = createItemObject(
      this.state.name,
      this.state.collection,
      this.state.description,
      this.state.city,
      this.state.image,
      oldItem.dateCreated,
      this.state.id
    );

    this.props.handleEditItem(id, newItem);
    // clear state
    this.clearState();

    // go back
    this.props.navigation.navigate("Item", {
      id: newItem.id,
      title: newItem.name,
      collection: newItem.collection,
      sort: "alphabetical", // this will be from store.settings
    });
  };

  onDelete = (): void => {
    const collection = this.props.collection.filter(
      (c) => c.name === this.state.collection
    )[0];

    // store
    this.props.handleDeleteItem(this.state.id);

    // clear state
    this.clearState();

    // go back to collection
    this.props.navigation.navigate("Items", {
      id: collection.id,
      collection: collection.name,
    });
  };

  clearState = (): void => {
    this.setState({
      name: "",
      description: "",
      image: "",
      city: "",
      collection: "",
      id: "",
    });
  };

  render() {
    const { name, description, image, city } = this.state;
    return (
      <SafeAreaView style={myStyles.container}>
        <ScrollView>
          <KeyboardAvoidingView>
            <Text>Edit Item page</Text>

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

            <TouchableOpacity style={myStyles.btn} onPress={this.onSubmit}>
              <Text style={myStyles.btnText}>Save Item</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[myStyles.btn, myStyles.btnDark]}
              onPress={this.onDelete}
            >
              <Text style={myStyles.btnText}>Delete Item</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

interface LinkStateProps {
  items: IItem[];
  collection: ICollection[];
}

interface LinkDispatchProps {
  handleEditItem: (id: string, newItem: IItem) => void;
  handleDeleteItem: (id: string) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  items: state.item,
  collection: state.collection,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, CollectionActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({
  handleEditItem: bindActionCreators(handleEditItem, dispatch),
  handleDeleteItem: bindActionCreators(handleDeleteItem, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);

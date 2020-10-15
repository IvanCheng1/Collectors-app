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
import { handleEditItem } from "../store/actions/itemActions";
import { StackNavigationProp } from "@react-navigation/stack";

type StateKey = "name" | "description" | "picture" | "city";

interface IProps {
  route: RouteProp<CollectionStackParamList, "EditItem">;
  navigation: StackNavigationProp<CollectionStackParamList>;
}

interface IState {
  name: string;
  description: string;
  picture: string;
  city: string;
  collection: string;
  id: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class EditItem extends React.Component<Props, IState> {
  state = {
    name: "",
    description: "",
    picture: "",
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
      picture: oldItem.picture,
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

  onSubmit = (): void => {
    const { id } = this.props.route.params;
    const oldItem: IItem = this.props.items.filter((i) => i.id === id)[0];

    const newItem: IItem = {
      ...this.state,
      dateCreated: oldItem.dateCreated,
      dateModified: new Date(),
    };

    this.props.handleEditItem(id, newItem);
    // clear state
    this.setState({
      name: "",
      description: "",
      picture: "",
      city: "",
      collection: "",
      id: "",
    });

    // go back
    this.props.navigation.navigate("Item", {
      id: newItem.id,
      title: newItem.name,
      collection: newItem.collection,
      sort: "alphabetical", // this will be from store.settings
    });
  };

  render() {
    const { name, description, picture, city } = this.state;
    return (
      <SafeAreaView style={myStyles.container}>
        <ScrollView>
          <KeyboardAvoidingView>
            <Text>Edit Item page</Text>
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
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

interface LinkStateProps {
  items: IItem[];
}

interface LinkDispatchProps {
  handleEditItem: (id: string, newItem: IItem) => void;
}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  items: state.item,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, CollectionActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({
  handleEditItem: bindActionCreators(handleEditItem, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);

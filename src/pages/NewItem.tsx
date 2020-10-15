import React, { Component } from "react";
import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import {
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AddStackParamList } from "./AddStack";
import { rootState } from "../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import { AllActionTypes } from "../store/actions";
import { RouteProp } from "@react-navigation/native";
import { bindActionCreators } from "redux";
import { handleAddItem } from "../store/actions/itemActions";

type StateKey = "name" | "description" | "picture" | "city";

interface IProps {
  route: RouteProp<AddStackParamList, "NewItem">;
}

interface IState {
  name: string;
  description: string;
  picture: string;
  city: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class NewItem extends React.Component<Props, IState> {
  state = {
    name: "",
    description: "",
    picture: "",
    city: "",
  };

  changeStateValues = (value: string, stateKey: StateKey): void => {
    this.setState({
      [stateKey]: value,
    } as Pick<IState, keyof IState>);
  };

  onSubmit = (): void => {
    const { name, description, picture, city } = this.state;
    const { collection } = this.props.route.params;
    this.props.handleAddItem(name, collection, description, city, picture);
    // clear state to do
  };

  render() {
    const { route } = this.props;
    const { name, description, picture, city } = this.state;

    return (
      <SafeAreaView style={myStyles.container}>
        <Text>New Item</Text>
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

        <TouchableOpacity
          style={myStyles.btn}
          onPress={this.onSubmit}
        >
          <Text style={myStyles.btnText}>Save Item to {route.params.collection}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

interface LinkStateProps {}

interface LinkDispatchProps {
  handleAddItem: (
    name: string,
    collection: string,
    description: string,
    city: string,
    picture: string
  ) => void;
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

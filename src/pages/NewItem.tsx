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
import { createItemObject, dateToString } from "../utils/functions";
import { IItem } from "../store/reducers/itemReducer";

type StateKey = "name" | "description" | "image" | "city";

interface IProps {
  route: RouteProp<AddStackParamList, "NewItem">;
}

interface IState {
  name: string;
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
    description: "",
    image: "",
    city: "",
    dateCreated: new Date(), // bypass
    showDatePicker: false,
  };

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

  onSubmit = (): void => {
    const { name, description, image, city } = this.state;
    const { collection } = this.props.route.params;

    const item = createItemObject(
      name,
      collection,
      description,
      city,
      image,
      dateToString(new Date())
    );

    this.props.handleAddItem(item);
    // clear state to do
  };

  render() {
    const { route } = this.props;
    const { name, description, image, city } = this.state;

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

        <TouchableOpacity style={myStyles.btn} onPress={this.showDatePicker}>
          <Text style={myStyles.btnText}>Change date</Text>
        </TouchableOpacity>

        <TouchableOpacity style={myStyles.btn} onPress={this.onSubmit}>
          <Text style={myStyles.btnText}>
            Save Item to {route.params.collection}
          </Text>
        </TouchableOpacity>
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

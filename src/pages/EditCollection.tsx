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

interface IProps {
  route: RouteProp<CollectionStackParamList, "EditCollection">;
}

interface IState {
  collectionName: string;
  id: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class EditCollection extends React.Component<Props, IState> {
  state = {
    collectionName: "",
    id: "",
  };

  componentDidMount() {
    const { id } = this.props.route.params;
    const collection = this.props.collections.filter((c) => c.id === id)[0];
    this.setState({
      collectionName: collection.name,
      id,
    });
  }

  changeStateValues = (value: string, stateKey: "collectionName"): void => {
    this.setState({
      [stateKey]: value,
    });
  };

  onSubmit = (): void => {
    console.log("new state is:", this.state);
    // to store for collection and items
    // clear state to do
  };

  render() {
    const { collectionName, id } = this.state;
    return (
      <SafeAreaView style={myStyles.container}>
        <ScrollView>
          <KeyboardAvoidingView>
            <Text>Edit Collection page</Text>
            <TextInput
              style={myStyles.input}
              placeholder="Collection name"
              value={collectionName}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                this.changeStateValues(e.nativeEvent.text, "collectionName")
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

interface LinkStateProps {
  collections: ICollection[];
}

interface LinkDispatchProps {}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  collections: state.collection,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, CollectionActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditCollection);

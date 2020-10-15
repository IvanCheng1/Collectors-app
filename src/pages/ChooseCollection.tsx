import React, { Component } from "react";
import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { rootState } from "../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import { AllActionTypes } from "../store/actions";
import { AddStackParamList } from "./AddStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { ICollection } from "../store/reducers/collectionReducer";

interface IProps {
  navigation: StackNavigationProp<AddStackParamList, "NewItem">;
}

interface IState {}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class ChooseCollection extends React.Component<Props, IState> {
  render() {
    const { navigation, collections } = this.props;

    const orderedCollections = collections.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );

    return (
      <SafeAreaView style={myStyles.container}>
        <Text>
          Loads of collections here. Click to choose which collection to add
          item in.
        </Text>
        {orderedCollections &&
          orderedCollections.map((c) => (
            <TouchableOpacity
              key={c.id}
              onPress={() =>
                navigation.navigate("NewItem", {
                  id: c.id,
                  collection: c.name,
                })
              }
            >
              <Text>{c.name}</Text>
            </TouchableOpacity>
          ))}
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
  dispatch: ThunkDispatch<any, any, AllActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCollection);

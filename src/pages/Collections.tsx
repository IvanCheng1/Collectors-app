import React, { Component } from "react";
import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { collectionInitialState } from "../store/initialStates/collectionInitialState";
import { rootState } from "../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import { CollectionActionTypes } from "../store/actions/collectionActions";
import { ICollection } from "../store/reducers/collectionReducer";

interface IProps {}

interface IState {}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Collections extends React.Component<Props, IState> {
  render() {
    const collections = this.props.collections;
    const { navigation }: any = this.props;
    return (
      <SafeAreaView style={myStyles.container}>
        <Text>Spaceholder for Searchbar</Text>
        <Text>Collections here</Text>
        {collections &&
          collections.map((c) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Items")}
              key={c.name}
            >
              <Text>{c.name}</Text>
            </TouchableOpacity>
          ))}
      </SafeAreaView>
    );
  }
}

interface LinkStateProps {
  collections: ICollection[]
}

interface LinkDispatchProps {}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  collections: state.collection
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, CollectionActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Collections);

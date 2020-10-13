import React, { Component } from "react";
import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { rootState } from "../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import { CollectionActionTypes } from "../store/actions/collectionActions";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./CollectionStack";
import { IItem } from "../store/reducers/itemReducer";

interface IProps {
  navigation: StackNavigationProp<RootStackParamList, "Item">;
  route: RouteProp<RootStackParamList, "Items">;
}

interface IState {}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Items extends React.Component<Props, IState> {
  render() {
    const { navigation, route, items }: Props = this.props;
    const filteredItems = items.filter(
      (i) => i.collection === route.params.collection
    );

    return (
      <SafeAreaView style={myStyles.container}>
        <Text>{route.params.collection} here</Text>

        {filteredItems &&
          filteredItems.map((i) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Item", { title: i.name })}
              key={i.id}
            >
              <Text>Click here for {i.name}</Text>
            </TouchableOpacity>
          ))}
      </SafeAreaView>
    );
  }
}

interface LinkStateProps {
  items: IItem[];
}

interface LinkDispatchProps {}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  items: state.item,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, CollectionActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Items);

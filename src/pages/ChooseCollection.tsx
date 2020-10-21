import React, { Component } from "react";
import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { rootState } from "../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import { AllActionTypes } from "../store/actions";
import { AddStackParamList } from "./AddStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { ICollection } from "../store/reducers/collectionReducer";
import { FlatList } from "react-native-gesture-handler";

interface IProps {
  navigation: StackNavigationProp<AddStackParamList, "NewItem">;
}

interface IState {}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class ChooseCollection extends React.Component<Props, IState> {
  renderItem = (c: ICollection) => {
    const { navigation } = this.props;
    const image = c.image ? { uri: c.image } : require("../images/books.jpg");

    return (
      <TouchableOpacity
        key={c.id}
        onPress={() =>
          navigation.navigate("NewItem", {
            id: c.id,
            collection: c.name,
          })
        }
      >
        <Image style={myStyles.imageList} source={image} />
        <Text>{c.name}</Text>
      </TouchableOpacity>
    );
  };

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
        {orderedCollections && (
          <FlatList
            data={orderedCollections}
            numColumns={2}
            renderItem={({ item }) => this.renderItem(item)}
          />
        )}
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

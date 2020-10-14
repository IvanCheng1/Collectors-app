import React, { Component } from "react";
import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { rootState } from "../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import { CollectionActionTypes } from "../store/actions/collectionActions";
import { ICollection } from "../store/reducers/collectionReducer";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./CollectionStack";
import { Sort } from "../utils/types";

interface IProps {
  navigation: StackNavigationProp<RootStackParamList, "Items">;
  route: RouteProp<RootStackParamList, "Collections">;
}

interface IState {
  sort: Sort;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Collections extends React.Component<Props, IState> {
  state = {
    sort: "alphabetical" as Sort,
  };

  render() {
    const { collections, navigation }: Props = this.props;
    const { sort } = this.state;

    const orderedCollections = collections.sort((a, b) => {
      if (sort === "alphabetical") {
        return a.name > b.name ? 1 : -1;
      } else if (sort === "date descending") {
        return b.dateCreated.getTime() - a.dateCreated.getTime();
      }
      return 1;
    });

    return (
      <SafeAreaView style={myStyles.container}>
        <Text>Spaceholder for Searchbar</Text>

        <TouchableOpacity
          onPress={() => {
            this.setState({
              sort: "date descending",
            });
          }}
        >
          <Text>sort by date descending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              sort: "alphabetical",
            });
          }}
        >
          <Text>sort by letters</Text>
        </TouchableOpacity>

        <Text>Collections here</Text>
        {orderedCollections &&
          orderedCollections.map((c) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Items", {
                  id: c.id,
                  collection: c.name,
                })
              }
              key={c.id}
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
  dispatch: ThunkDispatch<any, any, CollectionActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Collections);

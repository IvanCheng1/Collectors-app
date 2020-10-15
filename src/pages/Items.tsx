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
import { CollectionStackParamList } from "./CollectionStack";
import { IItem } from "../store/reducers/itemReducer";
import { ItemActionTypes } from "../store/actions/itemActions";
import { Sort } from "../utils/types";

interface IProps {
  navigation: StackNavigationProp<CollectionStackParamList, "Item">;
  route: RouteProp<CollectionStackParamList, "Items">;
}

interface IState {
  sort: Sort;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Items extends React.Component<Props, IState> {
  state = {
    sort: "alphabetical" as Sort,
  };

  render() {
    const { navigation, route, items }: Props = this.props;
    const { sort } = this.state;
    const filteredItems = items.filter(
      (i) => i.collection === route.params.collection
    );

    const orderedFilteredItems = filteredItems.sort((a, b) => {
      if (sort === "alphabetical") {
        return a.name > b.name ? 1 : -1;
      } else if (sort === "date descending") {
        return b.dateCreated.getTime() - a.dateCreated.getTime();
      }
      return 1;
    });

    return (
      <SafeAreaView style={myStyles.container}>
        <Text>{route.params.collection} here</Text>

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

        {orderedFilteredItems &&
          orderedFilteredItems.map((i) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Item", {
                  id: i.id,
                  title: i.name,
                  collection: i.collection,
                  sort,
                })
              }
              key={i.id}
            >
              <Text>{i.name}</Text>
            </TouchableOpacity>
          ))}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditCollection", { id: route.params.id })
          }
        >
          <Text>Edit Collection</Text>
        </TouchableOpacity>
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
  dispatch: ThunkDispatch<any, any, ItemActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Items);

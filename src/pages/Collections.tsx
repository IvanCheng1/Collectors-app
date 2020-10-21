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
import { CollectionActionTypes } from "../store/actions/collectionActions";
import { ICollection } from "../store/reducers/collectionReducer";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { CollectionStackParamList } from "./CollectionStack";
import { Sort } from "../utils/types";
import { FlatList } from "react-native-gesture-handler";

interface IProps {
  navigation: StackNavigationProp<CollectionStackParamList, "Items">;
  route: RouteProp<CollectionStackParamList, "Collections">;
}

interface IState {
  sort: Sort;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Collections extends React.Component<Props, IState> {
  state = {
    sort: "alphabetical" as Sort,
  };

  renderItem = (c: ICollection) => {
    const { navigation } = this.props;
    const image = c.image ? { uri: c.image } : require("../images/books.jpg");
    return (
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
        <Image style={myStyles.imageList} source={image} />
      </TouchableOpacity>
    );
  };

  render() {
    const { collections, navigation } = this.props;
    const { sort } = this.state;

    const orderedCollections = collections.sort((a, b) => {
      if (sort === "Alphabetical") {
        return a.name > b.name ? 1 : -1;
      } else if (sort === "Date descending") {
        return b.dateCreated.getTime() - a.dateCreated.getTime();
      } else if (sort === "Date ascending") {
        return a.dateCreated.getTime() - b.dateCreated.getTime();
      }
      return 1;
    });

    return (
      <SafeAreaView style={myStyles.container}>
        <Text>Spaceholder for Searchbar</Text>

        <TouchableOpacity
          onPress={() => {
            this.setState({
              sort: "Date descending",
            });
          }}
        >
          <Text>sort by date descending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              sort: "Alphabetical",
            });
          }}
        >
          <Text>sort by letters</Text>
        </TouchableOpacity>

        <Text>Collections here</Text>
        {orderedCollections && (
          <FlatList
            // style={myStyles.recipeList}
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
  dispatch: ThunkDispatch<any, any, CollectionActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Collections);

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
import { Sort, sortButtons } from "../utils/types";
import { FlatList } from "react-native-gesture-handler";
import { ButtonGroup, SearchBar } from "react-native-elements";
import { generateCollectionPicture } from "../utils/functions";
import { Font } from "expo";

interface IProps {
  navigation: StackNavigationProp<CollectionStackParamList, "Items">;
  route: RouteProp<CollectionStackParamList, "Collections">;
}

interface IState {
  sort: Sort;
  sortIndex: number;
  search: string;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Collections extends React.Component<Props, IState> {
  state = {
    sort: "Date descending" as Sort, // to change to store.settings
    sortIndex: 0,
    search: "",
  };

  async componentDidMount() {
    await Font.loadAsync({
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
  }

  updateSearch = (search: string): void => {
    this.setState({ search });
  };

  updateSortIndex = (selectedIndex: number) => {
    this.setState({
      sort: sortButtons[selectedIndex],
      sortIndex: selectedIndex,
    });
  };

  renderItem = (c: ICollection) => {
    const { navigation } = this.props;
    const image = c.image
      ? { uri: c.image }
      : generateCollectionPicture(c.name);
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
        <Image style={myStyles.imageList} source={image} />
        <Text>{c.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { collections } = this.props;
    const { sort, sortIndex, search } = this.state;

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
        <SearchBar
          platform="ios"
          onChangeText={this.updateSearch}
          value={search}
        />
        {/* <Text>Spaceholder for Searchbar</Text> */}

        <ButtonGroup
          onPress={this.updateSortIndex}
          selectedIndex={sortIndex}
          buttons={sortButtons}
        />

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

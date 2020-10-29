import React, { Component } from "react";
import { connect } from "react-redux";
import { mainColor, myStyles } from "../utils/myStyles";
import {
  Alert,
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
import { ButtonGroup } from "react-native-elements";
import {
  dateToDisplay,
  dateToDisplayMY,
  generateCollectionPicture,
} from "../utils/functions";
import * as Haptics from "expo-haptics";

interface IProps {
  navigation: StackNavigationProp<CollectionStackParamList>;
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

  componentDidMount() {
    // this.props.navigation.navigate("NewItem", {
    //   collection: "Pins",
    // });
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
        onLongPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          navigation.navigate("NewCollection", {
            id: c.id,
          });
        }}
      >
        <Image style={myStyles.imageList} source={image} />
        <View style={myStyles.collectionTitleHolder}>
          <Text style={myStyles.collectionTitleCard}>{c.name}</Text>
          <View style={myStyles.verticalAlign}>
            <Text style={myStyles.collectionDateCard}>
              {dateToDisplayMY(c.dateCreated)}
            </Text>
          </View>
        </View>
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

    const orderedCollectionsLength = orderedCollections.length;

    return (
      <SafeAreaView style={myStyles.containerFlatList}>
        {/* <Searchbar onChangeText={this.updateSearch} value={search} /> */}

        <ButtonGroup
          onPress={this.updateSortIndex}
          selectedIndex={sortIndex}
          buttons={sortButtons}
          selectedButtonStyle={{ backgroundColor: mainColor }}
          textStyle={{ fontSize: 12 }}
        />

        {orderedCollectionsLength > 0 ? (
          <>
            <FlatList
              // style={myStyles.recipeList}
              data={orderedCollections}
              numColumns={2}
              renderItem={({ item }) => this.renderItem(item)}
              style={{ width: "100%" }}
            />
            <View style={myStyles.bottomCounter}>
              <Text style={myStyles.bottomCounterText}>
                {orderedCollectionsLength} Collection
                {orderedCollectionsLength > 1 && "s"}
              </Text>
            </View>
          </>
        ) : (
          <View style={myStyles.container}>
            <Text>No collections!</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("NewCollection", {
                  id: undefined,
                })
              }
              style={myStyles.btn}
            >
              <Text style={myStyles.btnText}>Add collection</Text>
            </TouchableOpacity>
          </View>
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

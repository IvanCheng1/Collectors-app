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
import {
  Sort,
  Sort2,
  sortButtons,
  sortButtons2,
  sortButtonsDefault,
} from "../utils/types";
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
  sort: Sort2;
  sortIndex: number;
  search: string;
  sortButtons: Sort2[];
  sortButtons2: number[];
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Collections extends React.Component<Props, IState> {
  state = {
    sort: "Newest" as Sort2, // to change to store.settings
    sortIndex: 0,
    search: "",
    sortButtons: sortButtonsDefault,
    sortButtons2: [0, 0, 0],
  };

  componentDidMount() {
    // this.props.navigation.navigate("NewItem", {
    //   collection: "Pins",
    // });
  }

  updateSearch = (search: string): void => {
    this.setState({ search });
  };
  // updateSearch = (search: string): void => {
  //   this.setState({ search });
  // };

  changeButtons = (selectedIndex: number) => {
    if (selectedIndex !== 1) {
      let array = this.state.sortButtons2;
      array[selectedIndex] = array[selectedIndex] === 1 ? 0 : 1;

      let newButtons = this.state.sortButtons;

      for (let i = 0; i < array.length; i++) {
        const currIndex = array[i];
        newButtons[i] = sortButtons2[i][currIndex];
      }

      this.setState({
        sortButtons2: array,
        sortButtons: newButtons,
        sort: newButtons[selectedIndex],
      });
    }
  };

  updateSortIndex = (selectedIndex: number) => {
    if (selectedIndex === this.state.sortIndex) {
      // change buttons
      this.changeButtons(selectedIndex);
    } else {
      this.setState({
        sortIndex: selectedIndex,
        sort: this.state.sortButtons[selectedIndex],
      });
    }
  };
  // updateSortIndex = (selectedIndex: number) => {
  //   this.setState({
  //     sort: sortButtons[selectedIndex],
  //     sortIndex: selectedIndex,
  //   });
  // };

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
      // return 1
      const aDateCreated = new Date(a.dateCreated);
      const bDateCreated = new Date(b.dateCreated);
      const aDateModified = new Date(a.dateModified);
      const bDateModified = new Date(b.dateModified);

      switch (sort) {
        case "A-Z":
          return a.name > b.name ? 1 : -1;
        case "Z-A":
          return a.name < b.name ? 1 : -1;
        case "Oldest":
          return bDateCreated.getTime() - aDateCreated.getTime();
        case "Newest":
          return aDateCreated.getTime() - bDateCreated.getTime();
        case "Last modified":
          return bDateModified.getTime() - aDateModified.getTime();
        default:
          return 1;
      }
    });

    const orderedCollectionsLength = orderedCollections.length;

    return (
      <SafeAreaView style={myStyles.containerFlatList}>
        {/* <Searchbar onChangeText={this.updateSearch} value={search} /> */}

        <ButtonGroup
          onPress={this.updateSortIndex}
          selectedIndex={sortIndex}
          buttons={this.state.sortButtons}
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

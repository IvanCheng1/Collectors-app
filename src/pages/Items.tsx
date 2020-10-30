import React, { Component } from "react";
import { connect } from "react-redux";
import { mainColor, myStyles } from "../utils/myStyles";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { rootState } from "../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CollectionStackParamList } from "./CollectionStack";
import { IItem } from "../store/reducers/itemReducer";
import { ItemActionTypes } from "../store/actions/itemActions";
import {
  Sort,
  Sort2,
  sortButtons,
  sortButtons2,
  sortButtonsDefault,
} from "../utils/types";
import { FlatList } from "react-native-gesture-handler";
import { ButtonGroup } from "react-native-elements";
import { dateToDisplayMY, generateItemPicture } from "../utils/functions";
import * as Haptics from "expo-haptics";

interface IProps {
  navigation: StackNavigationProp<CollectionStackParamList, "Item">;
  route: RouteProp<CollectionStackParamList, "Items">;
}

interface IState {
  sort: Sort2;
  sortIndex: number;
  sortButtons: Sort2[];
  sortButtons2: number[];
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Items extends React.Component<Props, IState> {
  state = {
    sort: "Newest" as Sort2, /// to be changed to from store.settings
    sortIndex: 0,
    sortButtons: sortButtonsDefault,
    sortButtons2: [0, 0, 0],
  };

  renderItem = (i: IItem) => {
    const { navigation } = this.props;
    const { sort } = this.state;
    const image = i.image ? { uri: i.image } : generateItemPicture(i.name);

    return (
      <View style={myStyles.itemCardContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Item", {
              id: i.id,
              title: i.name,
              collection: i.collection,
              sort,
            })
          }
          onLongPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            navigation.navigate("NewItem", {
              id: i.id,
              collection: i.collection,
            });
          }}
          key={i.id}
          // style={{ borderWidth: 1, borderColor: "red" }}
        >
          <Image style={myStyles.imageListThirds} source={image} />
          <View>
            <Text style={myStyles.itemTitleCard}>{i.name}</Text>
            <Text style={myStyles.itemDateCard}>
              {dateToDisplayMY(i.dateCreated)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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

  render() {
    const { navigation, route, items }: Props = this.props;
    const { sort, sortIndex } = this.state;
    const filteredItems = items.filter(
      (i) => i.collection === route.params.collection
    );

    const orderedFilteredItems = filteredItems.sort((a, b) => {
      const aDateCreated = new Date(a.dateCreated);
      const bDateCreated = new Date(b.dateCreated);
      const aDateModified = new Date(a.dateModified);
      const bDateModified = new Date(b.dateModified);

      switch (sort) {
        case "A-Z":
          return a.name > b.name ? 1 : -1;
        case "Z-A":
          return a.name < b.name ? 1 : -1;
        case "Newest":
          return bDateCreated.getTime() - aDateCreated.getTime();
        case "Oldest":
          return aDateCreated.getTime() - bDateCreated.getTime();
        case "Last modified":
          return bDateModified.getTime() - aDateModified.getTime();
        default:
          return 1;
      }
    });

    const orderedFilteredItemsLength = orderedFilteredItems.length;

    return (
      <SafeAreaView style={myStyles.container}>
        <ButtonGroup
          onPress={this.updateSortIndex}
          selectedIndex={sortIndex}
          buttons={this.state.sortButtons}
          selectedButtonStyle={{ backgroundColor: mainColor }}
          textStyle={{ fontSize: 12 }}
        />
        {orderedFilteredItemsLength > 0 ? (
          <>
            <FlatList
              data={orderedFilteredItems}
              numColumns={3}
              renderItem={({ item }) => this.renderItem(item)}
              style={{ width: "100%" }}
            />
            <View style={myStyles.bottomCounter}>
              <Text style={myStyles.bottomCounterText}>
                {orderedFilteredItemsLength} Item
                {orderedFilteredItemsLength > 1 && "s"}
              </Text>
            </View>
          </>
        ) : (
          <View style={myStyles.container}>
            <Text>No items!</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("NewItem", {
                  collection: route.params.collection,
                })
              }
              style={myStyles.btn}
            >
              <Text style={myStyles.btnText}>Add item</Text>
            </TouchableOpacity>
          </View>
        )}
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

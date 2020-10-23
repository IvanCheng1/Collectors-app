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
import { Sort, sortButtons } from "../utils/types";
import { FlatList } from "react-native-gesture-handler";
import { ButtonGroup } from "react-native-elements";
import { generateItemPicture } from "../utils/functions";

interface IProps {
  navigation: StackNavigationProp<CollectionStackParamList, "Item">;
  route: RouteProp<CollectionStackParamList, "Items">;
}

interface IState {
  sort: Sort;
  sortIndex: number;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Items extends React.Component<Props, IState> {
  state = {
    sort: "Date descending" as Sort, /// to be changed to from store.settings
    sortIndex: 0,
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
          key={i.id}
          // style={{ borderWidth: 1, borderColor: "red" }}
        >
          <Image style={myStyles.imageListThirds} source={image} />
          <Text style={myStyles.itemTitleCard}>{i.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  updateSortIndex = (selectedIndex: number) => {
    this.setState({
      sort: sortButtons[selectedIndex],
      sortIndex: selectedIndex,
    });
  };

  render() {
    const { navigation, route, items }: Props = this.props;
    const { sort, sortIndex } = this.state;
    const filteredItems = items.filter(
      (i) => i.collection === route.params.collection
    );

    const orderedFilteredItems = filteredItems.sort((a, b) => {
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
        <Text>search bar here / filter</Text>
        {/* <Text>{route.params.collection} here</Text> */}
        <ButtonGroup
          onPress={this.updateSortIndex}
          selectedIndex={sortIndex}
          buttons={sortButtons}
          selectedButtonStyle={{ backgroundColor: mainColor }}
        />

        {orderedFilteredItems && (
          <FlatList
            data={orderedFilteredItems}
            numColumns={3}
            renderItem={({ item }) => this.renderItem(item)}
          />
        )}

        {/* <TouchableOpacity
          style={myStyles.btn}
          onPress={() =>
            navigation.navigate("EditCollection", { id: route.params.id })
          }
        >
          <Text style={myStyles.btnText} >Edit Collection</Text>
        </TouchableOpacity> */}
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

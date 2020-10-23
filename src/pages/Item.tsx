import { AntDesign, Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Container } from "native-base";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ItemActionTypes } from "../store/actions/itemActions";
import { rootState } from "../store/reducers";
import { IItem } from "../store/reducers/itemReducer";
import {
  dateToDisplay,
  dateToString,
  generateItemPicture,
} from "../utils/functions";
import { mainColor, myStyles } from "../utils/myStyles";
import { CollectionStackParamList } from "./CollectionStack";

interface IProps {
  navigation: StackNavigationProp<CollectionStackParamList, "Item">;
  route: RouteProp<CollectionStackParamList, "Item">;
}

interface IState {}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Item extends React.Component<Props, IState> {
  render() {
    const { navigation, items, route } = this.props;
    const { id, sort } = this.props.route.params;
    const currentItem: IItem = this.props.items.filter((i) => i.id === id)[0];
    const image = currentItem.image
      ? { uri: currentItem.image }
      : generateItemPicture(currentItem.name);

    const filteredItems = items.filter(
      (i) => i.collection === route.params.collection
    );

    const orderedFilteredItems = filteredItems.sort((a, b) => {
      if (sort === "Alphabetical") {
        return a.name > b.name ? 1 : -1;
      } else if (sort === "Date descending") {
        return b.dateCreated.getTime() - a.dateCreated.getTime();
      }
      return 1;
    });

    const currentIndex = orderedFilteredItems.indexOf(currentItem);
    const nextItem: IItem =
      orderedFilteredItems[currentIndex + 1] ||
      orderedFilteredItems[currentIndex + 1 - orderedFilteredItems.length];
    const prevItem: IItem =
      orderedFilteredItems[currentIndex - 1] ||
      orderedFilteredItems[currentIndex - 1 + orderedFilteredItems.length];

    return (
      <SafeAreaView style={myStyles.container}>
        <Text style={myStyles.itemDate}>
          {dateToDisplay(currentItem.dateCreated)}
        </Text>
        <Image style={myStyles.img} source={image} />

        {/* <Text>{currentItem.name}</Text> */}
        <Text style={myStyles.itemDescription}>{currentItem.description}</Text>
        <Text style={myStyles.itemLocation}>
          <Entypo name="location-pin" size={14} color={mainColor} />
          {currentItem.city}
        </Text>
        <View style={myStyles.btnBar}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Item", {
                id: prevItem.id,
                title: prevItem.name,
                collection: prevItem.collection,
                sort,
              })
            }
            style={myStyles.btnBarButtons}
          >
            <Text style={myStyles.btnBarButtonText}>Previous item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Item", {
                id: nextItem.id,
                title: nextItem.name,
                collection: nextItem.collection,
                sort,
              })
            }
            style={myStyles.btnBarButtons}
          >
            <Text style={myStyles.btnBarButtonText}>Next item</Text>
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Item);

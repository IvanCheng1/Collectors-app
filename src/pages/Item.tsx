import { AntDesign } from "@expo/vector-icons";
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
} from "react-native";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ItemActionTypes } from "../store/actions/itemActions";
import { rootState } from "../store/reducers";
import { IItem } from "../store/reducers/itemReducer";
import { myStyles } from "../utils/myStyles";
import { RootStackParamList } from "./CollectionStack";

interface IProps {
  navigation: StackNavigationProp<RootStackParamList, "Item">;
  route: RouteProp<RootStackParamList, "Item">;
}

interface IState {}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Item extends React.Component<Props, IState> {
  render() {
    const { navigation, items, route } = this.props;
    const { id } = this.props.route.params;
    const currentItem: IItem = this.props.items.filter((i) => i.id === id)[0];

    const filteredItems = items.filter(
      (i) => i.collection === route.params.collection
    );

    const currentIndex = items.indexOf(currentItem);
    const nextItem: IItem =
      filteredItems[currentIndex + 1] ||
      filteredItems[currentIndex + 1 - filteredItems.length];
    const prevItem: IItem =
      filteredItems[currentIndex - 1] ||
      filteredItems[currentIndex - 1 + filteredItems.length];

      // todo prevItem

    return (
      <SafeAreaView style={myStyles.container}>
        <Text>{currentItem.name}</Text>
        <Text>{currentItem.description}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Item", {
              id: nextItem.id,
              title: nextItem.name,
              collection: nextItem.collection,
            })
          }
        >
          <Text>Next item</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Item);

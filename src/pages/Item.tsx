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
  Modal,
  Dimensions,
} from "react-native";
import ImageModal from "react-native-image-modal";
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

interface IState {
  width: number;
  height: number;
}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class Item extends React.Component<Props, IState> {
  state = {
    width: 0,
    height: 0,
  };

  componentDidMount() {
    const { id } = this.props.route.params;
    const currentItem: IItem = this.props.items.filter((i) => i.id === id)[0];

    Image.getSize(currentItem.image, (w, h) => {
      let factor: number;

      if (w > h) {
        const windowWidth = Dimensions.get("window").width;
        factor = w / (windowWidth * 0.9);
      } else {
        factor = h / 350;
      }

      this.setState({
        height: h / factor,
        width: w / factor,
      });
    });
  }

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
      const aDateCreated = new Date(a.dateCreated);
      const bDateCreated = new Date(b.dateCreated);
      const aDateModified = new Date(a.dateModified);
      const bDateModified = new Date(b.dateModified);

      switch (sort) {
        case "A-Z":
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        case "Z-A":
          return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
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

    const currentIndex = orderedFilteredItems.indexOf(currentItem);
    const nextItem: IItem =
      orderedFilteredItems[currentIndex + 1] ||
      orderedFilteredItems[currentIndex + 1 - orderedFilteredItems.length];
    const prevItem: IItem =
      orderedFilteredItems[currentIndex - 1] ||
      orderedFilteredItems[currentIndex - 1 + orderedFilteredItems.length];

    if (this.state.height === 0) {
      Image.getSize(currentItem.image, (w, h) => {
        this.setState({ height: h / 10 });
      });
    }

    return (
      <SafeAreaView style={myStyles.containerTop}>
        <Text style={myStyles.itemDate}>
          {dateToDisplay(currentItem.dateCreated)}
        </Text>
        <View>
          <ImageModal
            resizeMode="contain"
            // imageBackgroundColor="#000000"
            style={[
              myStyles.img,
              { height: this.state.height, width: this.state.width },
            ]}
            source={image}
            hideCloseButton={true}
          />
        </View>
        {/* <Image style={myStyles.img} source={image} /> */}

        {/* <Text>{currentItem.name}</Text> */}
        {currentItem.description !== "" && (
          <Text style={myStyles.itemDescription}>
            {currentItem.description}
          </Text>
        )}

        {currentItem.city !== "" && (
          <Text style={myStyles.itemLocation}>
            <Entypo name="location-pin" size={14} color={mainColor} />
            {currentItem.city}
          </Text>
        )}

        <View style={myStyles.btnBarArrows}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Item", {
                id: prevItem.id,
                title: prevItem.name,
                collection: prevItem.collection,
                sort,
              })
            }
            style={myStyles.btnBarArrowsButtons}
          >
            <AntDesign name="caretleft" size={18} color="white" />
            <Text style={myStyles.btnBarArrowsButtonText}> Previous item</Text>
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
            style={myStyles.btnBarArrowsButtons}
          >
            <Text style={myStyles.btnBarArrowsButtonText}>Next item </Text>
            <AntDesign name="caretright" size={18} color="white" />
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

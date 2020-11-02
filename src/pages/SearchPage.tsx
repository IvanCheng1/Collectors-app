import React from "react";
import { connect } from "react-redux";
import { mainColor, myStyles } from "../utils/myStyles";
import {
  FlatList,
  Image,
  NativeSyntheticEvent,
  SafeAreaView,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { rootState } from "../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import { AllActionTypes } from "../store/actions";
import { ButtonGroup } from "react-native-elements";
import { ICollection } from "../store/reducers/collectionReducer";
import { IItem } from "../store/reducers/itemReducer";
import {
  dateToDisplay,
  generateCollectionPicture,
  generateItemPicture,
} from "../utils/functions";
import { StackNavigationProp } from "@react-navigation/stack";
import { CollectionStackParamList } from "./CollectionStack";
import { Entypo } from "@expo/vector-icons";

interface IProps {
  navigation: StackNavigationProp<CollectionStackParamList>;
}

interface IState {
  showIndex: number;
  search: string;
  fadeInValue: Animated.Value;
}

const showIndexButtons = ["All", "Collections", "Items"];

type Props = IProps & LinkStateProps & LinkDispatchProps;

class SearchPage extends React.Component<Props, IState> {
  state = {
    showIndex: 0,
    search: "",
    fadeInValue: new Animated.Value(0),
  };

  _start = () => {
    Animated.timing(this.state.fadeInValue, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  updateSearch = (search: string): void => {
    this.setState({ search });
  };

  updateShowIndex = (selectedIndex: number): void => {
    this.setState({
      showIndex: selectedIndex,
    });
  };

  isIItem = (item: IItem | ICollection): item is IItem => {
    return "description" in item;
  };

  renderItem = (item: IItem | ICollection) => {
    const image = item.image
      ? { uri: item.image }
      : this.isIItem(item)
      ? generateItemPicture(item.name)
      : generateCollectionPicture(item.name);
    const { navigation, collections } = this.props;

    return (
      <View style={myStyles.itemCardContainer}>
        <TouchableOpacity
          onPress={() => {
            if (this.isIItem(item)) {
              navigation.navigate("Collections");
              // navigation.popToTop();

              navigation.navigate("Items", {
                id: collections.filter((c) => c.name === item.collection)[0].id,
                collection: item.collection,
              });

              navigation.navigate("Item", {
                id: item.id,
                title: item.name,
                collection: item.collection,
                sort: "Alphabetical",
              });
            } else {
              navigation.navigate("Items", {
                id: item.id,
                collection: item.name,
              });
            }
          }}
          key={item.id}
        >
          <Image style={myStyles.imageListThirds} source={image} />
          <Text style={myStyles.itemTitleCard}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { search, showIndex } = this.state;
    const { collections, items } = this.props;
    const searchLower = search.toLowerCase().trim();

    // animate the cross icon in searchbar
    if (search !== "") {
      this._start();
    }

    // collection names match search??
    const searchCollections = collections.filter((c) =>
      c.name.toLowerCase().includes(searchLower)
    );

    // items names match search??
    const searchItems = items.filter((i) => {
      if (
        i.name.toLowerCase().includes(searchLower) ||
        i.description.toLowerCase().includes(searchLower) ||
        i.city.toLowerCase().includes(searchLower) ||
        dateToDisplay(i.dateCreated).includes(searchLower)
      ) {
        return 1;
      }
    });

    // prep for more collections inside items
    let searchCollectionsInsideItems: ICollection[] = searchCollections;
    // look through items, if match, push collection to above
    searchItems.forEach((i) => {
      collections.forEach((c) => {
        if (c.name === i.collection) {
          if (!searchCollectionsInsideItems.includes(c)) {
            searchCollectionsInsideItems.push(c);
          }
        }
      });
    });

    // combine all
    const combineResults = searchCollectionsInsideItems.concat(searchItems);
    let displayResults: any[];

    switch (showIndex) {
      case 0:
        displayResults = combineResults;
        break;
      case 1:
        displayResults = searchCollectionsInsideItems;
        break;
      case 2:
        displayResults = searchItems;
        break;
      default:
        displayResults = combineResults;
        break;
    }
    // sort by alphabetical order
    displayResults.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return -1;
    });

    const collectionsLength = searchCollectionsInsideItems.length;
    const itemsLength = searchItems.length;

    return (
      <SafeAreaView style={myStyles.containerFlatList}>
        <View style={myStyles.searchbar}>
          <TextInput
            style={myStyles.searchbarTextInput}
            placeholder="Search here"
            value={search}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              this.updateSearch(e.nativeEvent.text)
            }
          />
          {search !== "" && (
            <TouchableOpacity
              onPress={() => this.setState({ search: "" })}
              style={myStyles.searchbarCross}
            >
              <Animated.View style={{ opacity: this.state.fadeInValue }}>
                <Entypo name="cross" size={20} color={mainColor} />
              </Animated.View>
            </TouchableOpacity>
          )}
        </View>

        <ButtonGroup
          onPress={this.updateShowIndex}
          selectedIndex={showIndex}
          buttons={showIndexButtons}
          selectedButtonStyle={{ backgroundColor: mainColor }}
        />

        {displayResults.length > 0 ? (
          <>
            <FlatList
              data={displayResults}
              numColumns={3}
              renderItem={({ item }) => this.renderItem(item)}
              style={{ width: "100%" }}
            />
            <View style={myStyles.bottomCounter}>
              {showIndex < 2 && (
                <Text style={myStyles.bottomCounterText}>
                  {collectionsLength > 0 && collectionsLength} Collection
                  {collectionsLength > 1 && "s"}
                </Text>
              )}
              {(showIndex === 0 || showIndex === 2) && (
                <Text style={myStyles.bottomCounterText}>
                  {showIndex !== 2 && itemsLength > 0 && " and "}
                  {itemsLength > 0 && itemsLength}
                  {itemsLength !== 0 && " Item"}
                  {itemsLength > 1 && "s"}
                </Text>
              )}
            </View>
          </>
        ) : (
          <View style={myStyles.container}>
            <Text>{search === "" ? "No items" : "No match"}</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

interface LinkStateProps {
  collections: ICollection[];
  items: IItem[];
}

interface LinkDispatchProps {}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({
  collections: state.collection,
  items: state.item,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

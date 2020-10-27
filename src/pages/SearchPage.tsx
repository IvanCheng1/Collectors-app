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

interface IProps {
  navigation: StackNavigationProp<CollectionStackParamList>;
}

interface IState {
  showIndex: number;
  search: string;
}

const showIndexButtons = ["All", "Collections", "Items"];

type Props = IProps & LinkStateProps & LinkDispatchProps;

class SearchPage extends React.Component<Props, IState> {
  state = {
    showIndex: 0,
    search: "",
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

    const searchCollections = collections.filter((c) =>
      c.name.toLowerCase().includes(searchLower)
    );

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

    let searchCollectionsInsideItems: ICollection[] = [];

    searchItems.forEach((i) => {
      collections.forEach((c) => {
        if (c.name === i.collection) {
          if (!searchCollectionsInsideItems.includes(c)) {
            searchCollectionsInsideItems.push(c);
          }
        }
      });
    });

    const combineResults = searchCollections.concat(searchItems);
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
    displayResults.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      return -1;
    });

    return (
      <SafeAreaView style={myStyles.containerFlatList}>
        <TextInput
          style={myStyles.searchbar}
          placeholder="Search here"
          value={search}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            this.updateSearch(e.nativeEvent.text)
          }
        />

        <ButtonGroup
          onPress={this.updateShowIndex}
          selectedIndex={showIndex}
          buttons={showIndexButtons}
          selectedButtonStyle={{ backgroundColor: mainColor }}
        />

        {displayResults.length > 0 ? (
          <FlatList
            data={displayResults}
            numColumns={3}
            renderItem={({ item }) => this.renderItem(item)}
          />
        ) : (
          <View>
            <Text>no items</Text>
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

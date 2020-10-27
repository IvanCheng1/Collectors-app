import React from "react";
import { connect } from "react-redux";
import { mainColor, myStyles } from "../utils/myStyles";
import {
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
import { dateToDisplay } from "../utils/functions";

interface IProps {}

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

  render() {
    const { search, showIndex } = this.state;
    const { collections, items } = this.props;
    const searchLower = search.toLowerCase();

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

    const combineResults = searchCollections.concat(searchItems);
    let displayResults: any[];

    switch (showIndex) {
      case 0:
        displayResults = combineResults;
        break;
      case 1:
        displayResults = searchCollections;
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
      <SafeAreaView style={myStyles.container}>
        <TextInput
          style={myStyles.input}
          placeholder="Search here"
          value={search}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            this.updateSearch(e.nativeEvent.text)
          }
        />
        <Text>searching {search}</Text>

        <ButtonGroup
          onPress={this.updateShowIndex}
          selectedIndex={showIndex}
          buttons={showIndexButtons}
          selectedButtonStyle={{ backgroundColor: mainColor }}
        />

        {displayResults &&
          displayResults.map((item) => <Text key={item.id}>{item.name}</Text>)}

        {/* <Text>===== Collections =====</Text>
        {searchCollections &&
          searchCollections.map((c) => <Text key={c.id}>{c.name}</Text>)}
        <Text>===== Items =====</Text>
        {searchItems &&
          searchItems.map((i) => <Text key={i.id}>{i.name}</Text>)}
        <Text>===== Both =====</Text>
        {combineResults &&
          combineResults.map((item) => <Text key={item.id}>{item.name}</Text>)} */}
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

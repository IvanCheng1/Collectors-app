import AsyncStorage from "@react-native-async-storage/async-storage";
import { collectionInitialState } from "../store/initialStates/collectionInitialState";
import { itemInitialState } from "../store/initialStates/itemsInitialState";

const COLLECTION_STORAGE_KEY = "COLLECTION_STORAGE_KEY";
const ITEM_STORAGE_KEY = "ITEM_STORAGE_KEY";

export const getCollectionsAsync = async () => {
  try {
    const localStorage = await AsyncStorage.getItem(COLLECTION_STORAGE_KEY);

    if (localStorage) {
      return JSON.parse(localStorage);
    } else {
      await AsyncStorage.setItem(
        COLLECTION_STORAGE_KEY,
        JSON.stringify(collectionInitialState)
      );
      return collectionInitialState;
    }
  } catch (e) {
    console.log("getCollectionsAsync error:", e);
  }
};

export const getItemsAsync = async () => {
  try {
    const localStorage = await AsyncStorage.getItem(ITEM_STORAGE_KEY);

    if (localStorage) {
      return JSON.parse(localStorage);
    } else {
      await AsyncStorage.setItem(
        ITEM_STORAGE_KEY,
        JSON.stringify(itemInitialState)
      );
      return itemInitialState;
    }
  } catch (e) {
    console.log("getItemsAsync error:", e);
  }
};

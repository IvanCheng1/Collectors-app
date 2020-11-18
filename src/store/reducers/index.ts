import { combineReducers } from "redux";
import collectionReducer from "./collectionReducer";
import itemReducer from "./itemReducer";
import { createTransform, persistReducer } from "redux-persist";
// import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export const rootReducer = combineReducers({
  collection: collectionReducer,
  item: itemReducer,
});

const persistConfig = {
  key: "root",
  // migrate: createMigrate(),
  storage: AsyncStorage,
  // blacklist: ['item', 'collection']
};

// const transformCredentials = createTransform();

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type rootState = ReturnType<typeof persistedReducer>;

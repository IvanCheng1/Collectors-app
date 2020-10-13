import { combineReducers } from "redux";
import collectionReducer from "./collectionReducer";
import itemReducer from "./itemReducer";

export const rootReducer = combineReducers({
  collection: collectionReducer,
  item: itemReducer,
});

export type rootState = ReturnType<typeof rootReducer>;

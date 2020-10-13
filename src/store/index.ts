import { applyMiddleware, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { CollectionActionTypes } from "./actions/collectionActions";
import { ItemActionTypes } from "./actions/itemActions";
import { rootReducer, rootState } from "./reducers";

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk as ThunkMiddleware<rootState, CollectionActionTypes, ItemActionTypes>
  )
);

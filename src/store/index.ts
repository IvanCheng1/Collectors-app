import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { CollectionActionTypes } from "./actions/collectionActions";
import { ItemActionTypes } from "./actions/itemActions";
import { persistedReducer, rootReducer, rootState } from "./reducers";

export const store = createStore(
  persistedReducer,
  applyMiddleware(
    thunk as ThunkMiddleware<rootState, CollectionActionTypes, ItemActionTypes>
  )
);

export const persistor = persistStore(store);

import {
  ADD_COLLECTION,
  CollectionActionTypes,
  EDIT_COLLECTION,
} from "../actions/collectionActions";
import { collectionInitialState } from "../initialStates/collectionInitialState";

export interface ICollection {
  name: string;
  id: string;
  dateCreated: Date;
  dateModified: Date;
}

export default function collectionReducer(
  state: ICollection[] = collectionInitialState,
  action: CollectionActionTypes
): ICollection[] {
  switch (action.type) {
    case ADD_COLLECTION:
      return [...state, action.collection];
    case EDIT_COLLECTION:
      return state.map((c) => {
        if (c.id === action.id) {
          return action.newCollection;
        } else {
          return c;
        }
      });
    default:
      return state;
  }
}

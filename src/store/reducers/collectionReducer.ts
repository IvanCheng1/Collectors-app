import {
  ADD_COLLECTION,
  CollectionActionTypes,
  DELETE_COLLECTION,
  EDIT_COLLECTION,
  UPDATE_COLLECTION_MODIFIED_DATE,
} from "../actions/collectionActions";
import { collectionInitialState } from "../initialStates/collectionInitialState";

export interface ICollection {
  name: string;
  id: string;
  dateCreated: number;
  dateModified: number;
  image: string;
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
    case DELETE_COLLECTION:
      return state.filter((c) => c.id !== action.id);
    case UPDATE_COLLECTION_MODIFIED_DATE:
      return state.map((c) => {
        if (c.name === action.collection) {
          c.dateModified = new Date().getTime();
        }
        return c;
      });
    default:
      return state;
  }
}

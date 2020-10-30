import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import {
  ADD_ITEM,
  DELETE_ITEM,
  DELETE_ITEM_FOR_COLLECTION,
  EDIT_ITEM,
  EDIT_ITEM_FOR_COLLECTION,
  ItemActionTypes,
} from "../actions/itemActions";
import { itemInitialState } from "../initialStates/itemsInitialState";

export interface IItem {
  name: string;
  id: string;
  description: string;
  collection: string;
  city: string;
  dateCreated: number;
  dateModified: number;
  image: string;
}

export default function itemReducer(
  state: IItem[] = itemInitialState,
  action: ItemActionTypes
): IItem[] {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item];
    case EDIT_ITEM:
      return state.map((i) => {
        if (i.id === action.id) {
          return action.newItem;
        } else {
          return i;
        }
      });
    case EDIT_ITEM_FOR_COLLECTION:
      return state.map((i) => {
        if (i.collection === action.oldCollection) {
          i.collection = action.newCollection;
        }
        return i;
      });
    case DELETE_ITEM:
      return state.filter((i) => i.id !== action.id);
    case DELETE_ITEM_FOR_COLLECTION:
      return state.filter((i) => i.collection !== action.collection);
    default:
      return state;
  }
}

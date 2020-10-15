import {
  ADD_ITEM,
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
  picture: string;
  city: string;
  dateCreated: Date;
  dateModified: Date;
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
    default:
      return state;
  }
}

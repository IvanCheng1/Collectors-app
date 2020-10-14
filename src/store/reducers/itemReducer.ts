import { ADD_ITEM, ItemActionTypes } from "../actions/itemActions";
import { itemInitialState } from "../initialStates/itemsInitialState";

export interface IItem {
  name: string;
  id: string;
  description: string;
  collection: string;
  picture: string;
  city: string;
  dateCreated: Date;
}

export default function itemReducer(
  state: IItem[] = itemInitialState,
  action: ItemActionTypes
): IItem[] {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item];
    default:
      return state;
  }
}

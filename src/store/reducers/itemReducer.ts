import { ADD_ITEM, ItemActionTypes } from "../actions/itemActions";
import { itemInitialState } from "../initialStates/itemsInitialState";

export interface IItem {
  name: string;
  id: string;
  collection: string;
}

export default function itemReducer(
  state: IItem[] = itemInitialState,
  action: ItemActionTypes
): IItem[] {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        {
          name: action.name,
          id: action.id,
          collection: action.collection,
        },
      ];
    default:
      return state;
  }
}

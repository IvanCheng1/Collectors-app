import {
  ADD_COLLECTION,
  CollectionActionTypes,
} from "../actions/collectionActions";
import { collectionInitialState } from "../initialStates/collectionInitialState";

export interface ICollection {
  name: string;
  // id: string;
}

export default function collectionReducer(
  state: ICollection[] = collectionInitialState,
  action: CollectionActionTypes
): ICollection[] {
  switch (action.type) {
    case ADD_COLLECTION:
      return [
        ...state,
        {
          name: action.name,
        },
      ];
    default:
      return state;
  }
}

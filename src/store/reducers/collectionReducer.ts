import {
  ADD_COLLECTION,
  CollectionActionTypes,
} from "../actions/collectionActions";
import { collectionInitialState } from "../initialStates/collectionInitialState";

export interface ICollection {
  name: string;
  id: string;
  dateCreated: Date;
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
          id: action.id,
          dateCreated: action.dateCreated,
        },
      ];
    default:
      return state;
  }
}

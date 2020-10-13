import { Dispatch } from "redux";
import { generateID } from "../../utils/other";

export const ADD_COLLECTION = "ADD_COLLECTION";

interface addCollectionAction {
  type: typeof ADD_COLLECTION;
  name: string;
  id: string;
}

const addCollectionAction = (
  name: string,
  id: string
): CollectionActionTypes => {
  return {
    type: ADD_COLLECTION,
    name,
    id,
  };
};

export const handleAddCollection = (name: string) => {
  return (dispatch: Dispatch<CollectionActionTypes>) => {
    const id = generateID();
    dispatch(addCollectionAction(name, id));
    // async to do
  };
};

export type CollectionActionTypes = addCollectionAction;

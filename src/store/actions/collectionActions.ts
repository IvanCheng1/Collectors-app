import { Dispatch } from "redux";
import { generateID } from "../../utils/functions";

export const ADD_COLLECTION = "ADD_COLLECTION";

interface addCollectionAction {
  type: typeof ADD_COLLECTION;
  name: string;
  id: string;
  dateCreated: Date;
}

const addCollectionAction = (
  name: string,
  id: string,
  dateCreated: Date
): CollectionActionTypes => {
  return {
    type: ADD_COLLECTION,
    name,
    id,
    dateCreated,
  };
};

export const handleAddCollection = (name: string) => {
  return (dispatch: Dispatch<CollectionActionTypes>) => {
    const id = generateID();
    const dateCreated = new Date();
    dispatch(addCollectionAction(name, id, dateCreated));
    // async to do
  };
};

export type CollectionActionTypes = addCollectionAction;

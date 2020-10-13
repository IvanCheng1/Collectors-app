import { Dispatch } from "redux";


export const ADD_COLLECTION = "ADD_COLLECTION";

interface addCollectionAction {
  type: typeof ADD_COLLECTION;
  name: string
}

const addCollectionAction = (name: string): CollectionActionTypes => {
  return {
    type: ADD_COLLECTION,
    name,
  }
}

export const handleAddCollection = (name: string) => {
  return (dispatch: Dispatch<CollectionActionTypes>) => {
    dispatch(addCollectionAction(name));
    // async to do
  }
}

export type CollectionActionTypes = addCollectionAction
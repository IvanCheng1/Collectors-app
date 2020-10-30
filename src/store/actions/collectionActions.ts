import { Dispatch } from "redux";
import { generateID } from "../../utils/functions";
import { ICollection } from "../reducers/collectionReducer";

export const ADD_COLLECTION = "ADD_COLLECTION";
export const EDIT_COLLECTION = "EDIT_COLLECTION";
export const DELETE_COLLECTION = "DELETE_COLLECTION";
export const UPDATE_COLLECTION_MODIFIED_DATE = "UPDATE_COLLECTION_MODIFIED_DAT";

interface addCollectionAction {
  type: typeof ADD_COLLECTION;
  collection: ICollection;
}

interface editCollectionAction {
  type: typeof EDIT_COLLECTION;
  id: string;
  newCollection: ICollection;
}

interface deleteCollectionAction {
  type: typeof DELETE_COLLECTION;
  id: string;
}

interface updateCollectionModifiedDateAction {
  type: typeof UPDATE_COLLECTION_MODIFIED_DATE;
  collection: string;
}

const addCollectionAction = (
  collection: ICollection
): CollectionActionTypes => {
  return {
    type: ADD_COLLECTION,
    collection,
  };
};

const editCollectionAction = (
  id: string,
  newCollection: ICollection
): CollectionActionTypes => {
  return {
    type: EDIT_COLLECTION,
    id,
    newCollection,
  };
};

const deleteCollectionAction = (id: string): CollectionActionTypes => {
  return {
    type: DELETE_COLLECTION,
    id,
  };
};

const updateCollectionModifiedDateAction = (
  collection: string
): CollectionActionTypes => {
  return {
    type: UPDATE_COLLECTION_MODIFIED_DATE,
    collection,
  };
};

export const handleAddCollection = (collection: ICollection) => {
  return (dispatch: Dispatch<CollectionActionTypes>) => {
    dispatch(addCollectionAction(collection));
    // async to do
  };
};

export const handleEditCollection = (
  id: string,
  newCollection: ICollection
) => {
  return (dispatch: Dispatch<CollectionActionTypes>) => {
    dispatch(editCollectionAction(id, newCollection));
    // async to do
  };
};

export const handleDeleteCollection = (id: string) => {
  return (dispatch: Dispatch<CollectionActionTypes>) => {
    dispatch(deleteCollectionAction(id));
    // async to do
  };
};

export const handleUpdateCollectionModifiedDate = (collection: string) => {
  return (dispatch: Dispatch<CollectionActionTypes>) => {
    dispatch(updateCollectionModifiedDateAction(collection));
  };
};

export type CollectionActionTypes =
  | addCollectionAction
  | editCollectionAction
  | deleteCollectionAction
  | updateCollectionModifiedDateAction;

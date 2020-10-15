import { Dispatch } from "redux";
import { generateID } from "../../utils/functions";
import { IItem } from "../reducers/itemReducer";

export const ADD_ITEM = "ADD_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";
export const EDIT_ITEM_FOR_COLLECTION = "EDIT_ITEM_FOR_COLLECTION";

interface addItemAction {
  type: typeof ADD_ITEM;
  item: IItem;
}

interface editItemAction {
  type: typeof EDIT_ITEM;
  id: string;
  newItem: IItem;
}

interface editItemForCollectionAction {
  type: typeof EDIT_ITEM_FOR_COLLECTION;
  oldCollection: string;
  newCollection: string;
}

const addItemAction = (item: IItem): ItemActionTypes => {
  return {
    type: ADD_ITEM,
    item,
  };
};

const editItemAction = (id: string, newItem: IItem): ItemActionTypes => {
  return {
    type: EDIT_ITEM,
    id,
    newItem,
  };
};

const editItemForCollectionAction = (
  oldCollection: string,
  newCollection: string
): ItemActionTypes => {
  return {
    type: EDIT_ITEM_FOR_COLLECTION,
    oldCollection,
    newCollection,
  };
};

export const handleAddItem = (
  name: string,
  collection: string,
  description: string,
  city: string,
  picture: string
) => {
  return (dispatch: Dispatch<ItemActionTypes>) => {
    const date = new Date();
    const item: IItem = {
      name,
      id: generateID(),
      collection,
      description,
      city,
      picture,
      dateCreated: date,
      dateModified: date,
    };
    dispatch(addItemAction(item));
    // async to do
  };
};

export const handleEditItem = (id: string, newItem: IItem) => {
  return (dispatch: Dispatch<ItemActionTypes>) => {
    dispatch(editItemAction(id, newItem));
    // async to do
  };
};

export const handleEditItemForCollection = (
  oldCollection: string,
  newCollection: string
) => {
  return (dispatch: Dispatch<ItemActionTypes>) => {
    dispatch(editItemForCollectionAction(oldCollection, newCollection));
    // async to do
  };
};

export type ItemActionTypes =
  | addItemAction
  | editItemAction
  | editItemForCollectionAction;

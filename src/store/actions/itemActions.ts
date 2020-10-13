import { Dispatch } from "redux";
import { generateID } from "../../utils/other";

export const ADD_ITEM = "ADD_ITEM";

interface addItemAction {
  type: typeof ADD_ITEM;
  name: string;
  id: string;
  collection: string;
}

const addItemAction = (name: string, id: string, collection: string): ItemActionTypes => {
  return {
    type: ADD_ITEM,
    name,
    id,
    collection,
  };
};

export const handleAddItem = (name: string, collection: string) => {
  return (dispatch: Dispatch<ItemActionTypes>) => {
    const id = generateID();
    dispatch(addItemAction(name, id, collection));
    // async to do
  };
};

export type ItemActionTypes = addItemAction;

import { Dispatch } from "redux";
import { generateID } from "../../utils/other";
import { IItem } from "../reducers/itemReducer";

export const ADD_ITEM = "ADD_ITEM";

interface addItemAction {
  type: typeof ADD_ITEM;
  item: IItem;
}

const addItemAction = (item: IItem): ItemActionTypes => {
  return {
    type: ADD_ITEM,
    item,
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
    const item: IItem = {
      name,
      id: generateID(),
      collection,
      description,
      city,
      picture,
    };
    dispatch(addItemAction(item));
    // async to do
  };
};

export type ItemActionTypes = addItemAction;

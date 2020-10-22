import { ImageSourcePropType } from "react-native";
import { ICollection } from "../store/reducers/collectionReducer";
import { IItem } from "../store/reducers/itemReducer";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function generateID(): string {
  // source: https://gist.github.com/gordonbrander/2230317

  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2);
}

function dateToYMD(date: Date): { y: number; m: number; d: number } {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  return { y, m, d };
}

export function dateToString(date: Date): string {
  const { y, m, d } = dateToYMD(date);

  return `${y}-${m}-${d}`;
}

export function dateToDisplay(date: Date): string {
  // format??????

  const { y, m, d } = dateToYMD(date);
  return `${d} ${months[m]} ${y}`;
}

export function createCollectionObject(
  name: string,
  dateCreated: string | Date,
  // dateModified: string,
  image: string,
  id?: string
): ICollection {
  return {
    name,
    id: id ? id : generateID(),
    dateCreated:
      typeof dateCreated === "string" ? new Date(dateCreated) : dateCreated,
    dateModified: new Date(),
    image,
  };
}

export function createItemObject(
  name: string,
  collection: string,
  description: string,
  city: string,
  image: string,
  dateCreated: string | Date,
  id?: string
): IItem {
  return {
    name,
    id: id ? id : generateID(),
    collection,
    description,
    city,
    image,
    dateCreated:
      typeof dateCreated === "string" ? new Date(dateCreated) : dateCreated,
    dateModified: new Date(),
  };
}

export const generateCollectionPicture = (
  collectionName: string
): ImageSourcePropType => {
  const remain = (collectionName.charCodeAt(0) + collectionName.length) % 5;
  // so that it's the same picture everytime

  switch (remain) {
    case 0:
      return require(`../images/collectionsExamples/0.jpg`);
    case 1:
      return require(`../images/collectionsExamples/1.jpg`);
    case 2:
      return require(`../images/collectionsExamples/2.jpg`);
    case 3:
      return require(`../images/collectionsExamples/3.jpg`);
    case 4:
      return require(`../images/collectionsExamples/4.jpg`);
    default:
      return require(`../images/collectionsExamples/4.jpg`);
  }
};

export const generateItemPicture = (itemName: string): ImageSourcePropType => {
  const remain = (itemName.charCodeAt(0) + itemName.length) % 5;
  // so that it's the same picture everytime

  switch (remain) {
    case 0:
      return require(`../images/itemsExamples/0.jpg`);
    case 1:
      return require(`../images/itemsExamples/1.jpg`);
    case 2:
      return require(`../images/itemsExamples/2.jpg`);
    case 3:
      return require(`../images/itemsExamples/3.jpg`);
    case 4:
      return require(`../images/itemsExamples/4.jpg`);
    default:
      return require(`../images/itemsExamples/4.jpg`);
  }
};

import { ICollection } from "../store/reducers/collectionReducer";
import { IItem } from "../store/reducers/itemReducer";

export function generateID(): string {
  // source: https://gist.github.com/gordonbrander/2230317

  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2);
}

export function dateToString(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  return `${y}-${m}-${d}`;
}

export function createCollectionObject(
  name: string,
  dateCreated: string,
  // dateModified: string,
  image: string,
  id?: string
): ICollection {
  return {
    name,
    id: id ? id : generateID(),
    dateCreated: new Date(dateCreated),
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
  dateCreated: string,
  id?: string
): IItem {
  return {
    name,
    id: id ? id : generateID(),
    collection,
    description,
    city,
    image,
    dateCreated: new Date(dateCreated),
    dateModified: new Date(),
  };
}

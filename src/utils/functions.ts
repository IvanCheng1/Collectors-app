import { ICollection } from "../store/reducers/collectionReducer";

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
  image: string
): ICollection {
  return {
    name,
    id: generateID(),
    dateCreated: new Date(dateCreated),
    dateModified: new Date(),
    image,
  };
}

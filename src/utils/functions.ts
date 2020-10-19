import { ICollection } from "../store/reducers/collectionReducer";

export function generateID(): string {
  // source: https://gist.github.com/gordonbrander/2230317

  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2);
}

export function createCollectionObject(
  name: string,
  dateCreated: string,
  dateModified: string,
  image: string
): ICollection {
  return {
    name,
    id: generateID(),
    dateCreated: new Date(dateCreated),
    dateModified: new Date(dateModified),
    image,
  };
}

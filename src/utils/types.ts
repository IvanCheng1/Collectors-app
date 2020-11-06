export type Sort = "Date descending" | "Date ascending" | "Alphabetical";

export const sortButtons: Sort[] = [
  "Date descending",
  "Date ascending",
  "Alphabetical",
];

export type Sort2 = "Newest" | "Oldest" | "Last modified" | "" | "A-Z" | "Z-A";

export const sortButtons2: Sort2[][] = [
  ["Newest", "Oldest"],
  ["Last modified"],
  ["A-Z", "Z-A"],
];

export const sortButtonsDefault: Sort2[] = [
  sortButtons2[0][0],
  sortButtons2[1][0],
  sortButtons2[2][0],
];

export type Orientation = "landscape" | "portrait";

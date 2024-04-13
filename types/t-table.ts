export enum ColumnType {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
  IMAGE = "image",
}

export type Column = {
  key: string;
  label: string;
  type: ColumnType;
};

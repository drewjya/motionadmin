export enum ColumnType {
  TEXT = "text",
  NUMBER = "number",
  DATE = "date",
  IMAGE = "image",
  ARRAY = "array",
}

export type Column = {
  key: string;
  label: string;
  type: ColumnType;
};


export const page: {
  title: string;
  link: string;
}[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Product",
    link: "/product",
  },
  {
    title: "Gallery",
    link: "/gallery",
  },

  {
    title: "Category",
    link: "/category",
  },
  {
    link: "/compro",
    title: "Compro",
  },
  {
    link: "/news",
    title: "News",
  },
];

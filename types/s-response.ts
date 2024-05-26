export type SResponse<T> = {
  code: number;
  messages: Object;
  data: T | undefined;
  meta: Meta | undefined;
};

export type Meta = {
  limit: number;
  page: number;
  next_page: number;
  previous_page: number;
  count: number;
  total_page: number;
};

export type Product<T> = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  serial_code: string;
  categories: T[];
};

export type CategoryProduct = {
  id: number;
  name: string;
  image?: string;
};

export type YT = {
  ID: Number;
  VideoId: string;
  Thumbnail: string;
};

export type PromotionProduct = {
  id: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
  };
  image: string;
};

export type Banner = {
  image: string;
};

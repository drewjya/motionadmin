export type SResponse<T> = {
  code: number;
  messages: Object;
  data: T;
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

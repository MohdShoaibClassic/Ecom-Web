import { DefaultLoadingState } from "../../types";

export type Product = {
  id: string;
  name: string;
  author: string;
  description: string;
  price: number;
  image?: string;
  title: string;
};

export type ProductsState = DefaultLoadingState & {
  products: Product[];
};

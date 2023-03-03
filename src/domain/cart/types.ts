import { Product } from "../products/types";

export interface CartItem extends Product {
  cartQuantity: number;
}

export type CartState = {
  cartItems: CartItem[];
};

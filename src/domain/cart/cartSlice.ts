import {
  Action,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CartItem, CartState } from "./types";
import type { RootState } from "../../store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "../products/types";

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingIndex: number = state.cartItems.findIndex(
        (item: CartItem) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info("Increased Product quantity", {
          position: "top-right",
        });
      } else {
        const tempProductItem: CartItem = {
          ...action.payload,
          cartQuantity: 1,
        };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "top-right",
        });
      }
    },
    removeFromCart(state, action: PayloadAction<Product>) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;

          toast.error("Product removed from cart", {
            position: "top-right",
          });
        }
        return state;
      });
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartSliceReducer = cartSlice.reducer;
export const cartSelector = (state: RootState) => state.cartItems;
export const totalAmountSelector = createSelector(
  [cartSelector],
  (cartSelector) =>
    cartSelector.cartItems
      .reduce((a: number, c: CartItem) => (a += c.price * c.cartQuantity), 0)
      .toFixed(2)
);
export const totalItemsCount = createSelector(
  [cartSelector],
  (cartSelector) => cartSelector.cartItems.length
);

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { delay } from "../../utils/delay";
import { Product, ProductsState } from "./types";

export const getProducts = createAsyncThunk<Product[]>(
  "products/get",
  async () => {
    // simulating a delay
    await delay(3000);
    return fetch("https://fakestoreapi.com/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => res);
  }
);

// The code below is how a real world async thunk would look like

// export const getBooks = createAsyncThunk<Book[]>('books/get', async (_, thunkApi) => {
//   const {rejectWithValue, signal} = thunkApi;

//   const response = await fetch('/books', { signal });

//   const data = await response.json();

//   if (response.status !== 200) {
//     return rejectWithValue(data as string)
//   }

//   return data as Book[];
// })

const initialState: ProductsState = {
  products: [],
  loading: "not loaded",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanupProducts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = "loaded";
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = "error";
        state.error = (action.payload as string) ?? action.error.message;
      });
  },
});

export const productsSliceReducer = productsSlice.reducer;
export const { cleanupProducts } = productsSlice.actions;
export const productsSelector = (state: RootState) => state.products;

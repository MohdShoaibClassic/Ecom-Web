import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  productsSliceReducer,
  getProducts,
} from "../domain/products/productsSlice";
import { cartSliceReducer } from "../domain/cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const combinedReducer = combineReducers({
  products: productsSliceReducer,
  cartItems: cartSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

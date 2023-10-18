import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product-list/productSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

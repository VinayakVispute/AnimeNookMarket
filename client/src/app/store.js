import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product-list/productSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import countriesReducer from "../features/countries/countriesSlice";
import orderReducer from "../features/orders/orderSlice";
import userReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    countries: countriesReducer,
    order: orderReducer,
    user: userReducer,
  },
});

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTOCart,
  deleteItemsfromCart,
  fetchItemsByUserId,
  updateCart,
  resetCart,
} from "./cartAPI";
const initialState = {
  items: [],
  status: "idle",
};

export const addTOCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addTOCart(item);
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    console.log("Update cart", update);
    const response = await updateCart(update);
    return response.data;
  }
);
export const deleteItemsfromCartAsync = createAsyncThunk(
  "cart/deleteItemsfromCart",
  async (productId) => {
    const response = await deleteItemsfromCart(productId);
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTOCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTOCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemsfromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemsfromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;

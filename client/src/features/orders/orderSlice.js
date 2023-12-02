import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, updateOrderStatus } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrderPlaced: null,
  totalOrders: 0,
};
// we may need more information of current order
export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ sort, pagination, filter }) => {
    console.log("Slice", "sort", sort, "pagination", pagination);
    const response = await fetchAllOrders(sort, pagination, filter);
    return response.data;
  }
);
export const updateOrderStatusAsync = createAsyncThunk(
  "order/updateOrderStatus",
  async (order) => {
    console.log("Slice", "order", order);
    const response = await updateOrderStatus(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      console.log("resetting order");
      state.currentOrderPlaced = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload.data);
        state.currentOrderPlaced = action.payload.data;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.data.orders;
        state.totalOrders = action.payload.data.totalOrders;
      })
      .addCase(updateOrderStatusAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex((order) => {
          console.log("order", order.id, "action", action.payload);
          return order.id === action.payload.data.id;
        });
        state.orders[index] = action.payload.data;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const selectCurrentOrderPlaced = (state) =>
  state.order.currentOrderPlaced;
export const selectAllOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export default orderSlice.reducer;

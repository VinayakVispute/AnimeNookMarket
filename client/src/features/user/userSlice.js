import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUserOrders,
  updateUser,
  fetchLoggedInUser,
  addAddressToUser,
  updateAddress,
  deleteAddress,
} from "./userAPI";

const initialState = {
  userOrders: [],
  userInfo: null, //this will have more info than auth user
  status: "idle",
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async () => {
    const response = await fetchLoggedInUser();
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (id) => {
    const response = await updateUser(id);
    return response.data;
  }
);

export const addAddressToUserAsync = createAsyncThunk(
  "user/addAddressToUser",
  async (address) => {
    const response = await addAddressToUser(address);
    return response.data;
  }
);

export const updateAddressAsync = createAsyncThunk(
  "user/updateAddress",
  async (updatedDetails) => {
    const response = await updateAddress(updatedDetails);
    return response.data;
  }
);

export const deleteAddressAsync = createAsyncThunk(
  "user/deleteAddress",
  async (addressId) => {
    const response = await deleteAddress(addressId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";

        //this info can be different or more from loggined user from auth
        state.userOrders = action.payload.data.orders;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload.user;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //this info can be different or more from loggined user from auth
        state.userInfo = action.payload.user;
      })
      .addCase(addAddressToUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAddressToUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload.data;
      })
      .addCase(updateAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload.data;
      })
      .addCase(deleteAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload.data;
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export default userSlice.reducer;

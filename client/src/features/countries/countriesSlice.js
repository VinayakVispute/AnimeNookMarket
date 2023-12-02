import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllCountries } from "./countriesAPI";

const initialState = {
  countries: null,
  status: "idle",
};

export const fetchAllCountriesAsync = createAsyncThunk(
  "countries/fetchAllCountries",
  async () => {
    const response = await fetchAllCountries();
    return response.data;
  }
);

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCountriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCountriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.countries = action.payload.data;
      });
  },
});

export const selectAllCountries = (state) => state.countries.countries;

export default countriesSlice.reducer;

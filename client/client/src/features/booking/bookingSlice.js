import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as bookingAPI from "./bookingAPI";

export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async (role) => {
    const res = await bookingAPI.getMyBookings(role);
    return res.data;
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    list: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  }
});

export default bookingSlice.reducer;

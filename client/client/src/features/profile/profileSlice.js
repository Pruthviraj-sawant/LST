import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as profileAPI from "./profileAPI";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const res = await profileAPI.getProfile();
    return res.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default profileSlice.reducer;

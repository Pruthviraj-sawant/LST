import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as ratingAPI from "./ratingAPI";

/* ---------------- THUNKS ---------------- */

// Website rating
export const submitWebsiteRating = createAsyncThunk(
  "rating/submitWebsiteRating",
  async (data, thunkAPI) => {
    try {
      const res = await ratingAPI.createWebsiteRating(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// Worker rating
export const submitWorkerRating = createAsyncThunk(
  "rating/submitWorkerRating",
  async ({ workerId, data }, thunkAPI) => {
    try {
      const res = await ratingAPI.rateWorker(workerId, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// Fetch ratings for worker
export const fetchWorkerRatings = createAsyncThunk(
  "rating/fetchWorkerRatings",
  async (workerId, thunkAPI) => {
    try {
      const res = await ratingAPI.getRatingsForWorker(workerId);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

/* ---------------- SLICE ---------------- */

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    list: [],
    loading: false,
    success: false,
    error: null
  },
  reducers: {
    clearRatingState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // Submit website rating
      .addCase(submitWebsiteRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitWebsiteRating.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list.push(action.payload);
      })
      .addCase(submitWebsiteRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Submit worker rating
      .addCase(submitWorkerRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitWorkerRating.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list.push(action.payload);
      })
      .addCase(submitWorkerRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch worker ratings
      .addCase(fetchWorkerRatings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkerRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchWorkerRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearRatingState } = ratingSlice.actions;
export default ratingSlice.reducer;

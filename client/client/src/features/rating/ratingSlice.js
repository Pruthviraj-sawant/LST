import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as ratingAPI from "./ratingAPI";

/* ============ THUNKS ============ */

// Website rating
export const submitWebsiteRating = createAsyncThunk(
  "rating/submitWebsiteRating",
  async (data, thunkAPI) => {
    try {
      const res = await ratingAPI.createWebsiteRating(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to submit rating"
      );
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
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to submit rating"
      );
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
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch ratings"
      );
    }
  }
);

// Get rating by ID
export const getRatingById = createAsyncThunk(
  "rating/getRatingById",
  async (ratingId, thunkAPI) => {
    try {
      const res = await ratingAPI.getRatingById(ratingId);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch rating"
      );
    }
  }
);

// Update rating
export const updateRatingAsync = createAsyncThunk(
  "rating/updateRating",
  async ({ ratingId, data }, thunkAPI) => {
    try {
      const res = await ratingAPI.updateRating(ratingId, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update rating"
      );
    }
  }
);

// Delete rating
export const deleteRatingAsync = createAsyncThunk(
  "rating/deleteRating",
  async (ratingId, thunkAPI) => {
    try {
      await ratingAPI.deleteRating(ratingId);
      return ratingId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete rating"
      );
    }
  }
);

// Fetch all ratings (Admin)
export const fetchAllRatings = createAsyncThunk(
  "rating/fetchAllRatings",
  async (_, thunkAPI) => {
    try {
      const res = await ratingAPI.getAllRatings();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch ratings"
      );
    }
  }
);

/* ============ SLICE ============ */

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    list: [],
    currentRating: null,
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
      })

      // Get rating by ID
      .addCase(getRatingById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRatingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRating = action.payload;
      })
      .addCase(getRatingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update rating
      .addCase(updateRatingAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRatingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list = state.list.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
      })
      .addCase(updateRatingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete rating
      .addCase(deleteRatingAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRatingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.list = state.list.filter((r) => r._id !== action.payload);
      })
      .addCase(deleteRatingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all ratings
      .addCase(fetchAllRatings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearRatingState } = ratingSlice.actions;
export default ratingSlice.reducer;

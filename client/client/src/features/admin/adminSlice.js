import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as adminAPI from "./adminAPI";

/* ============ THUNKS ============ */

// Verify Worker
export const verifyWorkerThunk = createAsyncThunk(
  "admin/verifyWorker",
  async (workerId, thunkAPI) => {
    try {
      const res = await adminAPI.verifyWorker(workerId);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to verify worker"
      );
    }
  }
);

// Get All Workers
export const fetchAllWorkers = createAsyncThunk(
  "admin/fetchAllWorkers",
  async (_, thunkAPI) => {
    try {
      const res = await adminAPI.getAllWorkers();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch workers"
      );
    }
  }
);

// Get All Ratings
export const fetchAllRatings = createAsyncThunk(
  "admin/fetchAllRatings",
  async (_, thunkAPI) => {
    try {
      const res = await adminAPI.getAllRatings();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch ratings"
      );
    }
  }
);

/* ============ SLICE ============ */

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    workers: [],
    ratings: [],
    loading: false,
    success: false,
    error: null
  },
  reducers: {
    clearAdminState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Verify Worker
      .addCase(verifyWorkerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyWorkerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Update worker in list
        state.workers = state.workers.map((w) =>
          w._id === action.payload._id ? action.payload : w
        );
      })
      .addCase(verifyWorkerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Workers
      .addCase(fetchAllWorkers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllWorkers.fulfilled, (state, action) => {
        state.loading = false;
        state.workers = action.payload;
      })
      .addCase(fetchAllWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Ratings
      .addCase(fetchAllRatings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload;
      })
      .addCase(fetchAllRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;

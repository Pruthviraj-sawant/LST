import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as bookingAPI from "./bookingAPI";

/* ============ THUNKS ============ */

// Fetch User Bookings
export const fetchUserBookings = createAsyncThunk(
  "booking/fetchUserBookings",
  async (_, thunkAPI) => {
    try {
      const res = await bookingAPI.getUserBookings();
      return res.data.bookings;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

// Fetch Worker Bookings
export const fetchWorkerBookings = createAsyncThunk(
  "booking/fetchWorkerBookings",
  async (_, thunkAPI) => {
    try {
      const res = await bookingAPI.getWorkerBookings();
      return res.data.bookings;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
);

// Fetch Bookings (Generic - uses role to determine which endpoint)
export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async (role) => {
    const res = await bookingAPI.getMyBookings(role);
    return res.data.bookings;
  }
);

// Create Booking
export const createBookingAsync = createAsyncThunk(
  "booking/createBooking",
  async (data, thunkAPI) => {
    try {
      const res = await bookingAPI.createBooking(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create booking"
      );
    }
  }
);

// Accept Booking (Worker)
export const acceptBookingAsync = createAsyncThunk(
  "booking/acceptBooking",
  async (bookingId, thunkAPI) => {
    try {
      const res = await bookingAPI.acceptBooking(bookingId);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to accept booking"
      );
    }
  }
);

// Complete Booking (Worker)
export const completeBookingAsync = createAsyncThunk(
  "booking/completeBooking",
  async (bookingId, thunkAPI) => {
    try {
      const res = await bookingAPI.completeBooking(bookingId);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to complete booking"
      );
    }
  }
);

// Cancel Booking (User)
export const cancelBookingAsync = createAsyncThunk(
  "booking/cancelBooking",
  async (bookingId, thunkAPI) => {
    try {
      const res = await bookingAPI.cancelBooking(bookingId);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to cancel booking"
      );
    }
  }
);

/* ============ SLICE ============ */

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    list: [],
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    clearBookingState: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Worker Bookings
      .addCase(fetchWorkerBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkerBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchWorkerBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Bookings (Generic)
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      // Create Booking
      .addCase(createBookingAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload.booking);
        state.success = true;
      })
      .addCase(createBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Accept Booking
      .addCase(acceptBookingAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(acceptBookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Update booking in list
        state.list = state.list.map((b) =>
          b._id === action.payload._id ? action.payload : b
        );
      })
      .addCase(acceptBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Complete Booking
      .addCase(completeBookingAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(completeBookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Update booking in list
        state.list = state.list.map((b) =>
          b._id === action.payload._id ? action.payload : b
        );
      })
      .addCase(completeBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cancel Booking
      .addCase(cancelBookingAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelBookingAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Update booking in list
        state.list = state.list.map((b) =>
          b._id === action.payload._id ? action.payload : b
        );
      })
      .addCase(cancelBookingAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;

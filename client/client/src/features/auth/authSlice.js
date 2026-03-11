import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "./authAPI";

/* ============ THUNKS ============ */

// Register Customer
export const registerCustomerAsync = createAsyncThunk(
  "auth/registerCustomer",
  async (data, thunkAPI) => {
    try {
      const res = await authAPI.registerCustomer(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Register Worker
export const registerWorkerAsync = createAsyncThunk(
  "auth/registerWorker",
  async (data, thunkAPI) => {
    try {
      const res = await authAPI.registerWorker(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Login
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await authAPI.login(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

/* ============ SLICE ============ */

const initialState = {
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register Customer
      .addCase(registerCustomerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCustomerAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerCustomerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register Worker
      .addCase(registerWorkerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerWorkerAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerWorkerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer; 
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import profileReducer from "../features/profile/profileSlice";
import { persistReducer, persistStore } from "redux-persist";
import ratingReducer from "../features/rating/ratingSlice";
import bookingReducer from "../features/booking/bookingSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
};

const persistedAuth = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    profile: profileReducer,
    rating: ratingReducer,
    booking: bookingReducer

  }
});

export const persistor = persistStore(store);

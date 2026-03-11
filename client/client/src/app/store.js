import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
//persistreducer is a higher order reducer that wraps our authReducer and adds persistence capabilities to it
//persistence capabilities means that the state of the auth slice will be saved to localStorage and rehydrated when the app is loaded, so that the user remains logged in even after refreshing the page
//reducers are used to update the state of the store based on the actions dispatched, they are pure functions that take the current state and an action as arguments and return a new state
import authReducer from "../features/auth/authSlice";
import storage from "redux-persist/lib/storage";
//storage is the default storage engine for web, it uses localStorage to save the state of the auth slice, it provides a simple API to set, get and remove items from localStorage
import profileReducer from "../features/profile/profileSlice";

import ratingReducer from "../features/rating/ratingSlice";
import bookingReducer from "../features/booking/bookingSlice";
import adminReducer from "../features/admin/adminSlice";

//this all are the slices that we have created for our app, they are responsible for managing the state of the auth, profile, rating and booking features of our app, we will combine them in the store and use them to update the state of our app based on the actions dispatched slices are nothing but the reducers that we have created for each feature of our app, they are responsible for managing the state of that feature and updating it based on the actions dispatched, they are created using createSlice from @reduxjs/toolkit which provides a simple API to create reducers and actions in one go, we will combine them in the store and use them to update the state of our app based on the actions dispatched, we will also use persistReducer to wrap our authReducer and add persistence capabilities to it, so that the user remains logged in even after refreshing the page, we will also configure the store using configureStore from @reduxjs/toolkit which provides a simple API to create a Redux store with good defaults and support for middleware and devtools
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
};
//key: "root" means that the persisted state will be stored under the key "root" in localStorage, this is a common convention for naming the key for the persisted state, it can be any string but "root" is often used to indicate that it is the root of the persisted state
//persistconfig remembers the configuration for the persistReducer, it specifies the key for the persisted state, the storage engine to use and the whitelist of reducers to persist, in our case we only want to persist the auth slice, so we add it to the whitelist, this means that only the state of the auth slice will be saved to localStorage and rehydrated when the app is loaded, we don't want to persist profile, rating or booking data because they are not critical for maintaining the user's session and can be fetched from the server when needed
//whitelist means only persist the auth slice, we don't want to persist profile, rating or booking data
const persistedAuth = persistReducer(persistConfig, authReducer);

//persistReducer is a higher order reducer that wraps our authReducer and adds persistence capabilities to it, it takes the persistConfig and the authReducer as arguments and returns a new reducer that we can use in our store, this new reducer will handle the persistence of the auth state to localStorage and rehydration when the app is loaded, we will use this persistedAuth reducer in our store instead of the original authReducer, so that we can manage the state of the auth slice with persistence capabilities, this way we can ensure that the user remains logged in even after refreshing the page, and we can also use the Redux DevTools extension to debug our store and see the state changes in real time

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    profile: profileReducer,
    rating: ratingReducer,
    booking: bookingReducer,
    admin: adminReducer
  }
});
//store is object that holds the state of our app and allows us to dispatch actions to update that state, we create it using configureStore from @reduxjs/toolkit which provides a simple API to create a Redux store with good defaults and support for middleware and devtools, we pass an object with a reducer property that combines all the reducers for our app, we use the persistedAuth reducer for the auth slice to add persistence capabilities to it, and we use the profileReducer, ratingReducer and bookingReducer for the profile, rating and booking slices respectively, this way we can manage the state of all these features in our app using Redux, and we can also persist the auth state to localStorage so that the user remains logged in even after refreshing the page, we can also use the Redux DevTools extension to debug our store and see the state changes in real time, we can also use middleware to add additional functionality to our store, such as logging, error handling or async actions, but for now we will keep it simple and just use the default middleware provided by configureStore
//we jave configure store by passing an object with a reducer property that combines all the reducers for our app, we use the persistedAuth reducer for the auth slice to add persistence capabilities to it, and we use the profileReducer, ratingReducer and bookingReducer for the profile, rating and booking slices respectively, this way we can manage the state of all these features in our app using Redux, and we can also persist the auth state to localStorage so that the user remains logged in even after refreshing the page, we can also use the Redux DevTools extension to debug our store and see the state changes in real time, we can also use middleware to add additional functionality to our store, such as logging, error handling or async actions, but for now we will keep it simple and just use the default middleware provided by configureStore

export const persistor = persistStore(store);

//to save persisteance we have used persistconfig we have storeed the auth only so it can remeber when we login again after refreshing the page, we have used persiststore to create a persistor object that we can use in our app to manage the persistence of our store, we will use this persistor in our app to wrap our root component with PersistGate from redux-persist/integration/react which will delay the rendering of our app until the persisted state has been rehydrated, this way we can ensure that the user remains logged in even after refreshing the page, and we can also use the Redux DevTools extension to debug our store and see the state changes in real time, we can also use middleware to add additional functionality to our store, such as logging, error handling or async actions, but for now we will keep it simple and just use the default middleware provided by configureStore 
//then we passed the authreducer and perisistconfig to persistreducer to create a new reducer with persistence capabilities, and we used this new reducer in our store instead of the original authReducer, so that we can manage the state of the auth slice with persistence capabilities, this way we can ensure that the user remains logged in even after refreshing the page, and we can also use the Redux DevTools extension to debug our store and see the state changes in real time, we can also use middleware to add additional functionality to our store, such as logging, error handling or async actions, but for now we will keep it simple and just use the default middleware provided by configureStore
//final component persistor is used to manage the persistence of our store, we will use this persistor in our app to wrap our root component with PersistGate from redux-persist/integration/react which will delay the rendering of our app until the persisted state has been rehydrated, this way we can ensure that the user remains logged in even after refreshing the page, and we can also use the Redux DevTools extension to debug our store and see the state changes in real time, we can also use middleware to add additional functionality to our store, such as logging, error handling or async actions, but for now we will keep it simple and just use the default middleware provided by configureStore
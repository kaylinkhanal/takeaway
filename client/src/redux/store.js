import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from './reducers/userSlice'
import locationSlice from './reducers/locationSlice'

import storage from 'redux-persist/lib/storage';
const reducer = combineReducers({
  user: userSlice,
  location: locationSlice
});

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store)

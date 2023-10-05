import { combineReducers } from '@reduxjs/toolkit';
import { headerSlice } from './slices/header';
import { postSlice } from './slices/posts';
import { baseApi } from './services';

export const rootReducer = combineReducers({
  header: headerSlice.reducer,
  post: postSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

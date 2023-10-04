import { combineReducers } from '@reduxjs/toolkit';
import { headerSlice } from './slices/header';
import { postSlice } from './slices/posts';

export const rootReducer = combineReducers({
  header: headerSlice.reducer,
  post: postSlice.reducer,
});

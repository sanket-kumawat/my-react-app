import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { baseApi } from './services';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: import.meta.env.MODE === 'development',
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

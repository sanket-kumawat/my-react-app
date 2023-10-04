import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type PostInitialState = {
  posts: Post[];
  isFetching: boolean;
  error: boolean;
};

const initialState: PostInitialState = {
  posts: [],
  isFetching: false,
  error: false,
};

export const fetchPosts = createAsyncThunk<Post[], void>(
  'posts/fetchPosts',
  async (params) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      return response.json();
    } catch (error) {
      return error;
    }
  }
);

export const postSlice = createSlice({
  name: 'postSlice',
  initialState,
  reducers: {},

  extraReducers: (b) => {
    b.addCase(fetchPosts.pending, (state, action) => {
      state.isFetching = true;
    });

    b.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isFetching = false;
    });

    b.addCase(fetchPosts.rejected, (state, action) => {
      state.isFetching = false;
      state.error = true;
    });
  },
});

export const postSelector = (state: RootState) => state.post;

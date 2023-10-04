import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type HeaderInitialState = {
  title: string;
  show: boolean;
};

const initialState: HeaderInitialState = {
  title: 'Home',
  show: true,
};

export const toggleHeader = createAction('toggleHeader');

export const updateHeaderTitle = createAction<string>('updateHeaderTitle');

export const headerSlice = createSlice({
  name: 'headerSlice',
  initialState,
  reducers: {
    // updateHeaderTitle: (state, action: PayloadAction<string>) => {
    //   state.title = action.payload;
    // }
  },

  extraReducers: (b) => {
    b.addCase(toggleHeader, (state) => {
      state.show = !state.show;
      // return { ...state, show: !state.show };
    });

    b.addCase(updateHeaderTitle, (state, action) => {
      state.title = action.payload;
    });
  },
});

// export const { updateHeaderTitle } = headerSlice.actions;

export const headerSelector = (state: RootState) => state.header;

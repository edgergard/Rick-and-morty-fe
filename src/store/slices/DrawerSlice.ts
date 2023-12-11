/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    isDrawerOpened: false,
  },
  reducers: {
    openDrawer: (state) => {
      state.isDrawerOpened = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpened = false;
    },
  },
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;
export const drawerReducer = drawerSlice.reducer;

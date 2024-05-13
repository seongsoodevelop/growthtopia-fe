import { createSlice } from "@reduxjs/toolkit";

const name = "control";

export const controlInitialState = {
  base: {
    userMenuOpen: false,
  },
};

export const slice = createSlice({
  name,
  initialState: controlInitialState,
  reducers: {
    updateControlBase: (state, action) => {
      state.base = { ...state.base, ...action.payload };
    },
  },
  extraReducers: (builder) => {},
});

export default slice.reducer;

export const { updateControlBase } = slice.actions;

export const controlSelector = (state) => state.control;

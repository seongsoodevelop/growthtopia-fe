import { createSlice } from "@reduxjs/toolkit";
import { addAPICallActionCase, createAPICallAction } from "#lib/reduxTools";

import * as UserAPI from "#lib/api/user";

const name = "user";

export const userMetaTicket = createAPICallAction(
  `${name}/userMetaTicket`,
  UserAPI.metaTicket
);

export const userInitialState = {
  onPending: false,
  meta: {
    ticketToken: null,
  },
};

export const slice = createSlice({
  name,
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    addAPICallActionCase(
      builder,
      userMetaTicket,
      {
        fulfilled: (state, action) => {
          state.meta.ticketToken = action.payload.ticketToken;
        },
        rejected: (state, action) => {
          state.meta.ticketToken = null;
        },
      },
      {}
    );
  },
});

export default slice.reducer;

//   export const { } = slice.actions;

export const userSelector = (state) => state.user;

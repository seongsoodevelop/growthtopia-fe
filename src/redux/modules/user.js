import { createSlice } from "@reduxjs/toolkit";
import { addAPICallActionCase, createAPICallAction } from "#lib/reduxTools";

import * as UserAPI from "#lib/api/user";
import { authSessionHi } from "./auth";

const name = "user";

export const userMetaTicket = createAPICallAction(
  `${name}/userMetaTicket`,
  UserAPI.metaTicket
);

export const userWorkStart = createAPICallAction(
  `${name}/userWorkStart`,
  UserAPI.workStart
);
export const userWorkEnd = createAPICallAction(
  `${name}/userWorkEnd`,
  UserAPI.workEnd
);

export const userInitialState = {
  onPending: false,
  meta: {
    ticketToken: null,
  },
  profile: {
    work_task_id: null,
    work_task_start_at: null,
    work_task: null,
  },
};

export const slice = createSlice({
  name,
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authSessionHi.fulfilled, (state, action) => {
      state.profile = action.payload.userProfile;
    });

    addAPICallActionCase(
      builder,
      userWorkStart,
      {
        fulfilled: (state, action) => {
          state.profile = action.payload.userProfile;
        },
      },
      {}
    );
    addAPICallActionCase(
      builder,
      userWorkEnd,
      {
        fulfilled: (state, action) => {
          state.profile = action.payload.userProfile;
        },
      },
      {}
    );

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

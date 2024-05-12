import { createSlice } from "@reduxjs/toolkit";
import { addAPICallActionCase, createAPICallAction } from "#lib/reduxTools";

import * as AuthAPI from "#lib/api/auth";

const name = "auth";

export const authSocialKakao = createAPICallAction(
  `${name}/authSocialKakao`,
  AuthAPI.socialKakao
);

export const authGreeting = createAPICallAction(
  `${name}/authGreeting`,
  AuthAPI.greeting
);

export const authInitialState = {
  isGreeted: false,
  isLogged: false,
  loggedData: {
    user_no: -1,
    nickname: "inquirist",
  },
  onPending: false,
};

export const slice = createSlice({
  name,
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    addAPICallActionCase(
      builder,
      authSocialKakao,
      {
        fulfilled: (state, action) => {
          console.log("fulfilled");
          window.location.href = "/";
        },
        rejected: (state, action) => {
          console.log("rejected");
        },
      },
      {}
    );

    addAPICallActionCase(
      builder,
      authGreeting,
      {
        fulfilled: (state, action) => {
          state.isGreeted = true;
          state.isLogged = true;
          state.loggedData = action.payload.loggedData;
        },
        rejected: (state, action) => {
          state.isGreeted = true;
        },
      },
      {}
    );
  },
});

export default slice.reducer;

//   export const { } = slice.actions;

export const authSelector = (state) => state.auth;

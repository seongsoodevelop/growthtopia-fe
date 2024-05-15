import { createSlice } from "@reduxjs/toolkit";
import { addAPICallActionCase, createAPICallAction } from "#lib/reduxTools";

import * as AuthAPI from "#lib/api/auth";

const name = "auth";

export const authSessionHi = createAPICallAction(
  `${name}/authSessionHi`,
  AuthAPI.sessionHi
);
export const authSessionBye = createAPICallAction(
  `${name}/authSessionBye`,
  AuthAPI.sessionBye
);

export const authSocialKakao = createAPICallAction(
  `${name}/authSocialKakao`,
  AuthAPI.socialKakao
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
      authSessionHi,
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
    addAPICallActionCase(
      builder,
      authSessionBye,
      {
        fulfilled: (state, action) => {
          window.location.href = "/";
        },
        rejected: (state, action) => {
          window.location.href = "/";
        },
      },
      {}
    );

    addAPICallActionCase(
      builder,
      authSocialKakao,
      {
        fulfilled: (state, action) => {
          window.location.href = "/";
        },
        rejected: (state, action) => {
          alert("실패");
          window.location.href = "/";
        },
      },
      {}
    );
  },
});

export default slice.reducer;

//   export const { } = slice.actions;

export const authSelector = (state) => state.auth;

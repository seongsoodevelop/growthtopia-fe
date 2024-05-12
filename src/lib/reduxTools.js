import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAPICallAction = (action_name, api_call) => {
  return createAsyncThunk(`${action_name}`, async (payload, thunkAPI) => {
    try {
      return (await api_call(payload)).data;
    } catch (e) {
      return thunkAPI.rejectWithValue((await e.response).data);
    }
  });
};

export const addAPICallActionCase = (
  builder,
  action,
  { pending, fulfilled, rejected }, // calls
  { handleOnPending } // options
) => {
  let _pending = pending;
  let _fulfilled = fulfilled;
  let _rejected = rejected;

  if (handleOnPending !== false) {
    if (pending) {
      _pending = (state, action) => {
        state.onPending = true;
        pending(state, action);
      };
    } else {
      _pending = (state, action) => {
        state.onPending = true;
      };
    }
    if (fulfilled) {
      _fulfilled = (state, action) => {
        state.onPending = false;
        fulfilled(state, action);
      };
    } else {
      _fulfilled = (state, action) => {
        state.onPending = false;
      };
    }
    if (rejected) {
      _rejected = (state, action) => {
        state.onPending = false;
        rejected(state, action);
      };
    } else {
      _rejected = (state, action) => {
        state.onPending = false;
      };
    }
  }

  if (_pending) {
    builder.addCase(action.pending, _pending);
  }
  if (_fulfilled) {
    builder.addCase(action.fulfilled, _fulfilled);
  }
  if (_rejected) {
    builder.addCase(action.rejected, _rejected);
  }
};

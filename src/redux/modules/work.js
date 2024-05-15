import { createSlice } from "@reduxjs/toolkit";

import * as WorkAPI from "#lib/api/work";
import { addAPICallActionCase, createAPICallAction } from "#lib/reduxTools";
import { userWorkEnd } from "./user";

const name = "work";

export const workTaskQuery = createAPICallAction(
  `${name}/workTaskQuery`,
  WorkAPI.taskQuery
);
export const workTaskInsert = createAPICallAction(
  `${name}/workTaskInsert`,
  WorkAPI.taskInsert
);
export const workTaskRemove = createAPICallAction(
  `${name}/workTaskRemove`,
  WorkAPI.taskRemove
);
export const workTaskUpdate = createAPICallAction(
  `${name}/workTaskUpdate`,
  WorkAPI.taskUpdate
);

export const workInitialState = {
  data: {
    tasks: [],
  },
  updateQueue: {
    tasks: [],
  },
};

export const slice = createSlice({
  name,
  initialState: workInitialState,
  reducers: {
    workPushUpdateQueue: (state, action) => {
      switch (action.payload.type) {
        case "task": {
          state.data.tasks = state.data.tasks.map((x) => {
            if (x.task_id === action.payload.data.task_id) {
              return action.payload.data;
            } else return x;
          });

          const arr = state.updateQueue.tasks.filter(
            (x) => x.task_id !== action.payload.data.task_id
          );
          arr.push(action.payload.data);
          state.updateQueue.tasks = arr;
          break;
        }
        default: {
          break;
        }
      }
    },
    workResetUpdateQueue: (state, action) => {
      state.updateQueue = workInitialState.updateQueue;
    },
  },
  extraReducers: (builder) => {
    addAPICallActionCase(
      builder,
      workTaskQuery,
      {
        fulfilled: (state, action) => {
          state.data.tasks = action.payload.data;
        },
        rejected: (state, action) => {
          state.data.tasks = [];
        },
      },
      {}
    );

    addAPICallActionCase(
      builder,
      workTaskInsert,
      {
        fulfilled: (state, action) => {
          state.data.tasks.push(action.payload.task);
        },
      },
      {}
    );

    addAPICallActionCase(
      builder,
      workTaskRemove,
      {
        fulfilled: (state, action) => {
          state.data.tasks = state.data.tasks.filter(
            (x) => x.task_id !== action.meta.arg.task_id
          );
        },
      },
      {}
    );

    builder.addCase(userWorkEnd.fulfilled, (state, action) => {
      state.data.tasks = state.data.tasks.map((x) => {
        if (x.task_id === action.payload.task.task_id) {
          return action.payload.task;
        } else return x;
      });
    });
  },
});

export default slice.reducer;

export const { workPushUpdateQueue, workResetUpdateQueue } = slice.actions;

export const workSelector = (state) => state.work;

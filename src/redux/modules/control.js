import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { workTaskInsert, workTaskRemove } from "./work";

const name = "control";

export const controlInitialState = {
  base: {
    userMenuOpen: false,
  },
  work: {
    isCalendarWeek: true,
    calendarTargetDate: moment().format("YYYY-MM-DD"),
    targetDate: moment().format("YYYY-MM-DD"),
    taskInsertOpen: false,
    taskDetail: {
      name: "",
      duration_estimated: 0,
      at: moment().format("YYYY-MM-DD"),
    },
    targetTaskId: null,
  },
};

export const slice = createSlice({
  name,
  initialState: controlInitialState,
  reducers: {
    updateControlBase: (state, action) => {
      state.base = { ...state.base, ...action.payload };
    },
    updateControlWork: (state, action) => {
      state.work = { ...state.work, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(workTaskInsert.fulfilled, (state) => {
      state.work.taskDetail.name = "";
    });
    builder.addCase(workTaskRemove.fulfilled, (state) => {
      if (state.work.targetTaskId) {
        state.work.targetTaskId = null;
        state.work.taskDetail = controlInitialState.work.taskDetail;
      }
    });
  },
});

export default slice.reducer;

export const { updateControlBase, updateControlWork } = slice.actions;

export const controlSelector = (state) => state.control;

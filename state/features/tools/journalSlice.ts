import { emotionObjType } from "@/constants/models/home/activity_log";
import { createSlice } from "@reduxjs/toolkit";

export type journalSliceTypes = {
  moodValue: number | null;
  emotions: Array<emotionObjType>;
  note: string;
  save: Boolean;
};

const journalSliceInitialState: journalSliceTypes = {
  moodValue: null, //or 4???
  emotions: [],
  note: "",
  save: true,
};

const journalSlice = createSlice({
  name: "journal",
  initialState: journalSliceInitialState,
  reducers: {
    setMoodValue: (state, action) => {
      state.moodValue = action.payload;
    },
    setEmotions: (state, action) => {
      state.emotions = action.payload;
    },
    setNote: (state, action) => {
      state.note = action.payload;
    },
    setSave: (state, action) => {
      state.save = action.payload;
    },
    journalResetState: (state) => {
      state.moodValue = journalSliceInitialState.moodValue;
      state.emotions = journalSliceInitialState.emotions;
      state.note = journalSliceInitialState.note;
    },
  },
});

export const {
  setMoodValue,
  setEmotions,
  setNote,
  setSave,
  journalResetState,
} = journalSlice.actions;

export default journalSlice.reducer;

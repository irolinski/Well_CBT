import { createSlice } from "@reduxjs/toolkit";

type journalSliceTypes = {
  moodValue: number | null;
  emotions: Array<emotionObjType>;
  note: string;
  save: Boolean;
};

export type emotionObjType = {
  name: string;
  color?: string;
  strength?: number;
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
    toggleSave: (state) => {
      state.save = !state.save;
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
  toggleSave,
  journalResetState,
} = journalSlice.actions;

export default journalSlice.reducer;

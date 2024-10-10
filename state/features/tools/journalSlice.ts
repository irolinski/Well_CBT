import { createSlice } from "@reduxjs/toolkit";

type journalSliceTypes = {
  moodValue: number;
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
  moodValue: 1, //or 4???
  emotions: [],
  note: "",
  save: false,
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
    // toggleSave: (state) => {
    //   state.save = !state.save;
    // },
    journalResetState: () => journalSliceInitialState,
  },
});

export const { setMoodValue, setEmotions, setNote, journalResetState } =
  journalSlice.actions;

export default journalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

type journalSliceTypes = {
  moodValue: number;
  emotions: string[];
  save: Boolean;
};

const journalSliceInitialState: journalSliceTypes = {
  moodValue: 1, //or 4???
  emotions: ["Relaxed", "Sad", "Calm"],
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
    // toggleSave: (state) => {
    //   state.save = !state.save;
    // },
    journalResetState: () => journalSliceInitialState,
  },
});

export const { setMoodValue, setEmotions, journalResetState } =
  journalSlice.actions;

export default journalSlice.reducer;

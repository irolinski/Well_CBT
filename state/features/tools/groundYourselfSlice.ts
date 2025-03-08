import { createSlice } from "@reduxjs/toolkit";

type groundYourselfStateTypes = {
  currentSlide: number;
};

export const groundYourselfSliceInitialState: groundYourselfStateTypes = {
  currentSlide: 0,
};

const groundYourselfSlice = createSlice({
  name: "ground_yourself",
  initialState: groundYourselfSliceInitialState,
  reducers: {
    setCurrentSlide: (state, action) => {
      state.currentSlide = action.payload;
    },
    groundYourselfResetState: () => {
      groundYourselfSliceInitialState;
    },
  },
});

export const { setCurrentSlide } = groundYourselfSlice.actions;

export default groundYourselfSlice.reducer;

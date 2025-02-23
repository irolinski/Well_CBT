import { createSlice } from "@reduxjs/toolkit";

type groundYourselfStateTypes = {
  currentSlide: number;
};

const groundYourselfSliceInitialState: groundYourselfStateTypes = {
  currentSlide: 0,
};

const groundYourselfSlice = createSlice({
  name: "ground_yourself",
  initialState: groundYourselfSliceInitialState,
  reducers: {
    setCurrentSlide: (state, action) => {
      state.currentSlide = action.payload;
    },
  },
});

export const { setCurrentSlide } = groundYourselfSlice.actions;

export default groundYourselfSlice.reducer;

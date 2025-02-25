import { ColorValue } from "react-native";
import { Colors } from "@/constants/styles/colorTheme";
import { createSlice } from "@reduxjs/toolkit";

type groundYourselfStateTypes = {
  currentSlide: number;
  numOfRepeats: number;
  touchData: {
    texture: string;
    color: string;
    feel: string;
  }[];
};

export const groundYourselfSliceInitialState: groundYourselfStateTypes = {
  currentSlide: 0,
  numOfRepeats: 0,
  touchData: [
    {
      texture: "",
      color: Colors.mainBlue,
      feel: "",
    },
    {
      texture: "",
      color: Colors.mainBlue,
      feel: "",
    },
    {
      texture: "",
      color: Colors.mainBlue,
      feel: "",
    },
    {
      texture: "",
      color: Colors.mainBlue,
      feel: "",
    },
    {
      texture: "",
      color: Colors.mainBlue,
      feel: "",
    },
  ],
};

const groundYourselfSlice = createSlice({
  name: "ground_yourself",
  initialState: groundYourselfSliceInitialState,
  reducers: {
    setCurrentSlide: (state, action) => {
      state.currentSlide = action.payload;
    },
    setNumOfRepeats: (state, action) => {
      state.numOfRepeats = action.payload;
    },
    setTouchData: (state, action) => {
      state.touchData = action.payload;
    },
    groundYourselfResetState: () => {
      groundYourselfSliceInitialState;
    },
  },
});

export const { setCurrentSlide, setNumOfRepeats, setTouchData } =
  groundYourselfSlice.actions;

export default groundYourselfSlice.reducer;

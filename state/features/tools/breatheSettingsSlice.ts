import { createSlice } from "@reduxjs/toolkit";

export const mode_box_4s = {
  name: "box",
  doubleHold: true,
  breatheInTime: 4,
  holdTime: 4,
  breatheOutTime: 4,
};

export const mode_box_5s = {
  name: "box_deep",
  doubleHold: true,
  breatheInTime: 5,
  holdTime: 5,
  breatheOutTime: 5,
};

export const mode_4_7_8 = {
  name: "4-7-8",
  doubleHold: false,
  breatheInTime: 4,
  holdTime: 7,
  breatheOutTime: 8,
};

const breatheSettingsSliceInitialState = {
  showModal: false,
  showCountdown: true,
  mode: mode_4_7_8,
  numOfSets: 1,
};

const breatheSettingsSlice = createSlice({
  name: "breathe",
  initialState: breatheSettingsSliceInitialState,
  reducers: {
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
    toggleCountdown: (state) => {
      state.showCountdown = !state.showCountdown;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setNumOfSets: (state, action) => {
      state.numOfSets = action.payload;
    },
  },
});

export const {
  toggleModal,
  toggleCountdown,
  setMode,
  setNumOfSets,
  // setBoxTime,
} = breatheSettingsSlice.actions;

export default breatheSettingsSlice.reducer;

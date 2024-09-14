import { createSlice } from "@reduxjs/toolkit";

const cdaSliceInitialState = {
  situation: "",
  oldThought: "",
  distortion: "",
  newThought: "",
  save: false,
};

const cdaSlice = createSlice({
  name: "cda",
  initialState: cdaSliceInitialState,
  reducers: {
    setSituation: (state, action) => {
      state.situation = action.payload;
    },
    setOldThought: (state, action) => {
      state.oldThought = action.payload;
    },
    setDistortion: (state, action) => {
      state.distortion = action.payload;
    },
    setNewThought: (state, action) => {
      state.newThought = action.payload;
    },
    toggleSave: (state) => {
      state.save = !state.save;
    },
    cdaResetState: () => cdaSliceInitialState,
  },
});

export const {
  setSituation,
  setOldThought,
  setDistortion,
  setNewThought,
  toggleSave,
  cdaResetState,
} = cdaSlice.actions;
export default cdaSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const cdaSlice = createSlice({
  name: "cda",
  initialState: {
    oldThought: "",
    distortion: "",
    newThought: "",
  },
  reducers: {
    setOldThought: (state, action) => {
      state.oldThought = action.payload;
    },
    setDistortion: (state, action) => {
      state.distortion = action.payload;
    },

    setNewThought: (state, action) => {
      state.newThought = action.payload;
    },
  },
});

export const { setOldThought, setDistortion, setNewThought } = cdaSlice.actions;
export default cdaSlice.reducer;

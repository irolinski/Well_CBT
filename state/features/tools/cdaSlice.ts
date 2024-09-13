import { createSlice } from "@reduxjs/toolkit";

const cdaSlice = createSlice({
  name: "cda",
  initialState: {
    situation: "",
    oldThought: "",
    distortion: "",
    newThought: "",
  },
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
  },
});

export const { setSituation, setOldThought, setDistortion, setNewThought } =
  cdaSlice.actions;
export default cdaSlice.reducer;

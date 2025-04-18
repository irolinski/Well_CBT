import { cdaType } from "@/constants/models/tools/cda";
import { createSlice } from "@reduxjs/toolkit";

export type cdaSliceTypes = cdaType & {
  save: boolean;
};

const cdaSliceInitialState: cdaSliceTypes = {
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
    setSave: (state, action) => {
      state.save = action.payload;
    },

    cdaResetState: () => cdaSliceInitialState,
  },
});

export const {
  setSituation,
  setOldThought,
  setDistortion,
  setNewThought,
  setSave,
  cdaResetState,
} = cdaSlice.actions;
export default cdaSlice.reducer;

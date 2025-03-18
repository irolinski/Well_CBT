import { createSlice } from '@reduxjs/toolkit';

const newActivityModalInitialState = { showModal: false, link: "" };

const newActivityModalSlice = createSlice({
  name: "newActivityModal",
  initialState: newActivityModalInitialState,
  reducers: {
    setShowNewActivityModal: (state, action) => {
      state.showModal = action.payload;
    },
    setNewActivityModalSelectedLink: (state, action) => {
      state.link = action.payload;
    },
    newActivityModalResetState: () => newActivityModalInitialState,
  },
});

export const {
  setShowNewActivityModal,
  setNewActivityModalSelectedLink,
  newActivityModalResetState,
} = newActivityModalSlice.actions;

export default newActivityModalSlice.reducer;

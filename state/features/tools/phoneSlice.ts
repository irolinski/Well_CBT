import { createSlice } from "@reduxjs/toolkit";

const phoneSliceInitialState = {
  showModal: false,
};

const phoneSlice = createSlice({
  name: "phone",
  initialState: phoneSliceInitialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setShowModal } = phoneSlice.actions;

export default phoneSlice.reducer;

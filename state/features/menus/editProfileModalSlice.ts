import { createSlice } from "@reduxjs/toolkit";

const initialState = { showModal: false };

const editProfileModalSlice = createSlice({
  name: "editProfileModal",
  initialState: initialState,
  reducers: {
    setShowEditProfileModal: (state, action) => {
      state.showModal = action.payload;
    },
    // editProfileModalResetState: () => initialState,
  },
});

export const {
  setShowEditProfileModal,
  //   editProfileModalResetState,
} = editProfileModalSlice.actions;

export default editProfileModalSlice.reducer;

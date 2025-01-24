import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  nameInputIsActive: false,
  name: "",
  selectedPhoto: undefined,
  userData: undefined,
};

const editProfileModalSlice = createSlice({
  name: "editProfileModal",
  initialState: initialState,
  reducers: {
    setShowEditProfileModal: (state, action) => {
      state.showModal = action.payload;
    },
    setNameInputIsActive: (state, action) => {
      state.nameInputIsActive = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSelectedPhoto: (state, action) => {
      state.selectedPhoto = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    // editProfileModalResetState: () => initialState,
  },
});

export const {
  setShowEditProfileModal,
  setNameInputIsActive,
  setName,
  setSelectedPhoto,
  setUserData, //   editProfileModalResetState,
} = editProfileModalSlice.actions;

export default editProfileModalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  nameInputIsActive: false,
  name: "",
  selectedFaceId: 0,
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
    setProfilePicId: (state, action) => {
      state.selectedFaceId = action.payload;
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
  setProfilePicId,
  setUserData, //   editProfileModalResetState,
} = editProfileModalSlice.actions;

export default editProfileModalSlice.reducer;

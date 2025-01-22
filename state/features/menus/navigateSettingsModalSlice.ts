import { createSlice } from "@reduxjs/toolkit";

const initialState = { showModal: false, link: "" };

const navigateSettingsModalSlice = createSlice({
  name: "navigateSettingsModal",
  initialState: initialState,
  reducers: {
    setShowNavigateSettingsModal: (state, action) => {
      state.showModal = action.payload;
    },

    setNavigateSettingsModalSelectedLink: (state, action) => {
      state.link = action.payload;
    },

    navigateSettingsModalResetState: () => initialState,
  },
});

export const {
  setShowNavigateSettingsModal,
  setNavigateSettingsModalSelectedLink,
  navigateSettingsModalResetState,
} = navigateSettingsModalSlice.actions;

export default navigateSettingsModalSlice.reducer;

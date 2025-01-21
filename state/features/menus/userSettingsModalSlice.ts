import { createSlice } from "@reduxjs/toolkit";

const userSettingsModalState = { showModal: false, link: "" };

const userSettingsModalSlice = createSlice({
  name: "userSettingsModal",
  initialState: userSettingsModalState,
  reducers: {
    setShowUserSettingsModal: (state, action) => {
      state.showModal = action.payload;
    },

    userSettingsModalResetState: () => userSettingsModalState,
  },
});

export const { setShowUserSettingsModal, userSettingsModalResetState } =
  userSettingsModalSlice.actions;

export default userSettingsModalSlice.reducer;

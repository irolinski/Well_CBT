import { createSlice } from "@reduxjs/toolkit";

const notificationModalState = { showModal: false, link: "" };

const notificationModalSlice = createSlice({
  name: "notificationModal",
  initialState: notificationModalState,
  reducers: {
    setShowNotificationModal: (state, action) => {
      state.showModal = action.payload;
    },

    notificationModalResetState: () => notificationModalState,
  },
});

export const { setShowNotificationModal, notificationModalResetState } =
  notificationModalSlice.actions;

export default notificationModalSlice.reducer;

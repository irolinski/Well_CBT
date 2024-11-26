import { createSlice } from "@reduxjs/toolkit";

const activityLogInitalState = {
  showModal: false,
};

const activityLogSlice = createSlice({
  name: "activityLog",
  initialState: activityLogInitalState,
  reducers: {
    toggleModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { toggleModal } = activityLogSlice.actions;

export default activityLogSlice.reducer;

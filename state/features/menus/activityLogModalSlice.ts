import { createSlice } from "@reduxjs/toolkit";

const activityLogModalSliceInitialState = { showModal: false, link: "" };

const activityLogModalSlice = createSlice({
  name: "activityLogModal",
  initialState: activityLogModalSliceInitialState,
  reducers: {
    setShowActivityLogModal: (state, action) => {
      state.showModal = action.payload;
    },
    activityLogModalResetState: () => activityLogModalSliceInitialState,
  },
});

export const { setShowActivityLogModal } = activityLogModalSlice.actions;

export default activityLogModalSlice.reducer;

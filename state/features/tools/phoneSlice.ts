import { createSlice } from "@reduxjs/toolkit";

type phoneStateTypes = {
  supportContact: { name: string; phone: string } | undefined;
  showModal: boolean;
};

const phoneSliceInitialState: phoneStateTypes = {
  supportContact: undefined,
  showModal: false,
};

const phoneSlice = createSlice({
  name: "phone",
  initialState: phoneSliceInitialState,
  reducers: {
    setSupportContact: (state, action) => {
      state.supportContact = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setSupportContact, setShowModal } = phoneSlice.actions;

export default phoneSlice.reducer;

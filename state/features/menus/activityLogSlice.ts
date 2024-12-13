import { EntryListSection } from "@/constants/models/activity_log";
import { createSlice } from "@reduxjs/toolkit";

type ActivityLogStateTypes = {
  showModal: boolean;
  rawData: string[];
  entryData: EntryListSection[];
  displayedData: EntryListSection[];
  currentIndex: number;
  filterPeriod: string[];
};

const activityLogInitalState: ActivityLogStateTypes = {
  showModal: false,
  rawData: [],
  entryData: [],
  displayedData: [],
  currentIndex: 0,
  filterPeriod: [],
};

const activityLogSlice = createSlice({
  name: "activityLog",
  initialState: activityLogInitalState,
  reducers: {
    toggleModal: (state, action) => {
      state.showModal = action.payload;
    },
    setRawData: (state, action) => {
      state.rawData = action.payload;
    },
    setEntryData: (state, action) => {
      state.entryData = action.payload;
    },
    setDisplayedData: (state, action) => {
      state.displayedData = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setFilterPeriod: (state, action) => {
      state.filterPeriod = action.payload;
    },
    activityLogResetState: () => activityLogInitalState,
  },
});

export const {
  toggleModal,
  setRawData,
  setEntryData,
  setDisplayedData,
  setCurrentIndex,
  setFilterPeriod,
  activityLogResetState,
} = activityLogSlice.actions;

export default activityLogSlice.reducer;

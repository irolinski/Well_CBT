import { EntryListSection } from "@/constants/models/activity_log";
import { createSlice } from "@reduxjs/toolkit";

type ActivityLogStateTypes = {
  rawData: string[];
  entryData: EntryListSection[];
  displayedData: EntryListSection[];
  currentIndex: number;
  filterPeriod: string[];
};

const activityLogInitalState: ActivityLogStateTypes = {
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
  setRawData,
  setEntryData,
  setDisplayedData,
  setCurrentIndex,
  setFilterPeriod,
  activityLogResetState,
} = activityLogSlice.actions;

export default activityLogSlice.reducer;

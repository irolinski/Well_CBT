import {
  EntryListSection,
  ToolNames,
} from "@/constants/models/home/activity_log";
import { createSlice } from "@reduxjs/toolkit";

type ActivityLogStateTypes = {
  rawData: string[];
  entryData: EntryListSection[];
  displayedData: EntryListSection[];
  currentIndex: number;
  filterPeriod: string[];
  filterCategories: ToolNames[];
  isLoading: boolean;
};

const activityLogInitalState: ActivityLogStateTypes = {
  rawData: [],
  entryData: [],
  displayedData: [],
  currentIndex: 0,
  filterPeriod: [],
  filterCategories: [],
  isLoading: true,
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
    setFilterCategories: (state, action) => {
      state.filterCategories = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
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
  setFilterCategories,
  activityLogResetState,
  setIsLoading,
} = activityLogSlice.actions;

export default activityLogSlice.reducer;

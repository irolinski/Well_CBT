import {
    GroundEnvironmentItem, GroundEnvironmentItemAdjectiveType
} from '@/app/tools/relax/ground_yourself/environment/page_3';
import { Colors } from '@/constants/styles/colorTheme';
import { createSlice } from '@reduxjs/toolkit';

type groundYourselfStateTypes = {
  currentSlide: number;
  environmentItemsArr: GroundEnvironmentItem[];
  environmentAdjectiveModalIsOpen: boolean;
  environmentItemsModalSelectedIndex: number;
};

export const defaultEnvironmentItem = {
  itemName: "",
  itemAdjectives: [{ name: "", color: Colors.offBlack }],
};

export const groundYourselfSliceInitialState: groundYourselfStateTypes = {
  currentSlide: 0,
  environmentItemsArr: [defaultEnvironmentItem],
  environmentAdjectiveModalIsOpen: false,
  environmentItemsModalSelectedIndex: 0,
};

const groundYourselfSlice = createSlice({
  name: "ground_yourself",
  initialState: groundYourselfSliceInitialState,
  reducers: {
    setCurrentSlide: (state, action) => {
      state.currentSlide = action.payload;
    },

    setEnvironmentItemsArr: (state, action) => {
      return {
        ...state,
        environmentItemsArr: [...action.payload], // ensures a new reference
      };
    },

    setEnvironmentAdjectiveModalIsOpen: (state, action) => {
      state.environmentAdjectiveModalIsOpen = action.payload;
    },

    setEnvironmentItemsModalSelectedIndex: (state, action) => {
      state.environmentItemsModalSelectedIndex = action.payload;
    },

    groundYourselfResetState: () => {
      groundYourselfSliceInitialState;
    },
  },
});

export const {
  setCurrentSlide,
  setEnvironmentItemsArr,
  setEnvironmentAdjectiveModalIsOpen,
  setEnvironmentItemsModalSelectedIndex,
} = groundYourselfSlice.actions;

export default groundYourselfSlice.reducer;

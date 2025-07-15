import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

export const CLOSE_MODAL_OFFSET_TRESHOLD = -175;

export const journalStyleConstants = {
  SLIDER_MIN_VAL: 0, // 0.1 causes a visual glitch
  MOOD_SLIDER_MAX_VAL: 0.6,
  EMOTION_SLIDER_MAX_VAL: 0.4,
  SLIDER_COLOR_2_TRESHOLD: 0.4,
  SLIDER_COLOR_3_TRESHOLD: 0.6,
};

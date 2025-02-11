import { ColorValue } from "react-native";

export type DistortionListProps = {
  showDistortionTooltip: number | null;
  handleSetShowDistortionTooltip: (index: number | null) => void;
  tooltipY: number;
  handleShowTooltip: (y: number, index: number) => void;
};

export type DistortionPillTypes = {
  title: string;
  checked: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  highlighted?: boolean;
  customColor?: ColorValue | undefined;
};

export const cognitiveDistortions = [
  "all_or_nothing",
  "mental_filter",
  "overgeneralization",
  "mind_reading",
  "discounting_positives",
  "fortune_telling",
  "magnification_minimization",
  "labeling",
  "reasoning_from_emotions",
  "should_statements",
  "personalization_blame",
];

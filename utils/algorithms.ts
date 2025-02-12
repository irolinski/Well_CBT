export const interpolateNumbers = (
  inputValue: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number,
): number => {
  // Ensure inputValue is clamped within the input range
  const clampedInputValue = Math.max(inputMin, Math.min(inputValue, inputMax));

  // Perform linear interpolation
  const outputValue =
    outputMin +
    ((clampedInputValue - inputMin) / (inputMax - inputMin)) *
      (outputMax - outputMin);

  return outputValue;
};

export const uncapitalizeString = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export const isValidName = (name: string): boolean => {
  // allows all Unicode letters, spaces, and prevents special characters
  const regex = /^[\p{L}\s]+$/u;
  //return true if name fits regex or is undefined (to allow empty space)
  return regex.test(name) || !name;
};

export const isValidExerciseInput = (input: string): boolean => {
  const regex = /[^&@#$€^<¥•£*>~£§\_\[\]\{\}\\]/;
  return regex.test(input) || !input;
};

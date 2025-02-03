
export type cdaType = {
    situation: string;
    oldThought: string;
    distortion: string;
    newThought: string;
};
  
  export type cdaEntryType = cdaType & {
    datetime: string;
  };
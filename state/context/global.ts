import { createContext, useContext } from 'react';
import { GlobalState } from '@/constants/models/global/models';

type GlobalStateContextType = {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
};

export const GlobalStateContext = createContext<
  GlobalStateContextType | undefined
>(undefined);

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export type StatsContextStateType = {
  shouldShowStats: boolean;
  setShouldShowStats: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

export const StatsContext = createContext({} as StatsContextStateType);

export const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [shouldShowStats, setShouldShowStats] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const value = {
    shouldShowStats,
    setShouldShowStats,
    errorMessage,
    setErrorMessage,
  };

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};
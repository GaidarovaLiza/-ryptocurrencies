import { CurrencySummary } from "components/shared/portfolioModal/PortfolioModelRow/PortfolioModelRow";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface AddToPortfolioModalContextState {
  shouldShowAddToPortfolioModal: boolean;
  setShouldShowAddToPortfolioModal: Dispatch<SetStateAction<boolean>>;
  currencyToAddToPortfolio: CurrencySummary;
  setCurrencyToAddToPortfolio: Dispatch<SetStateAction<CurrencySummary>>;
}

export const initialAddToPortfolioModalState = {
  id: "",
  name: "",
  symbol: "",
  priceUsd: 0,
  amount: 0
};
export const AddToPortfolioModalContext = createContext({} as AddToPortfolioModalContextState);

export const AddToPortfolioModalProvider = ({ children }: { children: ReactNode }) => {
  const [shouldShowAddToPortfolioModal, setShouldShowAddToPortfolioModal] = useState<boolean>(false);
  const [currencyToAddToPortfolio, setCurrencyToAddToPortfolio] = useState<CurrencySummary>(initialAddToPortfolioModalState);

  const value = {
    shouldShowAddToPortfolioModal,
    setShouldShowAddToPortfolioModal,
    currencyToAddToPortfolio,
    setCurrencyToAddToPortfolio
  };

  return <AddToPortfolioModalContext.Provider value={value}>{children}</AddToPortfolioModalContext.Provider>;
};
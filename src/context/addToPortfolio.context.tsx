import { CurrencySummaryType } from "components/shared/portfolioModal/PortfolioModelRow/PortfolioModelRow";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export type AddToPortfolioModalContextStateType = {
  shouldShowAddToPortfolioModal: boolean;
  setShouldShowAddToPortfolioModal: Dispatch<SetStateAction<boolean>>;
  currencyToAddToPortfolio: CurrencySummaryType;
  setCurrencyToAddToPortfolio: Dispatch<SetStateAction<CurrencySummaryType>>;
}

export const initialAddToPortfolioModalState = {
  id: "",
  name: "",
  symbol: "",
  priceUsd: 0,
  amount: 0
};
export const AddToPortfolioModalContext = createContext({} as AddToPortfolioModalContextStateType);

export const AddToPortfolioModalProvider = ({ children }: { children: ReactNode }) => {
  const [shouldShowAddToPortfolioModal, setShouldShowAddToPortfolioModal] = useState<boolean>(false);
  const [currencyToAddToPortfolio, setCurrencyToAddToPortfolio] = useState<CurrencySummaryType>(initialAddToPortfolioModalState);

  const value = {
    shouldShowAddToPortfolioModal,
    setShouldShowAddToPortfolioModal,
    currencyToAddToPortfolio,
    setCurrencyToAddToPortfolio
  };

  return <AddToPortfolioModalContext.Provider value={value}>{children}</AddToPortfolioModalContext.Provider>;
};
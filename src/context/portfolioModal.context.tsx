import React, {createContext, useState} from 'react';
import {CurrencySummaryWithAmountType} from "../components/shared/portfolioModal/PortfolioModelRow/PortfolioModelRow";

export type PortfolioModalContextStateType = {
    shouldShowPortfolioModal: boolean;
    setShouldShowPortfolioModal: React.Dispatch<React.SetStateAction<boolean>>;
    lastAddedCurrencyToPortfolio: CurrencySummaryWithAmountType;
    setLastAddedCurrencyToPortfolio: React.Dispatch<React.SetStateAction<CurrencySummaryWithAmountType>>;
    currencyPortfolioRows: CurrencySummaryWithAmountType[];
    setCurrencyPortfolioRows: React.Dispatch<React.SetStateAction<CurrencySummaryWithAmountType[]>>;
    closeModal: () => void;
}

export const initialCurrencyPortfolioRowState = {
    id: '',
    name: '',
    symbol: '',
    priceUsd: 0,
    amount: 0,
};

export const PortfolioModalContext = createContext({} as PortfolioModalContextStateType);

export const PortfolioModalProvider = ({children}: { children: React.ReactNode }) => {
    const [shouldShowPortfolioModal, setShouldShowPortfolioModal] = useState<boolean>(false);
    const [
        lastAddedCurrencyToPortfolio,
        setLastAddedCurrencyToPortfolio,
    ] = useState<CurrencySummaryWithAmountType>(initialCurrencyPortfolioRowState);
    const [currencyPortfolioRows, setCurrencyPortfolioRows] = useState<CurrencySummaryWithAmountType[]>([]);

    const closeModal = () => {
        setShouldShowPortfolioModal(false);
    };

    const value = {
        shouldShowPortfolioModal,
        setShouldShowPortfolioModal,
        lastAddedCurrencyToPortfolio,
        setLastAddedCurrencyToPortfolio,
        currencyPortfolioRows,
        setCurrencyPortfolioRows,
        closeModal,
    };

    return <PortfolioModalContext.Provider value={value}>{children}</PortfolioModalContext.Provider>;
};
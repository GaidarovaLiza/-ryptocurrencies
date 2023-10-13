import React, {useContext} from 'react';

import s from './PortfolioModelRow.module.scss'
import {
    initialCurrencyPortfolioRowState,
    PortfolioModalContext,
    PortfolioModalContextState,
} from '../../../../context/portfolioModal.context';
import {formatNumber} from '../../../../utils/formatters';

export interface CurrencySummary {
    id: string,
    name: string,
    symbol: string,
    priceUsd: number,
}

export interface CurrencySummaryWithAmount extends CurrencySummary {
    amount: number;
}

function PortfolioModalRow({
                               id,
                               name,
                               symbol,
                               priceUsd,
                               amount,
                           }: CurrencySummaryWithAmount) {
    // @ts-ignore
    const {
        lastAddedCurrencyToPortfolio,
        setLastAddedCurrencyToPortfolio,
        currencyPortfolioRows,
        setCurrencyPortfolioRows,
        closeModal, // Assuming you have a function to close the modal
    } = useContext<PortfolioModalContextState>(PortfolioModalContext);

    const removePortfolioRow = (): void => {
        const notRemovedPortfolioRows = currencyPortfolioRows.filter((row) => row.id !== id);
        localStorage.setItem('currencyPortfolioRows', JSON.stringify(notRemovedPortfolioRows));
        if (id === lastAddedCurrencyToPortfolio.id) {
            setLastAddedCurrencyToPortfolio(initialCurrencyPortfolioRowState);
        }
        setCurrencyPortfolioRows(notRemovedPortfolioRows);
    };

    return (
        <div className={s.portfolio_modal_overlay} onClick={closeModal}>
            <div className={s.portfolio_currency_row}>
                <div className={s.portfolio_row_data}>
                    <div className={s.portfolio_currency_name}> {name} ({symbol})</div>
                    <div className={s.portfolio_currency_amount}>
                        Amount: {formatNumber(amount)}
                    </div>
                    <div className={s.portfolio_currency_price}>
                        ${formatNumber(priceUsd)}
                    </div>
                </div>
                <div className={s.remove_button_container}>
                    <button className={s.remove_currency_button} onClick={() => removePortfolioRow()}>Remove</button>
                </div>
            </div>
        </div>
    );
}

export default PortfolioModalRow;
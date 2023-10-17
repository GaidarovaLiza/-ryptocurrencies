import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import s from "./CurrencyInfo.module.scss";
import { PortfolioModal } from "../shared/portfolioModal/PortfolioModel";
import { formatNumber } from "../../utils/formatters";
import { CurrencyChart } from "../CurrencyChart/CurrencyChart";
import { AddToPortfolio } from "../Portfolio/AddToPortfolio";
import { Button } from "../shared/button/Button";

export type CurrencyStatisticsDataType = {
  id: string
  name: string;
  symbol: string;
  supply: string;
  priceUsd: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  explorer: string;
}

export const CurrencyInfo = ({ currencyStatisticsData }: { currencyStatisticsData: CurrencyStatisticsDataType }) => {
  const currencySummary = useMemo(() => {
    if (!currencyStatisticsData) return null;
    const { id, name, symbol, priceUsd } = currencyStatisticsData;
    return { id, name, symbol, priceUsd: parseFloat(priceUsd) };
  }, [currencyStatisticsData]);

  return (
    <div className={s.currency_info}>
      <div className={s.wrapper}>
        {currencyStatisticsData && (
          <>
            <p className={`${s.info_block} ${s.currency_name}`}>
              {currencyStatisticsData.name} ({currencyStatisticsData.symbol})
            </p>
            <div className={s.info_line}>
              <p className={s.info_block}>Supply:</p>
              <p className={s.info_block}>
                {formatNumber(parseFloat(currencyStatisticsData.supply))}
              </p>
            </div>
            <div className={s.info_line}>
              <p className={s.info_block}>Price:</p>
              <p className={s.info_block}>
                ${formatNumber(parseFloat(currencyStatisticsData.priceUsd))}
              </p>
            </div>
            <div className={s.info_line}>
              <p className={s.info_block}>Market Cap:</p>
              <p className={s.info_block}>
                {formatNumber(parseFloat(currencyStatisticsData.marketCapUsd))}
              </p>
            </div>
            <div className={s.info_line}>
              <p className={s.info_block}>Volume (24Hr):</p>
              <p className={s.info_block}>
                {formatNumber(parseFloat(currencyStatisticsData.volumeUsd24Hr))}
              </p>
            </div>
            <div className={s.info_line}>
              <p className={s.info_block}>Vwap (24Hr):</p>
              <p className={s.info_block}>
                {formatNumber(parseFloat(currencyStatisticsData.vwap24Hr))}
              </p>
            </div>
            <div className={s.info_line}>
              <p className={s.info_block}>Change (24Hr):</p>
              <p className={s.info_block}>
                {parseFloat(currencyStatisticsData.changePercent24Hr) > 0 ? "+" : ""}
                {formatNumber(parseFloat(currencyStatisticsData.changePercent24Hr))}%
              </p>
            </div>
            <div className={s.chart}>
              <CurrencyChart />
            </div>
            <div className={s.buttons_container}>
              <a href={currencyStatisticsData.explorer}>
                <Button name={"More Details"} styles={s.explorer_button} />
              </a>
              {currencySummary && <AddToPortfolio {...currencySummary} />}
              <PortfolioModal />
              <NavLink className={s.link} to={"/"}>
                <Button name={"Back"} styles={s.explorer_button} />
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

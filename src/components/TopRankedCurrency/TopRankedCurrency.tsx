import { Routes } from "config/routes";
import { Link } from "react-router-dom";
import { formatNumber } from "utils/formatters";
import s from "./TopRankedCurrency.module.scss";

type TopRankedCurrencyPropsType = {
  id: string,
  name: string,
  symbol: string,
  priceUsd: number
}

export const TopRankedCurrency = ({
                                    id,
                                    name,
                                    symbol,
                                    priceUsd
                                  }: TopRankedCurrencyPropsType) => {

  return (
    <Link className={s.currencyNavbar} to={`${Routes.CurrencyStatistics}?id=${id}`}>
      <div>{name} ({symbol})</div>
      <div>${formatNumber(priceUsd)}</div>
    </Link>
  );
};

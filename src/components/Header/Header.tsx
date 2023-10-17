import { NavLink } from "react-router-dom";
import { useTopRankedCurrencies } from "../../hooks/hooks";
import { CurrencyType } from "../../services/apiTypes";
import s from "./Header.module.scss";
import { Portfolio } from "../Portfolio/Portfolio";
import { TopRankedCurrency } from "../TopRankedCurrency/TopRankedCurrency";

type TopRankedCurrencyPropsType = {
  id: string;
  name: string;
  symbol: string;
  priceUsd: number;
}

export const Header = () => {
  const topRankedCurrencyData = useTopRankedCurrencies();

  const prepareTopRankedCurrency = (currency: CurrencyType): TopRankedCurrencyPropsType => {
    return {
      id: currency.id,
      name: currency.name,
      symbol: currency.symbol,
      priceUsd: parseFloat(currency.priceUsd)
    };
  };

  return (
    <div className={s.header}>
      <header className={s.navbar}>
        <NavLink to={"/"}>
          {/*<img className={s.company_logo} alt="" />*/}
        </NavLink>
        <div className={s.navbar_center}>
          {topRankedCurrencyData.map((topRankedCurrency) => {
            return <TopRankedCurrency
              key={topRankedCurrency.id} {...prepareTopRankedCurrency(topRankedCurrency)} />;
          })}
        </div>
        <div className={s.navbar_right}>
          <Portfolio />
        </div>
      </header>
    </div>
  );
};
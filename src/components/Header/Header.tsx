import { Portfolio } from "components/Portfolio/Portfolio";
import { TopRankedCurrency } from "components/TopRankedCurrency/TopRankedCurrency";
import { useTopRankedCurrencies } from "hooks/hooks";
import { NavLink } from "react-router-dom";
import { CurrencyType } from "services/apiTypes";
import s from "./Header.module.scss";


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
import { CoinTable } from "components/CoinTable/CoinTable";
import s from "./Main.module.scss";

export const Main = () => {
  return (
    <div className={s.main}>
      <CoinTable />
    </div>
  );
};

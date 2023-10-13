import s from './Main.module.scss';
import CoinTable from "../../components/CoinTable/CoinTable";

export const Main = () => {
    return (
        <div className={s.main}>
            <CoinTable/>
        </div>
    );
}

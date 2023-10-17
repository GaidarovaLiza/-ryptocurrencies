import { useContext } from "react";
import { StatsContext, StatsContextStateType } from "../../../context/stats.context";
import s from "./Error.module.scss";

export const Error = () => {
  const { errorMessage, shouldShowStats, setShouldShowStats } = useContext<StatsContextStateType>(StatsContext);
  const errorClassName = `{${s.toast} ${shouldShowStats ? s.show : s.do_not_show}`;

  return (
    <div className={errorClassName}>
      <div className={s.error_header}>
        <strong>Error Message</strong>
        <div className={s.close} onClick={() => setShouldShowStats(false)}>×</div>
      </div>
      <div className={s.error_body}>{errorMessage}</div>
    </div>
  );
};

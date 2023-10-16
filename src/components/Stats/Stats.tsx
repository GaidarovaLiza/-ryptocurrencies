import { StatsContext, StatsContextStateType } from "../../context/stats.context";
import s from "./Stats.module.scss";
import { useContext } from "react";

export const Stats = () => {
  const { errorMessage, shouldShowStats, setShouldShowStats } = useContext<StatsContextStateType>(StatsContext);

  const statsClassName = `{${s.toast} ${shouldShowStats ? s.show : s.do_not_show}`;

  return (
    <div className={statsClassName}>
      <div className={s.stats_header}>
        <strong>Error Message</strong>
        <div className={s.close} onClick={() => setShouldShowStats(false)}>×</div>
      </div>
      <div className={s.stats_body}>{errorMessage}</div>
    </div>
  );
};
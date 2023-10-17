import { useContext, useEffect, useState } from "react";
import { CurrencyChartPointType } from "../../components/CurrencyChart/CurrencyChart";
import { fetchCryptoStats } from "../../services/api";
import { timeMonthAgo, timeNow } from "../../components/CurrencyChart/constans";
import { StatsContext, StatsContextStateType } from "../../context/stats.context";
import { useSearchParams } from "react-router-dom";

type CustomHookReturnType = {
  currencyChartData: CurrencyChartPointType[] | undefined;
}

export async function fetchCurrencyChartData(currencyId: string | null) {
  try {
    const data = await fetchCryptoStats(currencyId, "d1", timeMonthAgo, timeNow);
    return data;
  } catch (error) {
    throw error;
  }
}

export function useCurrencyChartData(): CustomHookReturnType {
  const { setErrorMessage, setShouldShowStats } =
    useContext<StatsContextStateType>(StatsContext);
  const [currencyChartData, setCurrencyChartData] =
    useState<CurrencyChartPointType[]>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCurrencyChartData(searchParams.get("id"));
        setCurrencyChartData(data);
      } catch (error) {
        // @ts-ignore
        setErrorMessage(error);
        setShouldShowStats(true);
      }
    }

    fetchData();
  }, []);

  return {
    currencyChartData
  };
}
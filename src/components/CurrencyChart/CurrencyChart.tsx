import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { timeMonthAgo, timeNow } from "./constans";
import { StatsContext, StatsContextStateType } from "context/stats.context";
import { fetchCryptoStats } from "services/api";
import { formatNumber } from "utils/formatters";

export type CurrencyChartPointType = {
  date: string;
  priceUsd: string;
  time: number;
}

async function fetchCurrencyChartData(currencyId: string | null) {
  try {
    const data = await fetchCryptoStats(currencyId, "d1", timeMonthAgo, timeNow);
    return data;
  } catch (error) {
    throw error;
  }
}

export const CurrencyChart = () => {
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

  return (
    <>
      {currencyChartData && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={currencyChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tickFormatter={(value) => value + 1} interval={1} />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip
              separator={": "}
              labelFormatter={(value) => `Day ${value + 1}`}
              formatter={(value: string) => [
                `$${formatNumber(parseFloat(value))}`,
                "Price"
              ]}
            />
            <Line type="monotone" dataKey="priceUsd" stroke="#e73919" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

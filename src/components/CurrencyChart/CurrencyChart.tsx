import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatNumber } from "utils/formatters";
import { useCurrencyChartData } from "../../pages/CurrencyStatistics/hooks";

export type CurrencyChartPointType = {
  date: string;
  priceUsd: string;
  time: number;
}

export const CurrencyChart = () => {
  const { currencyChartData } = useCurrencyChartData();

  const chartComponent = useMemo(() => {
    return (
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
    );
  }, [currencyChartData]);

  return (
    <>
      {currencyChartData && chartComponent}
    </>
  );
};
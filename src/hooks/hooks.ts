import { useEffect, useState } from "react";
import { fetchCurrencyData } from "services/api";
import { CurrencyType } from "services/apiTypes";
import { fetchCurrencies } from "services/utils";

export const useTopRankedCurrencies = () => {
  const [topRankedCurrencyData, setTopRankedCurrencyData] = useState<CurrencyType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const currencies = await fetchCurrencies(true);
      setTopRankedCurrencyData(currencies);
    }

    fetchData();
  }, []);

  return topRankedCurrencyData;
};

export const useCurrencyStatistics = (id: string | null) => {
  const [currencyStatisticsData, setCurrencyStatisticsData] = useState<CurrencyType | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (id) {
          const data = await fetchCurrencyData(id);
          setCurrencyStatisticsData(data);
        }
      } catch (error) {
      }
    }

    fetchData();
  }, [id]);

  return currencyStatisticsData;
};
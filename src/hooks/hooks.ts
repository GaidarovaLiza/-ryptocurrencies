import { useEffect, useState } from "react";
import { fetchCurrencies } from "../services/utils";
import { CurrencyType } from "../services/apiTypes";
import { fetchCurrencyData } from "../services/api";

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


export const useCryptoTableData = () => {
  const [cryptoData, setCryptoData] = useState<CurrencyType[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchCurrencies();
      setCryptoData(data);
    }

    fetchData();
  }, []);

  return cryptoData;
};

export function useCurrencyStatistics(id: string | null) {
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
}
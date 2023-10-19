import axios from "axios";
import { SetStateAction } from "react";
import { CurrenciesType, CurrencyType } from "./apiTypes";
import { CurrencyChartPointType } from "../components/CurrencyChart/CurrencyChart";

export const api = "https://api.coincap.io/v2/";
const assetsEndpoint = "assets";

const cache: { [key: string]: CurrenciesType } = {};

export const fetchCryptoAssets = async (params: { limit: number; offset: number }): Promise<CurrenciesType> => {
  const cacheKey = JSON.stringify(params);

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const response = await axios.get(`${api}${assetsEndpoint}`, {
      params: params
    });
    cache[cacheKey] = response.data;
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export const fetchCryptoData = async ({
                                        limit,
                                        offset
                                      }: { limit: number; offset: number }): Promise<CurrenciesType> => {
  const cacheKey = JSON.stringify(offset);

  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const response = await axios.get(`${api}${assetsEndpoint}`, {
      params: {
        limit: 10,
        offset
      }
    });
    cache[cacheKey] = response.data;
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export const fetchCryptoStats = async (id: string | null, interval: string, start: number, end: number): Promise<CurrencyChartPointType[]> => {
  try {
    const response = await axios.get(`${api}${assetsEndpoint}/${id}/history`, {
      params: {
        interval,
        start,
        end
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export function fetchDataAndUpdateState(ids: string[], setCurrentCurrencyData: (value: SetStateAction<CurrencyType[]>) => void) {
  fetchCryptoAssets({ limit: ids.length, offset: 0 })
    .then((response) => {
      setCurrentCurrencyData(response.data);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

export async function fetchCurrencyData(id: unknown) {
  try {
    const response = await axios.get(`${api}${assetsEndpoint}`, {
      params: {
        ids: id
      }
    });
    return response.data.data[0];
  } catch (error) {
    throw error;
  }
}
import axios from "axios";
import { SetStateAction } from "react";
import { CurrenciesType, CurrencyType } from "./apiTypes";
import { CurrencyChartPointType } from "../components/CurrencyChart/CurrencyChart";

export const api = "https://api.coincap.io/v2/";
const assetsEndpoint = "assets";

export const fetchCryptoData = async ({
                                        limit,
                                        offset
                                      }: { limit: number; offset: number }): Promise<CurrenciesType> => {
  try {
    const response = await axios.get(`${api}${assetsEndpoint}`, {
      params: {
        limit: 10,
        offset
      }
    });
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

export function fetchDataAndUpdateState(ids: string[], setCurrentCurrencyData:
  (value: SetStateAction<CurrencyType[]>) => void) {
  axios.get<CurrenciesType>(`${api}${assetsEndpoint}`, {
    params: {
      ids:
        ids.join(",")
    }
  }).then(res => {
    setCurrentCurrencyData(res.data.data);
  }).catch(err => {
  });
}

export async function fetchCurrencyData(id: string | null): Promise<CurrencyType> {
  try {
    const response = await axios.get(`${api}${assetsEndpoint}`, {
      params: {
        ids: id
      }
    });
    console.log(response.data.data[0]);
    return response.data.data[0];
  } catch (error) {
    throw error;
  }
}
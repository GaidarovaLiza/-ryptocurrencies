import React from "react";
import { useSearchParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { CurrencyInfo } from "../../components/CurrencyInfo/CurrencyInfo";
import { useCurrencyStatistics } from "../../hooks/hooks";


export const CurrencyStatistics = () => {
  const [searchParams] = useSearchParams();
  const currencyId = searchParams.get("id");
  const currencyStatisticsData = useCurrencyStatistics(currencyId);

  if (!currencyStatisticsData) {
    return <Loader />;
  }
  return (
    <CurrencyInfo currencyStatisticsData={currencyStatisticsData} />
  );
};
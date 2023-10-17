import React from "react";
import { useSearchParams } from "react-router-dom";
import { Loader } from "../../components/shared/loader/Loader";
import { useCurrencyStatistics } from "../../hooks/hooks";
import { CurrencyInfo } from "../../components/CurrencyInfo/CurrencyInfo";

export const CurrencyStatistics = () => {
  const [searchParams] = useSearchParams();
  const currencyId = searchParams.get("id");
  const currencyStatisticsData = useCurrencyStatistics(currencyId);

  if (!currencyStatisticsData) {
    return <Loader />;
  }
  return (
    <CurrencyInfo currencyStatisticsData={currencyStatisticsData}></CurrencyInfo>
  );
};
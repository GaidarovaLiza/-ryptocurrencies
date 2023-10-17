import { Header } from "components/Header/Header";
import React from "react";
import { useLocation } from "react-router-dom";
import { Error } from "../shared/error/Error";

export const Layout = () => {
  const location = useLocation();

  return (
    <>
      {(location.pathname === "/" || location.pathname === "/currency-statistics" || location.pathname === "/etaCar-test/") &&
        <Header />}
      <Error />
    </>
  );
};


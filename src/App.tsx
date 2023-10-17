import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import s from "./App.module.scss";
import { Main } from "./pages/Main/Main";
import { CurrencyStatistics } from "./pages/CurrencyStatistics/CurrencyStatistics";
import { Header } from "./components/Header/Header";

function App() {
  const location = useLocation();

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        {(location.pathname === "/"
            || location.pathname === "/currency-statistics"
            || location.pathname === "/Currencies")
          && <Header />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Currencies" element={<Main />} />
          <Route path="/currency-statistics" element={<CurrencyStatistics />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

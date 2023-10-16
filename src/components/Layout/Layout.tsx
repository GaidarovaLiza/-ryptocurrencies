import { useLocation } from "react-router-dom";
import { Header } from "../Header/Header";
import { Stats } from "../Stats/Stats";

export const Layout = () => {
  const location = useLocation();

  return (
    <>
      {(location.pathname === "/" || location.pathname === "/currency-statistics" || location.pathname === "/etaCar-test/") &&
        <Header />}
      <Stats />
    </>
  );
};
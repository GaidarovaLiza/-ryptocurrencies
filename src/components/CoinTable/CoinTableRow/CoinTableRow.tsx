import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import s from "./CoinTableRow.module.scss";
import { CurrencyType } from "../../../services/apiTypes";
import { formatNumber } from "../../../utils/formatters";
import { Routes } from "../../../config/routes";

export type TableCellLinkPropsType = {
  to: string;
  children: ReactNode;
}

const TableCellLink: React.FC<TableCellLinkPropsType> = ({ to, children }) => (
  <Link className={s.link} to={to}>
    {children}
  </Link>
);

export type CryptoTableRowPropsType = {
  crypto: CurrencyType;
  showModal: (crypto: CurrencyType) => void;
}

export const CoinTableRow = ({ crypto, showModal }: CryptoTableRowPropsType) => {
  const isPositiveChange = parseFloat(crypto.changePercent24Hr) > 0;
  const changeClass = isPositiveChange ? s.textSuccess : s.textDanger;
  const changeColor = isPositiveChange ? "green" : "red";

  const imageUrl = `https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`;

  return (
    <tr>
      <td><TableCellLink to={`${Routes.CurrencyStatistics}?id=${crypto.id}`}>{crypto.rank}</TableCellLink></td>
      <td><TableCellLink to={`${Routes.CurrencyStatistics}?id=${crypto.id}`}>

        <img src={imageUrl} />

      </TableCellLink></td>
      <td><span className={s.text_crypto}><TableCellLink
        to={`${Routes.CurrencyStatistics}?id=${crypto.id}`}>{crypto.name}</TableCellLink></span></td>
      <td><TableCellLink to={`${Routes.CurrencyStatistics}?id=${crypto.id}`}>{crypto.symbol}</TableCellLink></td>
      <td><TableCellLink
        to={`${Routes.CurrencyStatistics}?id=${crypto.id}`}>{formatNumber(parseFloat(crypto.marketCapUsd))}</TableCellLink>
      </td>
      <td><TableCellLink
        to={`${Routes.CurrencyStatistics}?id=${crypto.id}`}>{formatNumber(parseFloat(crypto.priceUsd))}</TableCellLink>
      </td>
      <td><TableCellLink
        to={`${Routes.CurrencyStatistics}?id=${crypto.id}`}>{formatNumber(parseFloat(crypto.supply))}</TableCellLink>
      </td>
      <td><TableCellLink
        to={`${Routes.CurrencyStatistics}?id=${crypto.id}`}>{formatNumber(parseFloat(crypto.vwap24Hr))}</TableCellLink>
      </td>
      <td className={`${s.Change24Hr} ${changeClass}`}>
        <TableCellLink to={`${Routes.CurrencyStatistics}?id=${crypto.id}`}>
                    <span style={{ color: changeColor }}>
                        {isPositiveChange ? "+" : "-"}
                      {formatNumber(Math.abs(parseFloat(crypto.changePercent24Hr)))}
                    </span>
        </TableCellLink>
      </td>
      <td>
        <button className={s.plus_icon} onClick={() => showModal(crypto)}>
          +
          <img alt="plus icon" />
        </button>
      </td>
    </tr>
  );
};

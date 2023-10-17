import React, { useContext } from "react";
import s from "./PortfolioModel.module.scss";
import { PortfolioModalContext, PortfolioModalContextState } from "../../../context/portfolioModal.context";
import { PortfolioModalRow } from "./PortfolioModelRow/PortfolioModelRow";
import { Button } from "../button/Button";

export const PortfolioModal = () => {
  const {
    shouldShowPortfolioModal,
    setShouldShowPortfolioModal,
    currencyPortfolioRows
  } = useContext<PortfolioModalContextState>(PortfolioModalContext);

  const closeModal = () => {
    setShouldShowPortfolioModal(false);
  };

  const preparedModalClassName =
    `${s.modal} ${shouldShowPortfolioModal
      ? s.show : s.do_not_show}`;

  return (
    <div className={preparedModalClassName} onClick={closeModal}>
      <div className={s.modal_content} onClick={(e) => e.stopPropagation()}>
        <div className={s.portfolio_rows}>
          {currencyPortfolioRows.length
            ? currencyPortfolioRows.map((currencyPortfolioRow, index) => {
              return <PortfolioModalRow key={index} {...currencyPortfolioRow} />;
            })
            : <div className={s.empty_portfolio}>Portfolio is Empty</div>
          }
        </div>
        <Button name={"Cancel"} styles={s.cancel_button} callback={closeModal} />
      </div>
    </div>
  );
};

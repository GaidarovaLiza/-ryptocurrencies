import { PortfolioModalContext, PortfolioModalContextStateType } from "context/portfolioModal.context";
import React, { useContext } from "react";
import { Button } from "../button/Button";
import s from "./PortfolioModel.module.scss";
import { PortfolioModalRow } from "./PortfolioModelRow/PortfolioModelRow";

export const PortfolioModal = () => {
  const {
    shouldShowPortfolioModal,
    setShouldShowPortfolioModal,
    currencyPortfolioRows
  } = useContext<PortfolioModalContextStateType>(PortfolioModalContext);

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

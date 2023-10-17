import { CurrencySummaryType } from "../shared/portfolioModal/PortfolioModelRow/PortfolioModelRow";
import { AddToPortfolioModalContext, AddToPortfolioModalContextStateType } from "../../context/addToPortfolio.context";
import { CurrencyTableModal } from "../shared/currencyModal/CurrencyModal";
import { useContext, useState } from "react";
import s from "./Portfolio.module.scss";
import { Button } from "../shared/button/Button";

export const AddToPortfolio = (AddToPortfolioProps: CurrencySummaryType) => {
  const {
    setShouldShowAddToPortfolioModal,
    setCurrencyToAddToPortfolio
  } = useContext<AddToPortfolioModalContextStateType>(AddToPortfolioModalContext);

  const [modalVisible, setModalVisible] = useState(false);

  const openAddToPortfolioModal = (): void => {
    setShouldShowAddToPortfolioModal(true);
    setCurrencyToAddToPortfolio({ ...AddToPortfolioProps });
    setModalVisible(true);
  };

  const closeModal = () => {
    setShouldShowAddToPortfolioModal(false);
    setModalVisible(false);
  };

  return (
    <div className={s.plus_icon_container}>
      <Button name={"Add"} styles={s.portfolio_button} callback={openAddToPortfolioModal} />
      <CurrencyTableModal
        visible={modalVisible}
        onCancel={closeModal}
        onOk={closeModal}
        // @ts-ignore
        selectedCrypto={AddToPortfolioProps}
      />
    </div>
  );
};


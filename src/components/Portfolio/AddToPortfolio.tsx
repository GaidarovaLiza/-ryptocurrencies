import { Button } from "components/shared/button/Button";
import { CurrencyTableModal } from "components/shared/currencyModal/CurrencyModal";
import { CurrencySummaryType } from "components/shared/portfolioModal/PortfolioModelRow/PortfolioModelRow";
import { AddToPortfolioModalContext, AddToPortfolioModalContextStateType } from "context/addToPortfolio.context";
import { useContext, useState } from "react";
import s from "./Portfolio.module.scss";

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


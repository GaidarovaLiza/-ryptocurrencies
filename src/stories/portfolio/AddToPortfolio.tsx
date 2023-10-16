import { CurrencySummary } from "../../components/shared/portfolioModal/PortfolioModelRow/PortfolioModelRow";
import { AddToPortfolioModalContext, AddToPortfolioModalContextState } from "../../context/AddToPortfolio.context";
import CurrencyTableModal from "../../components/shared/currencyModal/CurrencyModal";
import { useContext, useState } from "react";
import s from './Portfolio.module.scss'

export const  AddToPortfolio = (AddToPortfolioProps:CurrencySummary ) => {
  const {
    setShouldShowAddToPortfolioModal,
    setCurrencyToAddToPortfolio,
  } = useContext<AddToPortfolioModalContextState>(AddToPortfolioModalContext);

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
      <button className={s.plus_icon} onClick={openAddToPortfolioModal} >
        {/*<img   src={PlusIcon}  alt='plus icon'/>*/} +
      </button>
      <CurrencyTableModal
        visible={modalVisible}
        onCancel={closeModal}
        onOk={closeModal}
        // @ts-ignore
        selectedCrypto={AddToPortfolioProps}
      />
    </div>
  );
}


import React, { ChangeEvent, useContext, useState } from "react";
import s from "./CurrencyModal.module.scss";
import { PortfolioModalContext } from "../../../context/portfolioModal.context";
import { CurrencyType } from "../../../services/apiTypes";

export type CurrencyTableModalPropsType = {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  selectedCrypto: CurrencyType | null;
}

export const CurrencyTableModal: React.FC<CurrencyTableModalPropsType> = ({
                                                                            visible,
                                                                            onCancel,
                                                                            onOk,
                                                                            selectedCrypto
                                                                          }) => {
  const { setLastAddedCurrencyToPortfolio } = useContext(PortfolioModalContext);

  const [inputValue, setInputValue] = useState<string>("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*\.?\d{0,5}$/.test(newValue) || newValue === "") {
      setInputValue(newValue);
    }
  };

  const handleOk = () => {
    const parsedValue = parseFloat(inputValue);
    if (parsedValue >= 0.00001 && parsedValue <= 1000000 && selectedCrypto) {
      const newCurrency = {
        id: selectedCrypto.id,
        name: selectedCrypto.name,
        symbol: selectedCrypto.symbol,
        priceUsd: parseFloat(selectedCrypto.priceUsd) * parsedValue,
        amount: parsedValue
      };
      setLastAddedCurrencyToPortfolio(newCurrency);
      onOk(); // Close the modal
      setInputValue("");
    } else {
      console.error("Input value is not within the allowed range.");
    }
  };

  const handleCancel = () => {
    onCancel();
    setInputValue("");
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={s.modalOverlay} onClick={handleCancel}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={s.modalTitle}>Add Crypto</h2>
        <input
          className={s.input}
          placeholder="Enter amount of currency..."
          value={inputValue}
          onChange={handleInput}
        />
        <div className={s.modalButtons}>
          <button className={s.modalButtonConfirm} onClick={handleOk}> Confirm</button>
          <button className={s.modalButtonCancel} onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};


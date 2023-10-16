import { useEffect, useState } from "react";
import { CurrencyType } from "../../services/apiTypes";
import { fetchCurrencies } from "../../services/utils";
import s from "./CoinTable.module.scss";
import { CoinTableRow } from "./CoinTableRow/CoinTableRow";
import { Loader } from "../Loader/Loader";
import { Pagination } from "../Pagination/Pagination";
import { CurrencyTableModal } from "../shared/currencyModal/CurrencyModal";

export const CoinTable = () => {
  const [cryptoData, setCryptoData] = useState<CurrencyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CurrencyType | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCurrencies(false, 10, (currentPage - 1) * 10);
        setCryptoData(data);
        const calculatedTotalPages = Math.ceil(data.length);
        setTotalPages(calculatedTotalPages);
        setIsLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [currentPage]);

  const handlePrevPaginationTabClick = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPaginationTabClick = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = (crypto: CurrencyType) => {
    setSelectedCrypto(crypto);
    setIsModalOpen(true);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={s.row}>
      {isLoading ? (
        <Loader />
      ) : (
        <table className={s.crypto_table}>
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Logo</th>
            <th scope="col">Name</th>
            <th scope="col">Symbol</th>
            <th scope="col">Market Cap</th>
            <th scope="col">Price</th>
            <th scope="col">Supply</th>
            <th scope="col">Volume (24Hr)</th>
            <th scope="col">%(24h)</th>
            <th scope="col" />

          </tr>
          </thead>
          <tbody>
          {cryptoData.map((crypto) => (
            <CoinTableRow key={crypto.id} crypto={crypto} showModal={showModal} />
          ))}
          </tbody>
        </table>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageNumbers={pageNumbers}
        handlePrevPaginationTabClick={handlePrevPaginationTabClick}
        handleNextPaginationTabClick={handleNextPaginationTabClick}
        setCurrentPage={setCurrentPage}
      />
      <CurrencyTableModal
        visible={isModalOpen}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        selectedCrypto={selectedCrypto}
      />
    </div>
  );
};

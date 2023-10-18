import { Pagination } from "components/Pagination/Pagination";
import { CurrencyTableModal } from "components/shared/currencyModal/CurrencyModal";
import { Loader } from "components/shared/loader/Loader";
import { ChangeEvent, memo, useMemo, useState } from "react";
import { CurrencyType } from "services/apiTypes";
import s from "./CoinTable.module.scss";
import { CoinTableRow } from "./CoinTableRow/CoinTableRow";
import { useCryptoData } from "../../pages/Main/hooks";

export const CoinTable = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filteredData, setFilteredData] = useState<CurrencyType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CurrencyType | null>(null);
  const {
    cryptoData,
    isLoading,
    totalPages,
    currentPage,
    setCurrentPage
  } = useCryptoData();

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const filteredCryptoData = cryptoData.filter((crypto) =>
      crypto.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredData(filteredCryptoData);
  };

  const handleSortFieldChange = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortDirection("asc");
      setSortField(field);
    }
  };

  const sortedData = useMemo(() => {
    if (sortField === "price") {
      cryptoData.sort((a, b) =>
        sortDirection === "asc" ? parseInt(a.priceUsd) - parseInt(b.priceUsd) : parseInt(b.priceUsd) - parseInt(a.priceUsd)
      );
    } else if (sortField === "marketCap") {
      cryptoData.sort((a, b) =>
        sortDirection === "asc" ? parseInt(a.marketCapUsd) - parseInt(b.marketCapUsd) : parseInt(b.marketCapUsd) - parseInt(a.marketCapUsd)
      );
    } else if (sortField === "change24h") {
      cryptoData.sort((a, b) =>
        sortDirection === "asc" ? parseInt(a.changePercent24Hr) - parseInt(b.changePercent24Hr) : parseInt(b.changePercent24Hr) - parseInt(a.changePercent24Hr)
      );
    }
    return cryptoData;
  }, [filteredData, sortField, sortDirection]);

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

  let displayedData;

  if (searchQuery === "") {
    displayedData = sortField === "" ? cryptoData : sortedData;
  } else {
    displayedData = filteredData;
  }

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
            <th scope="col">Name
              <input
                className={s.search_input}
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search"
              /></th>
            <th scope="col">
              Symbol
            </th>
            <th scope="col" onClick={() => handleSortFieldChange("marketCap")}>
              Market Cap{" "}
              {sortField === "marketCap" && (
                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSortFieldChange("price")}>
              Price{" "}
              {sortField === "price" && (
                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th scope="col">Supply</th>
            <th scope="col">Volume (24Hr)</th>
            <th scope="col" onClick={() => handleSortFieldChange("change24h")}>
              %(24h){" "}
              {sortField === "change24h" && (
                <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
              )}</th>
            <th scope="col" />

          </tr>
          </thead>
          <tbody>
          {displayedData.map((crypto) => (
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
});

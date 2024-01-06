import { createContext, useLayoutEffect, useState } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [allCryptoCurrencies, setAllCryptoCurrencies] = useState([]);

  const [searchCrypto, setSearchCrypto] = useState("bitcoin");
  const [page, setPage] = useState(1);
  const [totalPages] = useState(350);
  const [loading, setLoading] = useState(false)

  const getAllCrpytoCurrencies = async () => {
    try {
        setLoading(true)
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=&order=market_cap_desc&page=1&per_page=200`
      )
        .then((res) => res.json())
        .then((json) => json);
        localStorage.setItem("coinsData.json", JSON.stringify(data));
      setAllCryptoCurrencies(data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      window.alert("Too many Api requests")
    }
  };

  useLayoutEffect(() => {
    getAllCrpytoCurrencies();
  }, [currency, page]);

  return (
    <CryptoContext.Provider
      value={{
        currency,
        setCurrency,
        page,
        setPage,
        totalPages,
        allCryptoCurrencies,
        setAllCryptoCurrencies,
        searchCrypto,
        setSearchCrypto,
        loading, 
        setLoading
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

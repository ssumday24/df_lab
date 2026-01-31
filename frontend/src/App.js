import React, { useState } from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import PriceCard from "./components/PriceCard";
import SoulPrices from "./components/SoulPrices";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("search");
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedItem, setSearchedItem] = useState("");

  const handleSearch = async (itemName) => {
    setLoading(true);
    setError(null);
    setSearchedItem(itemName);

    try {
      const response = await fetch(
        `http://localhost:5000/api/prices/${encodeURIComponent(itemName)}`,
      );
      const data = await response.json();

      if (data.status === "success") {
        setPriceData(data);
      } else {
        setError(data.message || "데이터를 가져올 수 없습니다.");
        setPriceData(null);
      }
    } catch (err) {
      setError("서버 연결에 실패했습니다.");
      setPriceData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>DFLAB</h1>
        <NavBar currentPage={currentPage} onPageChange={setCurrentPage} />
      </header>

      <main className="App-main">
        {currentPage === "search" && (
          <>
            <SearchBar onSearch={handleSearch} loading={loading} />
            {error && <p className="error-message">{error}</p>}
            {priceData && (
              <PriceCard
                itemName={searchedItem}
                average={priceData.average}
                count={priceData.count}
                itemId={priceData.itemId}
              />
            )}
          </>
        )}

        {currentPage === "soul" && <SoulPrices />}
      </main>
    </div>
  );
}

export default App;

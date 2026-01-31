import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import PriceCard from "./components/PriceCard";
import "./App.css";

function App() {
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedItem, setSearchedItem] = useState("");

  const handleSearch = async (itemName) => {
    setLoading(true);
    setError(null);
    setSearchedItem(itemName);

    try {
      /* 한글 깨짐 방지*/
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
        <h1>경매장 시세 조회</h1>
      </header>

      <main className="App-main">
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
      </main>
    </div>
  );
}

export default App;

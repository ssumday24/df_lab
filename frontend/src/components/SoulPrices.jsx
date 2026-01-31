import React, { useState, useEffect } from "react";
import PriceCard from "./PriceCard";

const SOUL_ITEMS = [
  "레어 소울 결정",
  "유니크 소울 결정",
  "레전더리 소울 결정",
  "에픽 소울 결정",
  "태초 소울 결정",
];

// 업데이트 시간 포맷 함수
const formatUpdateTime = (date) => {
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

function SoulPrices() {
  const [prices, setPrices] = useState({});
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchAllPrices = async () => {
    setError(null);

    try {
      const results = await Promise.all(
        SOUL_ITEMS.map(async (itemName) => {
          const response = await fetch(
            `http://localhost:5000/api/prices/${encodeURIComponent(itemName)}`,
          );
          const data = await response.json();
          return { itemName, ...data };
        }),
      );

      const priceMap = {};
      results.forEach((result) => {
        priceMap[result.itemName] = result;
      });
      setPrices(priceMap);
      setLastUpdate(new Date());
    } catch (err) {
      setError("서버 연결에 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchAllPrices();

    // 5분(300000ms)주기 자동 갱신
    const interval = setInterval(() => {
      fetchAllPrices();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="soul-prices">
      <div className="soul-header">
        <h2>소울 결정 가격</h2>
        {lastUpdate && (
          <span className="update-time">
            업데이트: {formatUpdateTime(lastUpdate)}
          </span>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="soul-list">
        {SOUL_ITEMS.map((itemName) => {
          const data = prices[itemName];
          if (!data || data.status !== "success") {
            return (
              <div key={itemName} className="price-card empty">
                <div className="item-info">
                  <h3>{itemName}</h3>
                  <p className="price-text">데이터 없음</p>
                </div>
              </div>
            );
          }
          return (
            <PriceCard
              key={itemName}
              itemName={itemName}
              average={data.average}
              count={data.count}
              itemId={data.itemId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SoulPrices;

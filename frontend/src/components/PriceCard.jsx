import React from 'react';

function PriceCard({ itemName, average, count, itemId }) {
  //이미지 서버 주소 생성
  const imgUrl = `https://img-api.neople.co.kr/df/items/${itemId}`

  return (
    <div className="price-card">
     
      <img src={imgUrl} alt={itemName} className="item-icon" />
      
      <div className="item-info">
        <h3>{itemName}</h3>
        
        <p className="price-text">
            {/* 세자리 단위 콤마*/}
            평균가 : <span>{average?.toLocaleString()}</span> 골드
        </p>
       
      </div>

    </div>
  );
}

export default PriceCard;
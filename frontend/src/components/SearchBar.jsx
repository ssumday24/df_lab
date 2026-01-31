import React, { useState } from 'react';

function SearchBar({ onSearch, loading }) {
  const [itemName, setItemName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName.trim()) {
      onSearch(itemName.trim());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="아이템 이름 입력"
        disabled={loading}
      />
      <button type="submit" disabled={loading || !itemName.trim()}>
        {loading ? '검색중...' : '검색'}
      </button>
    </form>
  );
}

export default SearchBar;

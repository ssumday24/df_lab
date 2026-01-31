import React from 'react';

function NavBar({ currentPage, onPageChange }) {
  return (
    <nav className="nav-bar">
      {/* 버튼 클릭시 색 변환 */}
      <button
        className={currentPage === 'search' ? 'active' : ''}
        onClick={() => onPageChange('search')}
      >
        아이템 검색
      </button>
      <button
        className={currentPage === 'soul' ? 'active' : ''}
        onClick={() => onPageChange('soul')}
      >
        소울 가격 조회
      </button>
    </nav>
  );
}

export default NavBar;

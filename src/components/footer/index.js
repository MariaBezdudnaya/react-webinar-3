import React from 'react';
import { useLang } from '../../lang/LangContext';
import { getPageNumbers } from '../../store/navigation';
import Select from '../select';
import './style.css';

function Footer({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) {
  const { translate } = useLang();

  const itemsPerPageOptions = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '20', label: '20' },
  ];

  const visiblePageCount = 4; // Максимальное количество отображаемых номеров страниц
  const pageNumbers = getPageNumbers(currentPage, totalPages, visiblePageCount);

  return (
    <div className="footer">
      {/* Изменение количества товаров на странице */}
      <div>
        <label htmlFor="itemsPerPage">{translate('itemsOnPage')}</label>
        <Select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          options={itemsPerPageOptions}
          className="select-footer"
        />
      </div>

      {/* Навигация страниц */}
      <div>
        {/* Первая страница */}
        {pageNumbers[0] !== 1 && (
          <>
            <button onClick={() => onPageChange(1)}>1</button>
            {pageNumbers[0] !== 2 && <span>...</span>}
          </>
        )}

        {/* Другие страницы */}
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}

        {/* Последняя страница */}
        {pageNumbers[pageNumbers.length - 1] !== totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] !== totalPages - 1 && <span>...</span>}
            <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Footer;

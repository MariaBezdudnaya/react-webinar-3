/**
 * Генерирует массив номеров страниц для отображения в пагинации.
 * @param {number} currentPage - Текущая страница.
 * @param {number} totalPages - Общее количество страниц.
 * @param {number} visiblePageCount - Максимальное количество отображаемых номеров страниц.
 * @returns {number[]} - Массив номеров страниц.
 */
export const getPageNumbers = (currentPage, totalPages, visiblePageCount) => {
  const pageNumbers = [];

  if (totalPages <= visiblePageCount) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (currentPage <= 2) {
      endPage = Math.min(visiblePageCount, totalPages);
    }
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - visiblePageCount + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  }
  return pageNumbers;
};

import React, { memo, useState, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Footer from '../../components/footer';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useLang } from '../../lang/LangContext';

function Main() {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1); // Состояние для текущей страницы (начинаем с первой)
  const [itemsPerPage, setItemsPerPage] = useState(10); // Состояние для количества товаров на странице (по умолчанию 10)
  const [totalItems, setTotalItems] = useState(0); // Состояние для общего количества товаров (изначально 0)
  const [loading, setLoading] = useState(false); // Состояние для отображения индикатора загрузки
  const [error, setError] = useState(null); // Состояние для отображения ошибки

  const { translate } = useLang();

  const select = useSelector(state => {
    return {
      list: state.catalog.list,
      amount: state.basket.amount,
      sum: state.basket.sum,
    };
  });

  useEffect(() => {
    // Получаем общее количество товаров при загрузке компонента
    const fetchTotalItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await store.actions.catalog.getTotalCount();
        setTotalItems(response);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении общего количества товаров:", error);
        setError("Не удалось загрузить общее количество товаров.");
        setLoading(false);
      }
    };
    fetchTotalItems(); // Вызываем функцию для получения общего количества товаров
  }, [store.actions.catalog]); // Зависимость useEffect: перезапускаем эффект только когда меняется store.actions.catalog

  useEffect(() => {
    const skip = (currentPage - 1) * itemsPerPage;
    setLoading(true); // Начинаем загрузку
    store.actions.catalog.load({ limit: itemsPerPage, skip: skip })
      .then(() => setLoading(false)) // Когда загрузка завершена
      .catch(() => { // Если произошла ошибка
        setError("Не удалось загрузить товары");
        setLoading(false);
    });
  }, [currentPage, itemsPerPage, store.actions.catalog]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Получение инфо о товаре
    getInfo: useCallback(_id => store.actions.info.getInfo(_id), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} onClick={callbacks.getInfo} />;
      },
      [callbacks.addToBasket, callbacks.getInfo],
    ),
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage); // Вычисляем общее количество страниц

  const handlePageChange = (pageNumber) => { // Функция для изменения текущей страницы
    setCurrentPage(pageNumber); // Устанавливаем новую текущую страницу
  };

  const handleItemsPerPageChange = (event) => { // Функция для изменения количества товаров на странице
    const newItemsPerPage = parseInt(event.target.value, 10); // Получаем новое количество товаров на странице из события
    setItemsPerPage(newItemsPerPage); // Устанавливаем новое количество товаров на странице
    setCurrentPage(1); // Сбрасываем текущую страницу на первую
  };

  return (
    <PageLayout>
      <Head title={translate('title')} />
      <BasketTool amount={select.amount} sum={select.sum} onOpen={callbacks.openModalBasket} />
      <List list={select.list} renderItem={renders.item} />
      {totalItems > 0 && (
        <Footer
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </PageLayout>
  );
}

export default memo(Main);
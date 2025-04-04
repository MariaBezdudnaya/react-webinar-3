import React, { memo, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ItemInfo from '../../components/item-info';
import useSelector from '../../store/use-selector';

function Info() {
  const { id } = useParams();
  const store = useStore();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const select = useSelector(state => {
    console.log(state.info.data)
    return {
      data: state.info.data,
      amount: state.basket.amount,
      sum: state.basket.sum,
    };
  });

  const callbacks = {
    // Добавление товара в корзину
    AddToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await store.actions.info.getInfo(id);
        console.log(response);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении инфо:", error);
        setError("Не удалось загрузить инфо.");
        setLoading(false);
      }
    };
    fetchInfo();
  }, [id, store.actions.info]);

  if (loading) {
    return <PageLayout>Loading...</PageLayout>; // Или какой-то другой индикатор загрузки
  }
  if (error) {
    return <PageLayout>Error: {error}</PageLayout>;
  }
  console.log("data", data)

  return (
    <PageLayout>
      <Head title={data?.result?.title} />
      <BasketTool amount={select.amount} sum={select.sum} onOpen={callbacks.openModalBasket} />
      {data && <ItemInfo data={data} onAdd={callbacks.AddToBasket} />}
    </PageLayout>
  );
};

export default memo(Info);
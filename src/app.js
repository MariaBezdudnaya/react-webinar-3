import React, { useCallback, useEffect } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';

function App({ store }) {
  const { list, cart, isModalOpen, totalPrice, uniqueCartItemsCount } = store.getState();

  const calculateCartSummary = useCallback(() => {
    store.calculateCartSummary();
  }, [store]);

  useEffect(() => {
    calculateCartSummary();
  }, [cart, calculateCartSummary]);

  const callbacks = {
    onAddItemToCart: useCallback(
      code => {
        store.addItemToCart(code);
      },
      [store],
    ),
    onRemoveItemFromCart: useCallback(
      code => {
        store.removeItemFromCart(code);
      },
      [store],
    ),
    onOpenModal: useCallback(() => {
      store.openModal();
    }, [store]),
    onCloseModal: useCallback(() => {
      store.closeModal();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        uniqueCartItemsCount={uniqueCartItemsCount}
        totalPrice={totalPrice}
        onOpenModal={callbacks.onOpenModal}
      />
      <List
        items={list}
        onItemClick={callbacks.onAddItemToCart}
        actionName="Добавить"
      />
      {isModalOpen && (
        <Modal
          cart={cart}
          list={list}
          onRemoveItemFromCart={callbacks.onRemoveItemFromCart}
          onCloseModal={callbacks.onCloseModal}
        />
      )}
    </PageLayout>
  );
}

export default App;

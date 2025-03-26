import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, isModalOpen } = store.getState();

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

  const uniqueCartItemsCount = Object.keys(cart).length;
  const totalPrice = list.reduce((sum, item) => {
    return sum + (cart[item.code] || 0) * item.price; // Исправлено
  }, 0);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        uniqueCartItemsCount={uniqueCartItemsCount}
        totalPrice={totalPrice}
        onOpenModal={callbacks.onOpenModal}
      />
      <List
        list={list}
        onAddItemToCart={callbacks.onAddItemToCart}
        cart={cart}
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

import React from 'react';
import PropTypes from 'prop-types';
import ModalLayout from '../modal-layout';
import closeModalIcon from '../../img/cross.svg';
import List from '../list';
import './style.css';

function Modal({ cart, list, onRemoveItemFromCart, onCloseModal }) {
  const cartItems = cart.map(cartItem => {
    const itemDetails = list.find(item => item.code === cartItem.code);
    return {
      ...itemDetails,
      quantity: cartItem.quantity,
    };
  });

  const sumPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const formattedSumPrice = sumPrice.toLocaleString('ru-RU');

  return (
    <ModalLayout>
      <div className='Modal'>
        <div className='Modal-content'>
          <div className='Modal-header'>
            <button className="close-cart-btn" onClick={onCloseModal}>
              <img src={closeModalIcon} alt="close-modal" />
            </button>
            <h1>Корзина</h1>
          </div>

          <div className='Modal-body'>
            {cart.length === 0 ? (
              <p>Корзина пустая</p>
            ) : (
              <List
                items={cartItems}
                onItemClick={onRemoveItemFromCart}
                actionName="Удалить"
              />
            )}

            <div className="totalPrice">
              <div className="totalPrice-label"><b>Итого:</b></div>
              <div className="totalPrice-value"><b>{formattedSumPrice} ₽</b></div>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}

Modal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemoveItemFromCart: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;

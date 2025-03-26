import React from 'react';
import PropTypes from 'prop-types';
import closeModalIcon from '../../img/cross.svg';
import './style.css';

function Modal({ cart, list, onRemoveItemFromCart, onCloseModal }) {

  const cartItems = Object.keys(cart).map(code => {
    const item = list.find(item => item.code === Number(code));
    return { ...item, quantity: cart[code] };
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="Modal">
      <div className="modal-content">
        <button className="close-cart-btn" onClick={onCloseModal}>
          <img src={closeModalIcon} alt="close-modal" />
        </button>

        <h1>Корзина</h1>

        {cartItems.length === 0 ? (
          <p className="modal-item">Корзина пуста</p>
        ) : (
          <div className="modal-list">
            {cartItems.map(item => (
              <div className="modal-item">
                <div className="modal-title">
                  <b>{item.title}</b>
                </div>
                <div className="modal-quantity">{item.quantity} шт</div>
                <div className="modal-price">{item.price} ₽</div>
                <div className="modal-actions">
                  <button onClick={() => onRemoveItemFromCart(item.code)}>
                    Удалить 
                  </button>
                </div>
              </div>
            ))}
            <div className="totalPrice">
              <div><b>Итого:</b></div> 
              <div><b>{totalPrice} ₽</b></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Modal.propTypes = {
  cart: PropTypes.object.isRequired,
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

export default React.memo(Modal);
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAddItemToCart }) { // Аргументы принимаются через деструктуризацию
  const handleClick = () => {
    onAddItemToCart(item.code);
  };

  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      <div className="Item-price">{item.price} ₽</div>
      <div className="Item-actions">
        <button onClick={handleClick} className="add-to-cart">Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddItemToCart: PropTypes.func.isRequired,
};

export default React.memo(Item);
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import './style.css';

function Item({ item, onItemClick, actionName }) {
  return (
    <div className="Item">
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      
      {item.quantity && <div className="Item-quantity">{item.quantity} шт.</div>}
      <div className="Item-price">{formatPrice(item.price * (item.quantity || 1))}</div>
      
      <div className="Item-actions">
        <button 
          onClick={() => onItemClick(item.code)} 
          className={`action-button ${actionName === 'Удалить' ? 'remove-button' : 'add-button'}`}
        >
          {actionName}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
  actionName: PropTypes.string.isRequired,
};

export default memo(Item);



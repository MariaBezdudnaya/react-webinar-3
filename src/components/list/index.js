import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAddItemToCart }) {
  return (
    <div className="List">
      {list.map(item => (
        <Item key={item.code} item={item} onAddItemToCart={onAddItemToCart} />
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onAddItemToCart: PropTypes.func.isRequired
};

export default React.memo(List);

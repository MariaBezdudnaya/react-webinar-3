import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ items, onItemClick, actionName }) { // items вместо list, onItemClick вместо onAddItemToCart
  return (
    <div className="List">
      {items.map(item => (
        <Item
          key={item.code}
          item={item}
          onItemClick={onItemClick} // Передаем общую функцию
          actionName={actionName} // Передаем название действия (Добавить/Удалить)
        />
      ))}
    </div>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
  actionName: PropTypes.string.isRequired, // Добавляем propType для actionName
};

export default List;
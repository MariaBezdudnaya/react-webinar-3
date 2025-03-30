import React from 'react';
import shoppingCartIcon from '../../img/cart.svg';
import PropTypes from 'prop-types';
import { plural, formatPrice } from '../../utils';
import './style.css';

function Controls({ uniqueCartItemsCount, totalPrice, onOpenModal }) {
  const formattedTotalPrice = formatPrice(totalPrice);

  return (
    <div className="Controls">
      <button onClick={onOpenModal} className="open-cart-btn">
        <img src={shoppingCartIcon} alt="shoppingCartIcon" />
        {uniqueCartItemsCount === 0 ? 'Пусто' : (
          <>
            {uniqueCartItemsCount} {plural(uniqueCartItemsCount, {
              one: 'товар ',
              few: 'товара ',
              many: 'товаров ',
            })}
            / {formattedTotalPrice}
          </>
        )}
      </button>
    </div>
  )
}

Controls.propTypes = {
  uniqueCartItemsCount: PropTypes.number.isRequired,
  formattedTotalPrice: PropTypes.number.isRequired,  
  onOpenModal: PropTypes.func.isRequired,
};

export default React.memo(Controls);
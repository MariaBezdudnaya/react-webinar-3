import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import Cart from '../../assets/icon/cart.svg';
import { useLang } from '../../lang/LangContext';
import './style.css';

function BasketTool(props) {
  const { onOpen = () => {}, sum = 0, amount = 0 } = props;
  const { translate } = useLang();

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <h4 className={cn('subtitle')}>
        <Link to={"/"}>{translate('page')}</Link>
      </h4>
      <button className={cn('action')} onClick={onOpen}>
        <Cart className={cn('icon')} />
        <span className={cn('total')}>
        {amount
        ? `${amount} ${plural(amount, {
            one: translate('товар'),
            few: translate('товара'),
            many: translate('товаров'),
          })} / ${numberFormat(sum)} ₽`
        : translate('emptyBasket')}
        </span>
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);

import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import Button from '../button';
import useStore from '../../store/use-store';
import { useLang } from '../../lang/LangContext';
import './style.css';


function ItemBasket(props) {
  const { translate } = useLang();
  const cn = bem('ItemBasket');

  const store = useStore();

  const callbacks = {
    onRemove: e => props.onRemove(props.item._id),
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <div className={cn()}>
      {/* <div className={cn('code')}>{props.item._id}</div> */}
      <h4 className={cn('title')} onClick={callbacks.closeModal}>
        <Link to={`/item/${props.item._id}`}>{props.item.title}</Link>
      </h4>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {translate('quantity')}</div>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          <Button style="delete" onClick={callbacks.onRemove} title={translate('removeFromBasket')} />
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  onItemClick: propTypes.func,
};

export default memo(ItemBasket);
import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { useLang } from '../../lang/LangContext';
import './style.css';

function BasketTotal({ sum = 0 }) {
  const { translate } = useLang();
  const cn = bem('BasketTotal');
  
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translate('total')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

export default memo(BasketTotal);

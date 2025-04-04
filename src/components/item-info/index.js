import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import { useLang } from '../../lang/LangContext';
import Button from '../button';
import './style.css';

function ItemInfo(props) {
  const { data } = props;
  const cn = bem('ItemInfo');
  const { translate } = useLang();

  const callbacks = {
    addToBasket: e => props.onAdd(data?.result?._id),
  };

  return (
    <div className={cn()}>
      <p>{data?.result?.description}</p>
      <div>
        <table>
          <tbody>
              <tr>
                <td><div>{translate('country')}</div></td>
                <td className={cn('span')}><div>{data?.result?.madeIn._type}</div></td>
              </tr>
              <tr>
                <td><div>{translate('category')}</div></td>
                <td className={cn('span')}><div>{data?.result?.category._type}</div></td>
              </tr>
              <tr>
                <td><div>{translate('edition')}</div></td>
                <td className={cn('span')}><div>{data?.result?.edition}</div></td>
              </tr>
          </tbody>
        </table>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{translate('price')}{numberFormat(data?.result?.price)} ₽</div>
        <Button style="primary" onClick={callbacks.addToBasket} title={translate('addToBasket')} />
      </div>
    </div>
  );
}

ItemInfo.propTypes = {
  result: PropTypes.shape({
    price: PropTypes.number,
    description: PropTypes.string,
    madeIn: PropTypes.shape({ shape: PropTypes. shape }).isRequired,
    category: PropTypes.shape({ shape: PropTypes.shape }).isRequired,
    edition: PropTypes.number,
  }).isRequired,
  addToBasket: PropTypes.func,
  openModalBasket: PropTypes.func,
};
export default memo(ItemInfo);
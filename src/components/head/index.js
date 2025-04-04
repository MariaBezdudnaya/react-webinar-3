import { memo } from 'react';
import PropTypes from 'prop-types';
import LanguageSwitcher from '../../lang/switcherBtn';
import './style.css';

function Head({ title }) {
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <LanguageSwitcher />
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);

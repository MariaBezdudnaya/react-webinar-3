import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ list, renderItem }) {
  console.log("List: props.list =", list);
  return (
    <ul className="List">
      {list.map(item => (
        <li key={item._id} className="List-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  renderItem: PropTypes.func,
};

export default memo(List);

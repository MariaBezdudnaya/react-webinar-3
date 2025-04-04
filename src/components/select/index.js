import React from 'react';
import './style.css';

function Select({ value, onChange, options, className }) {
  return (
    <div className="selectContainer">
      <select className={`select ${className || ''}`} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="arrow"></span>
    </div>
  );
}

export default Select;

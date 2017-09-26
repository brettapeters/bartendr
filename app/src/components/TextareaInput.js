import React from 'react';
import PropTypes from 'prop-types';

const TextareaInput = ({ help, label, name, onChange, placeholder, value }) => (
  <div className="form-group">
    {label && <label htmlFor={name}>{label}</label>}
    <textarea
      type="text"
      className="form-control"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      aria-describedby={`${name}Help`}
      placeholder={placeholder}
    />
    {help && <small id={`${name}Help`} className="form-text text-muted">{help}</small>}
  </div>
);

TextareaInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  help: PropTypes.string
};

export default TextareaInput;

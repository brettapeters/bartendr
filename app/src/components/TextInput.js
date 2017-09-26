import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ help, label, name, onChange, placeholder, value }) => (
  <div className="form-group row">
    <label htmlFor={name} className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-10">
      <input
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
  </div>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  help: PropTypes.string
};

TextInput.defaultProps = {
  label: '',
  placeholder: '',
  help: ''
};

export default TextInput;

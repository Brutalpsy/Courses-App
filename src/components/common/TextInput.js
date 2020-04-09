import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ name, placeholder, value, onChange, error }) => {
  let wrapperClass = 'form-group';
  if (error && error.length) {
    wrapperClass += ` has-error`;
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{name}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && (
          <div id={name} className="alert alert-danger">
            {error}{' '}
          </div>
        )}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;

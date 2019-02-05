import React from 'react'
import PropTypes from 'prop-types'
import './Input.scss'


const Input = ({label, name, value, type, error, errorMsg, change}) => {
  const id = "input_"+(Math.floor(Math.random()*1000))
  const inputClasses = error ? 'form-field__input error' : 'form-field__input'

  return (
    <div className="form-field">
      <div className="form-field__control">
        <input
          id={id}
          type={type}
          className={inputClasses}
          placeholder=" "
          name={name}
          value={value}
          onChange={change}/>
        <label htmlFor={id} className="form-field__label">{label}</label>
      </div>
      {
        (error && errorMsg !== "") ?
          <div className="form-field__error">{errorMsg}</div> :
          null
      }
    </div>
  )
}
Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.bool,
  errorMsg: PropTypes.string,
  change: PropTypes.func
}
Input.defaultProps = {
  value: '',
  type: 'text',
  error: false,
  errorMsg: '',
};


export default Input
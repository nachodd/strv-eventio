import React from 'react'
import PropTypes from 'prop-types'
import './Input.scss'


const Input = ({label, name, value, type, errorMsg, change}) => {
  const id = "input_"+(Math.floor(Math.random()*10000))
  const inputClasses = (errorMsg !== undefined) ? 'form-field__input error' : 'form-field__input'

  return (
    <div className="form-field">
      <div className="form-field__control">
        <input
          id={id}
          type={`${type}`}
          className={inputClasses}
          placeholder=" "
          name={name}
          value={value}
          onChange={change}/>
        <label htmlFor={id} className="form-field__label">{label}</label>
      </div>
      {
        (errorMsg !== undefined) ?
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
  errorMsg: PropTypes.string,
  change: PropTypes.func
}
Input.defaultProps = {
  value: '',
  type: 'text',
  errorMsg: undefined,
};


export default Input
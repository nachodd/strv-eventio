import React from 'react'
import PropTypes from 'prop-types'
import './Input.scss'
import { observable } from 'mobx';
import { observer } from 'mobx-react';


const Input = observer(
  ({label, name, value, type, showPasswordRevealer, passwordRevealed, passwordRevealerHandler, errorMsg, change}) => {
  const id = "input_"+(Math.floor(Math.random()*10000))
  const inputClasses = (errorMsg !== undefined) ? 'form-field_input error' : 'form-field_input'

  let finalType = type;
  if (showPasswordRevealer && finalType === 'password' && passwordRevealed) {
    finalType = 'text'
  }

  return (
    <div className="form-field">
      <div className="form-field_control">
        <input
          id={id}
          type={`${finalType}`}
          className={inputClasses}
          placeholder=" "
          name={name}
          value={value}
          onChange={change}/>
        <label htmlFor={id} className="form-field_label">{label}</label>

        { showPasswordRevealer && type === 'password' ?
          <span className="form-field_reveal" onClick={() => passwordRevealerHandler()}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0H24V24H0V0Z" stroke="black" strokeOpacity="0.01" strokeWidth="0"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#E1E4E6"/>
            </svg>
          </span>
          : null
        }
      </div>

      {
        (errorMsg !== undefined) ?
          <div className="form-field_error">{errorMsg}</div> :
          null
      }
    </div>
  )
})
Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  passwordRevealed: PropTypes.bool,
  showPasswordRevealer: PropTypes.bool,
  value: PropTypes.string,
  errorMsg: PropTypes.string,
  change: PropTypes.func
}
Input.defaultProps = {
  value: '',
  type: 'text',
  errorMsg: undefined,
  passwordRevealed: false,
  showPasswordRevealer: false,
};


export default Input
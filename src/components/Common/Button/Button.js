import React from 'react'
import PropTypes from 'prop-types';
import './Button.scss'

const Button = ({type, children}) => {
  let classes = ['button']
  if (type) {
    classes.push(type)
  }
  return (
    <button className={classes.join(' ')}>
      {children}
    </button>
  )
}
Button.propTypes = {
  type: PropTypes.string
};

export default Button

import React from 'react'
import PropTypes from 'prop-types';
import Loading from '../Loading/Loading'
import './Button.scss'

const Button = ({color, size, type, loadingState, onClick, children}) => {
  let classes = ['button']
  if (color) classes.push(color)
  if (size) classes.push(size)

  return (
    <button className={classes.join(' ')} type={type} disabled={loadingState} onClick={onClick}>
      {
        loadingState ?
        <div className="btnFixLoading">
          <Loading color="white" />
        </div>
        :
        children
      }
    </button>
  )
}
Button.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  loadingState: PropTypes.bool
};
Button.defaultProps = {
  type: 'button',
  loadingState: false
};

export default Button

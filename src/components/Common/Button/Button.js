import React from 'react'
import PropTypes from 'prop-types';
import Loading from '../Loading/Loading'
import './Button.scss'

const Button = ({color, type, loadingState, children}) => {
  let classes = ['button']
  if (color) {
    classes.push(color)
  }
  return (
    <button className={classes.join(' ')} type={type} disabled={loadingState}>
      { loadingState ?
        <div className="btnFixLoading">
          <Loading color="white" />
        </div>
        :
        children }
    </button>
  )
}
Button.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string,
  loadingState: PropTypes.bool
};
Button.defaultProps = {
  type: 'button',
  loadingState: false
};

export default Button

import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types"
import './HeadSingUpIn.scss'

const HeadSingUpIn = ({type}) => {

  const content = (type === 'singUp') ?
    <div className='headSingUpIn'>
      Don't have account? <Link to="/register">SING UP</Link>
    </div>
    :
    <div className='headSingUpIn'>
      Already have an account? <Link to="/login">SING IN</Link>
    </div>

  return (
    <div className='headSingUpInWrapper'>
      {content}
    </div>
  )
}
HeadSingUpIn.propTypes = {
  type: PropTypes.string.isRequired
};


export default HeadSingUpIn

import React from 'react'
import { FadeLoader } from 'react-spinners'
import PropTypes from 'prop-types';
import './Loading.scss'


const Loading = ({color}) => {
  return (
    <div className="LoadingContainer">
      <div><FadeLoader color={color} /></div>
    </div>
  )
}
Loading.propTypes = {
  color: PropTypes.string
}

export default Loading
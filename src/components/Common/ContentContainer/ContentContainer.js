import React from 'react'
import './ContentContainer.scss'

const ContentContainer = ({children}) => {
  return (
    <div className="contentContainer">
      <div className="cont">
        {children}
      </div>
    </div>
  )
}

export default ContentContainer
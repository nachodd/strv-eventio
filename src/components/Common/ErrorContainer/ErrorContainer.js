import React from 'react'
import './ErrorContainer.scss'

const ErrorContainer = ({children}) => {
  return (
    <div className="errorContainer">
      <div className="cont">
        {children}
      </div>
    </div>
  )
}

export default ErrorContainer
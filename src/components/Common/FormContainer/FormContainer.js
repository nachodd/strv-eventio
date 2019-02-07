import React from 'react'
import './FormContainer.scss'

const FormContainer = ({title, subtitle, errorMsg, children}) => {

  return (
    <div className="form-container">
      <div className="cont">
          <div className="title">{title}</div>
          <div className="content">
            {errorMsg ? <div className="errorMsg">{errorMsg}</div> : subtitle}
          </div>
          {children}
      </div>
    </div>
  )
}

export default FormContainer
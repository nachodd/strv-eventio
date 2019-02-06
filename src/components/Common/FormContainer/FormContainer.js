import React from 'react'
import './FormContainer.scss'

// agregarle los estilos de title y content
const FormContainer = ({title, subtitle, errorMsg, children}) => {

  return (
    <div className="FormContainer">
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
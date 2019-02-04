
import React from 'react'
import './Card.scss'

const Card = ({className, children}) => {
  let finalClasses = className ? "eventCard "+className : "eventCard"
  return (
    <div className={finalClasses}>
      {children}
    </div>
  )
}

export default Card

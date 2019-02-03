import React from 'react'
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'
import './Logo.scss'

const Logo = ({colorClass}) => {
  let classes = ["topLogo"];
  if (colorClass) {
    classes.push(colorClass)
  }
  return (
    <Link to="/">
        <span className={classes.join(" ")}>
          E.
        </span>
    </Link>
  )
}
Logo.propType = {
  colorClass: PropTypes.string
}
Logo.defaultProps = {
  colorClass: ''
}

export default Logo
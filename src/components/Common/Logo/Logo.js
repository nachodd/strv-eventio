import React from 'react'
import {Link} from "react-router-dom"
import './Logo.scss'

const Logo = () => {
  return (
    <Link to="/">
        <span className="topLogo">
          E.
        </span>
    </Link>
  )
}

export default Logo
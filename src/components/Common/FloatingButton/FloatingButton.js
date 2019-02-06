import React from 'react'
import PropTypes from 'prop-types'
import './FloattingButton.scss'

const FloatingButton = ({type, visible, onClick}) => {

  if (!visible) return null

  const button = (
    type==='add'
    ? <svg className="fbAdd" width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
          <path className="fbAddPath" fillRule="evenodd" clipRule="evenodd" d="M37 59C52.464 59 65 46.464 65 31C65 15.536 52.464 3 37 3C21.536 3 9 15.536 9 31C9 46.464 21.536 59 37 59Z" />
        </g>
        <path fillRule="evenodd" clipRule="evenodd" d="M44 32H38V38H36V32H30V30H36V24H38V30H44V32Z" fill="white"/>
        <defs>
          <filter id="filter0_d" x="0" y="0" width="74" height="74" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="6"/>
            <feGaussianBlur stdDeviation="4.5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
          </filter>
        </defs>
      </svg>
    :
      <svg className="fbSave" width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
          <path className="fbSavePath" fillRule="evenodd" clipRule="evenodd" d="M37 59C52.464 59 65 46.464 65 31C65 15.536 52.464 3 37 3C21.536 3 9 15.536 9 31C9 46.464 21.536 59 37 59Z" />
        </g>
        <path fillRule="evenodd" clipRule="evenodd" d="M25 19H49V43H25V19Z" stroke="black" strokeOpacity="0.01" strokeWidth="0"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M34.0002 35.1701L29.8302 31.0001L28.4102 32.4101L34.0002 38.0001L46.0002 26.0001L44.5902 24.5901L34.0002 35.1701Z" fill="white"/>
        <defs>
          <filter id="filter0_d" x="0" y="0" width="74" height="74" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="6"/>
            <feGaussianBlur stdDeviation="4.5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
          </filter>
        </defs>
      </svg>
  )

  return (
    <div className="floatingButtonWrapper" onClick={onClick}>
      {button}
    </div>
  )


}
FloatingButton.propTypes = {
  type: PropTypes.string.isRequired,
  visible: PropTypes.bool
}
FloatingButton.defaultProps = {
  visible: true,
}

export default FloatingButton
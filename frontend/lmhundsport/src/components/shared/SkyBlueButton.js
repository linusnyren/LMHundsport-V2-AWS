import React from 'react'
import './SkyBlueButton.css'
export default function SkyBlueButton({onClick, style, children}){

    return(
        <div className="skyBlueButtonContainer" style={style} onClick={onClick}>
            <h5 className="orangeButtonTitle">{children}</h5>
        </div>
    )
}
import React from 'react'
import './OrangeButton.css'
export default function OrangeButton({onClick, style, children}){

    return(
        <div className="orangeButtonContainer" style={style} onClick={onClick}>
            <h5 className="orangeButtonTitle">{children}</h5>
        </div>
    )
}
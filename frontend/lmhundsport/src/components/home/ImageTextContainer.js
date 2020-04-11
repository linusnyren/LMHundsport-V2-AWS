import React from 'react'
import './ImageTextContainer.css'
export default function ImageTextContainer({children, imageLeft, image}){

    if(imageLeft)
    return(
        <div className="containerLeft">
            <img className="image" src={image}/>
            <div className="descriptionContainer">
                <div className="description">
                    <p >
                        {children}
                    </p>
                </div>
            </div>

        </div>

    )
    else{
        return(
        <div className="containerRight">
            
            <div className="descriptionContainer">
                    <p className="description">
                        {children}
                    </p>
            </div>
            <img className="image" src={image}/>
            
        </div>
        )
    }
}
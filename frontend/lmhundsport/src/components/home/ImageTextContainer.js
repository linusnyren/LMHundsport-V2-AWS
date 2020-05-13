import React from 'react'
import './ImageTextContainer.css'
import { NeuDiv } from "neumorphism-react";
import color from '../../constants/color'
export default function ImageTextContainer({children, imageLeft, image}){

    if(imageLeft)
    return(
        <NeuDiv className="containerLeft" color={color.blue} distance={5}>
            <img className="image" src={image}/>
            <div className="descriptionContainer">
                <div className="description">
                    <p >
                        {children}
                    </p>
                </div>
            </div>

        </NeuDiv>

    )
    else{
        return(
        <NeuDiv className="containerRight" color={color.blue} distance={5}>
            
            <div className="descriptionContainer">
                    <p className="description">
                        {children}
                    </p>
            </div>
            <img className="image" src={image}/>
            
        </NeuDiv>
        )
    }
}
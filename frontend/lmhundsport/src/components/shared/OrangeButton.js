import React from 'react'
import './OrangeButton.css'
import { NeuButton } from "neumorphism-react";


export default function OrangeButton({onClick, style, children}){

    return(
        <NeuButton
            width="auto"
            style={{padding:'10px', margin:'10px'}}
            height="auto"
            onClick={onClick}
            color="#ff8201cf"
            distance={5}
        >
            {children}
        </NeuButton>
    )
}
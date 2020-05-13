import React from 'react'
import { NeuButton } from "neumorphism-react";


export default function({onClick, style, children, color}){

    return(
        <NeuButton
            width="auto"
            style={{padding:'10px', margin:'10px'}}
            height="auto"
            onClick={onClick}
            color={color}
            distance={5}
        >
            {children}
        </NeuButton>
    )
}
import React from 'react'
import {NeuTextInput} from "neumorphism-react"

export default function NeuInput({onChange, title, placeholder, color}){
    return(
        <div>
        <h5>{title}</h5>
        <NeuTextInput
            placeholder={placeholder}
            color={color}
            onChange={onChange}
            />
        </div>
    )
}
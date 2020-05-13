import React from 'react'
import './Header.css'
import { NeuDiv } from "neumorphism-react";
import color from '../../constants/color'
export default function Header(){

    return(
        <NeuDiv className="headerContainer" distance={5} color={color.blue}>
            <h1 className="headerWelcome">Välkommen till LMHundsport</h1>
            <em className="headerHeaderText">
            </em>
        </NeuDiv>
    )
}
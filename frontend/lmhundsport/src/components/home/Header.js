import React from 'react'
import './Header.css'
export default function Header(){

    return(
        <div className="headerContainer">
            <h1 className="headerWelcome">Välkommen till LMHundsport</h1>
            <em className="headerHeaderText">
                Här kommer det erbjudas bokning av bana och kurstillfällen
            </em>
        </div>
    )
}
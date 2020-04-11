import React from 'react'
import Header from '../../components/home/Header'
import ImageTextContainer from '../../components/home/ImageTextContainer'
import SkyBlueButton from '../../components/shared/SkyBlueButton'
import {useHistory} from "react-router-dom";
export default function Home(){
    const history = useHistory()
    return(
        <div>
            <Header/>
            <ImageTextContainer image={"https://www.zooplus.se/magasin/wp-content/uploads/2017/03/agility_3-1024x683.jpg"} imageLeft={true}>
                Jag erbjuder Agility träningar och bokning av bana
                <SkyBlueButton onClick={() => history.push("/activities")}>Bokning</SkyBlueButton>
            </ImageTextContainer>
            <ImageTextContainer 
                image={"https://agilityklubben.se/wp-content/uploads/2015/04/MG_2475.jpg"} 
                imageLeft={false}>
                Jag hjälper er ta agility till nästa nivå!
            </ImageTextContainer>
            <ImageTextContainer image={"https://www.zooplus.se/magasin/wp-content/uploads/2017/03/agility_3-1024x683.jpg"} imageLeft={true}>
                Jag erbjuder Agility träningar och bokning av bana
            </ImageTextContainer>
        </div>
    )
}
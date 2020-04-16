import React from 'react'
import Header from '../../components/home/Header'
import ImageTextContainer from '../../components/home/ImageTextContainer'
import SkyBlueButton from '../../components/shared/SkyBlueButton'
import {useHistory} from "react-router-dom";
import './Home.css'
export default function Home(){
    const history = useHistory()
    return(
        <div>
            
            <div className="flexContainer">
            <Header/>
            <ImageTextContainer image={"https://scontent.fgse1-1.fna.fbcdn.net/v/t1.0-9/12193637_10153782476872082_1608399300101219929_n.jpg?_nc_cat=106&_nc_sid=a9b1d2&_nc_ohc=dfKR-QR1m7MAX8Ggp02&_nc_ht=scontent.fgse1-1.fna&oh=0db822f8ccfa06c103801301271b53d2&oe=5EBD2C23"} imageLeft={true}>
                LM-Hundsport drivs av mig, Linn Magnusson. 
            </ImageTextContainer>
            <ImageTextContainer 
                image={"https://scontent.fgse1-1.fna.fbcdn.net/v/t31.0-8/12132664_10153223144737817_1202648832330438352_o.jpg?_nc_cat=100&_nc_sid=cdbe9c&_nc_ohc=gMJTmZxjdPUAX_b5I90&_nc_ht=scontent.fgse1-1.fna&oh=d7ac742da8036c2abbba9c497a1a62ba&oe=5EC0375E"} 
                imageLeft={false}>
                Kurser annonseras här med information kring nivå, datum och pris. 
            </ImageTextContainer>
            <ImageTextContainer image={"https://scontent.fgse1-1.fna.fbcdn.net/v/t1.0-9/65012581_455819261648456_1527682393597542400_n.jpg?_nc_cat=103&_nc_sid=8bfeb9&_nc_ohc=n6MNRkytvccAX81clNP&_nc_ht=scontent.fgse1-1.fna&oh=c9f064df848926675392d6d3a09dc923&oe=5EBD9A0F"} imageLeft={true}>
                Önskas privatträning går det alldeles utmärkt!
            </ImageTextContainer>
            </div>
        </div>
    )
}
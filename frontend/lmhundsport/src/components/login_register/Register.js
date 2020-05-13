import React, { useState } from 'react';
import axios from 'axios'
import endpoints from '../../constants/endpoints'
import { Auth } from 'aws-amplify';
import {Form, InputGroup} from 'react-bootstrap'
import OrangeButton from '../shared/OrangeButton'
import { NeuDiv } from "neumorphism-react";
import NeuInput from './NeuInput'
import NeuButton from '../shared/NeuButton'
import color from '../../constants/color'

export default function Register(){
    const [user, setUser] = useState({
        surname: null,
        givenName: null,
        email: null,
        phone: null, //"+46704174616"
        password: null
    })
    const [code, setCode] = useState(null)
    const [step, setStep] = useState(0)
    const testSignup=()=>{
        console.log(user)
        if(Object.values(user).some(x => (x !== null && x !== ''))){
            axios.post(endpoints.signup, user)
            .then(res => {
                if(res.status===200){
                    console.log(res)
                    setStep(1)
                }
                else{
                    alert("Något gick fel, kontakta linn på lmhundsport@hotmail.com")
                }
            })
        }
        else{
            alert('Alla fält måste vara ifyllda')
        }
    }
    
    const confirmSignup = () => {
        Auth.confirmSignUp(user.email, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        }).then(data => console.log(data))
          .catch(err => console.log(err));
        Auth.verifyCurrentUserAttributeSubmit("email", code)
        .then(() => {
            alert('Email verified')
        })
        .catch(e => alert('failed with error', e));
        Auth.signIn(user.email,user.password)
        .then(res => alert(res +" signed in!"))
    }
        return(
            <NeuDiv className="container" color={color.blue}>
                <h3>Registrering</h3>
                <NeuInput
                    placeholder="Linn"
                    title="Förnamn"
                    color={color.blue}
                    onChange={(e) => setUser(user, user.givenName=e)}
                />
                <NeuInput
                    placeholder="Magnusson"
                    title="Efternamn"
                    color={color.blue}
                    onChange={(e) => setUser(user, user.surname=e)}
                />
                <NeuInput
                    placeholder="Lmhundsport@hotmail.com"
                    title="Email"
                    color={color.blue}
                    onChange={(e) => setUser(user, user.email=e)}
                />
                <NeuInput
                    placeholder="+46704174616"
                    title="Telefon"
                    color={color.blue}
                    onChange={(e) => setUser(user, user.phone=e)}
                />
                <NeuInput
                    placeholder="SuperHemligt1"
                    title="Lösenord"
                    color={color.blue}
                    onChange={(e) => setUser(user, user.password=e)}
                /> 
                    {step === 0 ? 
                    <NeuButton color={color.blue} onClick={() => testSignup()}>
                        Registrera mig
                    </NeuButton>
                    :
                    <div>
                        <h5>Ange bekräftningskoden ni fick till er mail</h5>
                    <NeuInput
                        placeholder="xxxxxx"
                        title="Bekräftningskod"
                        color={color.blue}
                        onChange={(e) => setCode(e)}
                    />
                    <NeuButton color={color.blue} onClick={() => testSignup()}>
                        Bekräfta
                    </NeuButton>
                    </div>}
            </NeuDiv>
        )
    }


import React,{useState} from 'react'
import {useHistory} from "react-router-dom";
import {Form, Button} from 'react-bootstrap'
import { Auth } from 'aws-amplify';
import ResetPassword from '../ResetPassword'
import OrangeButton from '../shared/OrangeButton'
import axios from 'axios';
import { NeuDiv } from "neumorphism-react";
import NeuInput from '../shared/NeuInput'
import './Login.css'
import color from '../../constants/color'
import NeuButton from '../shared/NeuButton'
export default function Login(props){
    const history = useHistory()
    const [user, setUser] = useState({
        email: null,
        password: null
    })
    const [isLoading, setIsLoading] = useState(false)
    const [failed, setFailed] = useState(false)
    const login=()=>{
        setIsLoading(true)
        Auth.signIn(user.email,user.password)
        .then(res => {
            console.log(res)
            axios.defaults.headers.common['Authorisation'] = res.username;
            history.push('/')
            window.location.reload();
            setIsLoading(false)
        })
        .catch(err =>{
            console.log(err)
            if(err.message === "Incorrect username or password."){
                setFailed("Fel lösenord eller mailaddress")
            }
            setIsLoading(false)
        })

    }

    return(
        <NeuDiv className="container" color={color.blue}>
            <h3>Logga in</h3>
            <NeuInput
                placeholder="lmhundsport@hotmail.com"
                title="Mail"
                color={color.blue}
                onChange={(e) => setUser(user, user.email=e)}
            />
            <NeuInput
                placeholder="xxxx"
                title="Lösenord"
                color={color.blue}
                onChange={(e) => setUser(user, user.password=e)}
            />
        <NeuButton color={color.blue} onClick={() => login()}>Logga in</NeuButton>
        <NeuButton color={color.blue} onClick={() => setFailed(!failed)}>Glömt lösenord</NeuButton>
        {failed ? 
            <div>
                <h6>{failed}</h6>
                <ResetPassword setFailed={setFailed.bind(this)}/> 
            </div>
            : 
            <div/>}
        </NeuDiv>
    )
}
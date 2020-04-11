import React,{useState} from 'react'
import {useHistory} from "react-router-dom";
import {Form, Button} from 'react-bootstrap'
import { Auth } from 'aws-amplify';
import ResetPassword from '../ResetPassword'
import OrangeButton from '../shared/OrangeButton'
import axios from 'axios';
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
        <div>
        <Form>
            <Form.Group controlId="formBasicName">
            <Form.Label>Mail</Form.Label>
            <Form.Control type="email" placeholder="Mail@Mail.com" onChange={e => setUser(user, user.email=e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Lösenord</Form.Label>
                <Form.Control type="password" placeholder="Lösenord" onChange={e => setUser(user, user.password=e.target.value)}/>
            </Form.Group>
            <OrangeButton style={{margin:10}} onClick={() => login()}>{isLoading ? 'Loggar in dig...' : 'Logga in'}</OrangeButton>
        </Form>
        
        <OrangeButton  onClick={() => setFailed(!failed)}>Glömt lösenord</OrangeButton>
        {failed ? 
            <div>
                <h6>{failed}</h6>
                <ResetPassword setFailed={setFailed.bind(this)}/> 
            </div>
            : 
            <div/>}
        </div>
    )
}
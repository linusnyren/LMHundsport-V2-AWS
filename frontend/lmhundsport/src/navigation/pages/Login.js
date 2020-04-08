import React,{useState} from 'react'
import {Form, Button, Spinner} from 'react-bootstrap'
import { Auth } from 'aws-amplify';

export default function Login(){
    const [user, setUser] = useState({
        email: null,
        password: null
    })
    const [isLoading, setIsLoading] = useState(false)
    const [failed, setFailed] = useState(false)
    const login=()=>{
        setIsLoading(true)
        try{
        Auth.signIn(user.email,user.password)
        .then(res => {
            
            console.log(res)
            window.location.reload();
            setIsLoading(false)
        })
        }
        catch(err){
            console.log(err)
            setFailed(true)
        }
    }
    console.log('hej');
    return(
        <Form>
            <Form.Group controlId="formBasicName">
            <Form.Label>Mail</Form.Label>
            <Form.Control type="email" placeholder="Mail@Mail.com" onChange={e => setUser(user, user.email=e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Lösenord</Form.Label>
                <Form.Control type="password" placeholder="Lösenord" onChange={e => setUser(user, user.password=e.target.value)}/>
            </Form.Group>
            <Button onClick={() => login()}>{isLoading ? 'Loggar in dig...' : 'Logga in'}</Button>
            {failed ? <h6>Något gick fel, prova igen eller kontakta världens bästa programmerare</h6> : <div/>}
        </Form>
    )
}
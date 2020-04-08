import React,{useState} from 'react'
import {Form, Button, Spinner} from 'react-bootstrap'
import { Auth } from 'aws-amplify';

export default function ResetPassword({setFailed}){
    const[update, setUpdate]=useState({
        mail:null,
        code:null,
        password:null
    })
    const [step, setStep] = useState(0)
    const resetPassword=async()=>{
        Auth.forgotPassword(update.mail)
        .then(data => {
            console.log(data)
            setStep(1)
        })
        .catch(err => console.log(err));

    }
    const changePassword=async()=>{
        Auth.forgotPasswordSubmit(update.mail, update.code, update.password)
        .then(data => {
            console.log(data)
            setFailed(null)
        })
        .catch(err => console.log(err));
    }
    if(step===0){
    return(
            <Form>
                <Form.Group >
                <Form.Label>Vill du återställa ditt lösenord?</Form.Label>
                <Form.Control type="email" placeholder="Mail@Mail.com" onChange={e => setUpdate(update, update.email=e.target.value)}/>
                <Form.Text className="text-muted">
                      Ni kommer att få ett mail skickat med en återställningskod
                </Form.Text>
                </Form.Group>
                <Button onClick={() => resetPassword()}>Återställ lösenord</Button>
            </Form>
    )
    }
    if(step===1){
        return(
            <Form>
                <Form.Group controlId="formBasicName">
                <Form.Label>Ange koden ni fick till er mail ({update.email})</Form.Label>
                <Form.Control type="email" placeholder="Mail@Mail.com" onChange={e => setUpdate(update, update.code=e.target.value)}/>
                <Form.Text className="text-muted">
                      Hittar ni inte koden så kolla i skräpposten på er mail
                </Form.Text>
                <Form.Group controlId="formBasicPassword">
                <Form.Label>Ert nya lösenord</Form.Label>
                <Form.Control type="password" placeholder="Lösenord" onChange={e => setUpdate(update, update.password=e.target.value)}/>
                <Form.Text className="text-muted">
                      Lösenordet måste innehålla minst åtta tecken och en siffra
                </Form.Text>
            </Form.Group>
                </Form.Group>
                <Button onClick={() => changePassword()}>Återställ lösenord</Button>
            </Form>
        )
    }           
}
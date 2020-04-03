import React, { useState } from 'react';
import axios from 'axios'
import endpoints from '../constants/endpoints'
import { Auth } from 'aws-amplify';
import {Form, Button} from 'react-bootstrap'

export default function Register(){
    console.log(endpoints)
    const [user, setUser] = useState({
        surname: null,
        givenName: null,
        email: null,
        phone: null, //"+46704174616"
        password: null
    })
    const [step, setStep] = useState(0)
    const testSignup=()=>{
        setUser(user, user.phone = user.phone.replace("0", "+46"))
        console.log(user)
        if(Object.values(user).some(x => (x !== null && x !== ''))){
            axios.post(endpoints.signup, user)
            .then(res => {
                if(res.status===200){
                    console.log(res)
                    Auth.signIn(user.email, user.password)
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
    
    const confirmSignup = (code) => {
        Auth.confirmSignUp(user.email, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true    
        }).then(data => console.log(data))
          .catch(err => console.log(err));
        Auth.verifyCurrentUserAttributeSubmit("email", code)
        .then(() => {
            alert('Email verified')
        })
        .catch(e => alert('failed with error', e));
    }
    confirmSignup(198824)
    if(step === 1){
        return(
            <Form>
                <Form.Group controlId="formBasicName">
                      <Form.Label>Bekräftningskod</Form.Label>
                      <Form.Control type="email" placeholder="Linn" onChange={e => setUser(user, user.givenName=e.target.value)}/>
                      <Form.Text className="text-muted">
                          Ange bekräftningskoden ni fick till er mail, ni kan behöva kolla i skräpposten
                      </Form.Text>
                      <Button onClick={() => confirmSignup()}>Ok</Button>
                </Form.Group>
            </Form>
        )
    }
    if(step === 0){
        return(
            <div>
                <Form>
                    <Form.Group controlId="formBasicName">
                      <Form.Label>Förnamn</Form.Label>
                      <Form.Control type="email" placeholder="Linn" onChange={e => setUser(user, user.givenName=e.target.value)}/>
                      <Form.Text className="text-muted">
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicSurname">
                      <Form.Label>Efternamn</Form.Label>
                      <Form.Control type="email" placeholder="Magnusson" onChange={e => setUser(user, user.surname=e.target.value)}/>
                      <Form.Text className="text-muted">
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Lmhundsport@hotmail.com" onChange={e => setUser(user, user.email=e.target.value)}/>
                      <Form.Text className="text-muted">
                          Vi kommer att hålla er mail för oss själva
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPhone">
                      <Form.Label>Telefon</Form.Label>
                      <Form.Control type="email" placeholder="07********" onChange={e => setUser(user, user.phone=e.target.value)}/>
                      <Form.Text className="text-muted">
                          Ifall jag behöver komma i kontakt med er
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Lösenord</Form.Label>
                      <Form.Control type="password" placeholder="Lösenord" onChange={e => setUser(user, user.password=e.target.value)}/>
                      <Form.Text className="text-muted">
                          Minst åtta bokstäver med någon stor bokstav och siffra
                      </Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={() => testSignup()}>
                        Registrera mig
                    </Button>
                </Form>
            </div>
        )
    }
}


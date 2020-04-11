import React, { useState } from 'react';
import axios from 'axios'
import endpoints from '../../constants/endpoints'
import { Auth } from 'aws-amplify';
import {Form, InputGroup} from 'react-bootstrap'
import OrangeButton from '../shared/OrangeButton'

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
            <div>
                <Form>
                    <Form.Group controlId="formBasicRegisterName">
                      <Form.Label>Förnamn</Form.Label>
                      <Form.Control type="firstname" placeholder="Linn" onChange={e => setUser(user, user.givenName=e.target.value)}/>
                      <Form.Text className="text-muted">
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicSurname">
                      <Form.Label>Efternamn</Form.Label>
                      <Form.Control type="lastname" placeholder="Magnusson" onChange={e => setUser(user, user.surname=e.target.value)}/>
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
                    <Form.Group>
                      <Form.Label>Telefon</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">+46</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="phone" placeholder="7********" onChange={e => setUser(user, user.phone=e.target.value)}/>
                        </InputGroup>
                        <Form.Text>
                          Ifall jag behöver komma i kontakt med er
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Lösenord</Form.Label>
                      <Form.Control type="password" placeholder="Lösenord" onChange={e => setUser(user, user.password=e.target.value)}/>
                      <Form.Text className="text-muted">
                          Minst åtta bokstäver med någon stor bokstav och siffra
                      </Form.Text>
                    </Form.Group>
                    {step === 0 ? 
                    <OrangeButton onClick={() => testSignup()}>
                        Registrera mig
                    </OrangeButton>
                    :
                    <Form.Group>
                          <Form.Label>Bekräftningskod</Form.Label>
                          <Form.Control type="code" placeholder="xxxxxx" onChange={e => setCode(e.target.value)}/>
                          <Form.Text className="text-muted">
                              Ange bekräftningskoden ni fick till er mail, ni kan behöva kolla i skräpposten
                          </Form.Text>
                          <OrangeButton onClick={() => confirmSignup()}>Ok</OrangeButton>
                    </Form.Group>}
                </Form>
            </div>
        )
    }


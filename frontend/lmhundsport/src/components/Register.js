import React, { useState } from 'react';
import axios from 'axios'
import endpoints from '../constants/endpoints'
import { Auth } from 'aws-amplify';
export default function Register(){
    console.log(endpoints)
    const [user, setUser] = useState({
        surname: null,
        givenName: null,
        email: null,
        phone: null, //"+46704174616"
        password: null
    })
    const testSignup=()=>{
        if(Object.values(user).some(x => (x !== null && x !== ''))){
            axios.post(endpoints.signup, user)
            .then(res => console.log(res))
        }
        else{
            alert('Alla fält måste vara ifyllda')
        }
    }
    return(
        <div>
            <button onClick={() => testSignup()}>Testa</button>
            <h1>Register</h1>
        </div>
    )
}


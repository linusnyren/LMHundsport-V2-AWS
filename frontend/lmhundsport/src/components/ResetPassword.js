import React,{useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import { Auth } from 'aws-amplify';
import NeuInput from './shared/NeuInput'
import NeuButton from './shared/NeuButton'
import color from '../constants/color'
export default function ResetPassword({setFailed}){
    const[update, setUpdate]=useState({
        mail:null,
        code:null,
        password:null
    })
    const [step, setStep] = useState(1)
    const resetPassword=async()=>{
        console.log(update.mail)
        Auth.forgotPassword(update.mail)
        .then(data => {
            console.log(data)
            setStep(1)
        })
        .catch(err => alert(err.message));

    }
    const changePassword=async()=>{
        Auth.forgotPasswordSubmit(update.mail, update.code, update.password)
        .then(data => {
            console.log(data)
            alert("Lösenord ändrat, ni dirigeras till login sidan")
            setFailed(null)
        })
        .catch(err => alert(err.message));
    }
    if(step===0){
    return(
        <div>
            <NeuInput
                placeholder="Mail@Mail.com"
                title="Vill du återställa ditt lösenord?"
                color={color.blue}
                onChange={(e) => setUpdate(update, update.mail=e.target.value)}
            />
            <NeuButton 
                onClick={() => resetPassword()}
                color={color.blue}>Återställ lösenord</NeuButton>
        </div>
    )
    }
    if(step===1){
        return(
            <div>
            <NeuInput
                placeholder="xxxxxx"
                title="Ange koden ni fick till er mail"
                color={color.blue}
                onChange={(e) => setUpdate(update, update.code=e.target.value)}
            />
            <NeuInput
                placeholder="Ert nya lösenord"
                title="Ert nya lösenord"
                color={color.blue}
                onChange={(e) => setUpdate(update, update.password=e.target.value)}
            />
            <NeuButton onClick={() => changePassword()} color={color.blue}>Återställ lösenord</NeuButton>               
            </div>
        )
    }           
}
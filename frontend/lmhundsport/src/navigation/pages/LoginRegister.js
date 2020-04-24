import React from 'react'
import Register from '../../components/login_register/Register'
import Login from '../../components/login_register/Login'
import './LoginRegister.css'

export default function LoginRegister(){

    return(
        <div className="LoginRegistercontainer">
            <div className="form">
                <Login />
            </div>
            <div className="form">
                <Register />
            </div>
        </div>

    )
}
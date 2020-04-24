import React, { useState} from 'react';
import {useHistory} from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import {Form, Modal, Button} from 'react-bootstrap'
import * as moment from 'moment'
import { Auth } from "aws-amplify";
import './Activities.css'
import OrangeButton from '../../components/shared/OrangeButton';
export default function Activities(){
    const [startDate, setStartDate] = useState(new Date());
    const [duration, setDuration] = useState(0);
    const [type, setType] = useState();
    const [show, setShow] = useState(false)
    const history = useHistory()
    const submit=async()=>{
        let user= await getLoggedInUser()
        if(user){
            let obj ={
                user: user.username,
                type:type,
                start:moment(startDate).unix(),
                end:getEndDate().unix()
            }
            alert(JSON.stringify(obj))
        }
        else{
            setShow(true)
        }

    }
    const getEndDate=()=>{
        return moment(startDate).add(duration,'hours')
    }
    const getLoggedInUser=async()=>{
        try{
            let user = await Auth.currentAuthenticatedUser()
            if(user.attributes){
              return user
            }
        }
        catch(err){
            console.log(err)
        }
    }
    const sendToLogin=()=>{
        
        console.log("login")
        history.push('/loginregister')
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <div>
        <div className="container">
            <div className="picker">
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <h4>Bokningstyp</h4>
                    <Form.Control as="select" onChange={e => setType(e.target.value)}>
                        <option>Banhyra</option>
                        <option>Privatkurs</option>
                    </Form.Control>
                </Form.Group>
                </div>
                <div className="picker">
                    <h4>Start</h4>
                    <DateTimePicker
                      onChange={e => setStartDate(e)}
                      format="y-MM-dd HH:mm "
                      value={startDate ? startDate : new Date()}
                      returnValue="start"
                    />
                </div>
                <div className="picker">
                    <h4>Längd</h4>
                    <Form.Control as="select" onChange={e => setDuration(e.target.value)}>
                        <option value="0">Välj längd</option>
                        <option value="1">1h</option>
                        <option value="1.5">1.5h</option>
                        <option value="2">2h</option>
                    </Form.Control>
                </div>
                <div className="picker">
                <h5>Sammanfattning</h5>
                <p>Typ: {type}</p>
                <p>Start: {moment(startDate).format("D[/]M , HH:mm")}</p>
                <p>Slut: {getEndDate().format("D[/]M , HH:mm")}</p>
                <OrangeButton onClick={() => submit()}>Boka</OrangeButton>
                </div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ej inloggad</Modal.Title>
        </Modal.Header>
        <Modal.Body>För att kunna boka en bana eller kurs krävs det att ni är inloggad</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Stäng
          </Button>
          <Button variant="primary" onClick={()=> sendToLogin()}>
            Till inloggning
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
}
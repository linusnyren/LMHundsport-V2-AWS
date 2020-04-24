import React, { useState} from 'react';
// import {DropdownButton, Dropdown} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import {Form, InputGroup, Button, FormControl } from 'react-bootstrap'
import * as moment from 'moment'
import './AddEvent.css'
export default function AddEvent(){
    const [startDate, setStartDate] = useState();
    const [duration, setDuration] = useState();
    const [type, setType] = useState();

    const submit=()=>{
        let start = moment().unix()
    }

    return(
        <div className="container">
            <div className="picker">
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Bokningstyp</Form.Label>
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
                    <h4>Slut</h4>
                    <Form.Control as="select" onChange={e => setDuration(e.target.value)}>
                        <option>1</option>
                        <option>2</option>
                    </Form.Control>
                </div>
                <div className="picker">
                <h5>Sammanfattning</h5>
                <p>Typ: {type}</p>
                <p>Start: {moment(startDate).format("MMMM Do YYYY, HH:mm")}</p>
                <p>Slut: {moment(startDate).add(moment(startDate).hours()+duration, 'hours').format("MMMM Do YYYY, HH:mm")}</p>
                </div>
        </div>
    )
}
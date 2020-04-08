import React, { useState,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
// import {DropdownButton, Dropdown} from 'react-bootstrap';

import "react-datepicker/dist/react-datepicker.css";

export default function Activities() {
  const [startDate, setStartDate] = useState(null);
  useEffect(() => {
    setStartDate(new Date().getUTCMilliseconds())
  }, [])

  console.log(startDate)
  return (
    <div>
      {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton> */}
      <DatePicker 
        selected={startDate} 
        onChange={date => setStartDate(date)}
        showTimeSelect
        minTime={setHours(setMinutes(new Date(), 0), 17)}
        maxTime={setHours(setMinutes(new Date(), 30), 20)}
        dateFormat="d MMMM, yyyy HH:mm"
        
      />
      <h1>{JSON.stringify(startDate)}</h1>
      
    </div>
  );
};
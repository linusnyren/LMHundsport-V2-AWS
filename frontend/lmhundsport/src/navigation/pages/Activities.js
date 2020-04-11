import React, { useState} from 'react';
// import {DropdownButton, Dropdown} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';

export default function Activities() {
  const [startDate, setStartDate] = useState();

  // const testActivity = () => {
  //   console.log(startDate)
  //   axios.post(endpoints.postactivity, startDate)
  //   .then(res => {
  //     if(res.status===200){
  //       console.log(res)
  //     } else {
  //       alert("Något gick fel, kontakta linn på lmhundsport@hotmail.com")
  //     }
  //   })

  // }
  //use react moment  
  return (
    <div>
        <DateTimePicker
          onChange={e => setStartDate(e)}
          format="y-MM-dd HH:mm "
          value={startDate ? startDate : new Date()}
          returnValue="start"
        />
    </div>
  );
};
import React, { useState} from 'react';
// import {DropdownButton, Dropdown} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';

export default function Activities() {
  const [startDate, setStartDate] = useState();
  
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
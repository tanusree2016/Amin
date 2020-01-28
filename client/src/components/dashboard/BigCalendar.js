import React,{Component} from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Segment } from 'semantic-ui-react';

 const myEventsList = [];
const localizer = momentLocalizer(moment)
 
const BigCalendar = props => (
   
    <div className="rbc-calendar">
  
        
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
   
  </div>
)

export default BigCalendar;
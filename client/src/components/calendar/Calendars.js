import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import BigCalendar from './BigCalendar';
import Tabs from './Tabs'
export default class Calendars extends Component {
    render() {
        return (

            <div style={{padding:"10px"}}>
                <div style={{ height:"60px",background:"rgb(240, 114, 135)",borderRadius:"10px 10px 0 0"}}>
                    <h3 style={{padding:"15px",color : "white"}}>Calendar</h3>
                 
                </div>
                <div style={{padding:"5px", background:"white"}}>
                {/* <BigCalendar /> */}
                <Tabs/>

                </div>
                
            </div>



        )
    }
}
import React, { Component } from 'react';
import { Segment, Grid, Button,Dropdown } from 'semantic-ui-react';
import NotesTab from './NotesTab'

export default class Calendars extends Component {
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "60px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
               
                 <text style={{ color: "white" }}><h3>Notes</h3></text>
                </div>
                <div style={{ padding: "5px", background: "white" }}>
                    <div >
                        <NotesTab/>
                     
                    </div>




                </div>

            </div>



        )
    }
}
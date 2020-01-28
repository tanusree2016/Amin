import React, { Component } from 'react';
import { Segment, Grid, Button,Dropdown } from 'semantic-ui-react';


export default class Calendars extends Component {
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "70px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
                    <Button style={{ float: "right", }}>Add Workflow</Button>
                    <text style={{ float: "right" }}></text>
                 
                    <text style={{ float: "right" }}></text>
                    <text style={{ float: "right" }}></text><text style={{ color: "white" }}><h3>Workflow</h3></text>
                    <text style={{ fontSize:"12px",color:"white"}}>Set Office Hours</text>
                </div>
                <div style={{ padding: "5px", background: "white" }}>
                    <div >
                     
                    </div>




                </div>

            </div>



        )
    }
}
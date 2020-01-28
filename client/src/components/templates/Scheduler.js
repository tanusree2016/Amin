import React, { Component } from 'react';
import { Segment, Grid, Button,Dropdown } from 'semantic-ui-react';
import SchedulerTab from './scheduler/SchedulerTab'
import AddTemplateModal from './scheduler/AddTemplateModal'

export default class Calendars extends Component {
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "70px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
                    <text style={{ float: "right", }}><AddTemplateModal/> </text>
                    <text style={{ float: "right" }}></text>
                 
                    <text style={{ float: "right" }}></text>
                    <text style={{ float: "right" }}></text><text style={{ color: "white" }}><h3>Schedulers</h3></text>
                    <text style={{ fontSize:"12px",color:"white"}}>View, edit, and create scheduler templates</text>
                </div>
                <div style={{ padding: "5px", background: "white" }}>
                    <div >
                        <SchedulerTab />
                    </div>




                </div>

            </div>



        )
    }
}
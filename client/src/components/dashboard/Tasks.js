import React, { Component } from 'react';
import { Segment, Grid, Button,Dropdown } from 'semantic-ui-react';
import AddTaskModal from './AddTaskModal'

import MyTaskSortTable from './MyTaskSortTable'

const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
  ]
  
export default class Calendars extends Component {
    render() {
        return (

            <div >
                <div style={{ height: "60px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
                    <Button style={{ float: "right", border: "1px solid grey", borderRadius: "5px", padding: "0px", height: "30px" }}> <AddTaskModal /></Button>
                   
                  <text style={{ color: "white" }}><h3>Tasks</h3></text>
                </div>
                <div style={{  background: "white" }}>
               
                        <MyTaskSortTable />
               




                </div>

            </div>



        )
    }
}
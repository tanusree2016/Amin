import React, { Component } from 'react';
import { Segment, Grid, Button,Dropdown } from 'semantic-ui-react';
import AddTaskModal from './AddTaskModal'
import AddBoardModal from './AddBoardModal'
import TaskTabs from './TaskTabs'
import AllTaskDropdownInput from './AllTaskDropdownInput'
import MyTaskDropdownInput from './MyTaskDropdownInput'
import BoardDropdownInput from './BoardDropdownInput'
const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
  ]
  
export default class Calendars extends Component {
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "60px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
                    <Button style={{ float: "right" }} size="mini"> <AddTaskModal /></Button>
                    <Button style={{ float: "right" }} size="mini"><BoardDropdownInput /></Button>
                    <Button.Group style={{ float: "right" }} size="mini">
                    <Button size="mini"> <AddBoardModal /></Button>
                        <Dropdown
                            className='button icon'
                            floating
                            options={options}
                            trigger={<React.Fragment />}
                            
                        />
                    </Button.Group>
                    <text style={{ float: "right" }}><AllTaskDropdownInput /></text>
                    <text style={{ float: "right" }}><MyTaskDropdownInput /></text><text style={{ color: "white" }}><h3>Tasks</h3></text>
                </div>
                <div style={{ padding: "5px", background: "white" }}>
                    <div >
                        <TaskTabs />
                    </div>




                </div>

            </div>



        )
    }
}
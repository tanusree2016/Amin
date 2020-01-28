import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Divider, Image, Icon, Form, Input } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';
import UserTabs from './UserTabs'
const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

export default class Calendars extends Component {
    render() {
        return (

            <div style={{ background: "white", borderRadius: "10px 10px 0 0" }}>
                <div style={{ height: "70px", background: "white", borderRadius: "10px 10px 0 0", padding: "10px" }}>
                    <div style={{ padding: "10px" }}>
                        <text style={{ fontSize: "25px" }}>Multi Users</text><br />
                        <text>Manage your users and teams on your brand.</text>
                    </div>
                </div>
                <Divider></Divider>
                <div style={{ padding: "20px", background: "white" }}>
                    <div >
                       <UserTabs/>
                    </div>




                </div>

            </div>



        )
    }
}
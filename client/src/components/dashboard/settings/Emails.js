import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Divider, Image, Icon, Form, Input } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';

const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

export default class Emails extends Component {
    render() {
        return (

            <div style={{ background: "white", borderRadius: "10px 10px 0 0" }}>
                <div style={{ height: "70px", background: "white", borderRadius: "10px 10px 0 0", padding: "10px" }}>
                    <div style={{ padding: "10px" }}>
                        <text style={{ fontSize: "25px" }}>Email Settings</text><br />
                        <text>Setup your outgoing/incoming mail settings here.</text>
                    </div>
                </div>
                <Divider></Divider>
                <div style={{ padding: "20px", background: "white" }}>
                    <div  style={{ textAlign:"center"}}>
                    <Button attached='left' color='white' style={{border:"1px solid grey"}}>
                            <Icon name='google' />
                        </Button>
                        <Button attached='right' color='facebook' style={{border:"1px solid grey"}}>
                             Sign in with Google
                        </Button><br/>
                       <text ><b>Use SMTP</b></text>
                    </div>
                    <Divider></Divider>

                    <text style={{ fontSize: "25px",color:"grey"  }}>Incoming Emails</text><br />
                        <text style={{ fontSize: "13px" }}>
In order to receive emails from non-Gmail/Gsuite accounts, forward your email address to the address below.</text><br/><br/>
<text>Dubsado will capture emails from clients who are in your Dubsado Address Book as well as any reply to an email you send from within Dubsado.

</text><br/><br/>

<text><b>Brand Email address </b></text><text style={{ fontSize: "13px" }}>Copy this into your forwarding settings in your email account.</text><br/><br/>
<Input fluid placeholder="5d652d9b313d4f69f68b1bb2@replies.dubsado.com" /><br/>

<text><b>Forwarding Verification Code</b></text><Icon name="sync alternate"/><text style={{ fontSize: "13px" }}>Copy this code and paste into your forwarding settings. (If required)</text><br/><br/>

<Input fluid /><br/>
                </div>

            </div>



        )
    }
}
import React, { Component } from 'react';
import { Popup, Dimmer, Loader, Menu, Sidebar, Segment, Icon, Dropdown, Breadcrumb, Input, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
//import {Image1} from './logo.png'

const trigger = (userName) => (
    <span>
        <Icon name='user' style={{ color: "#932626" }} /> Hello, {userName}
    </span>
)
export default class Dashboard extends Component {

    state = {
        visible: false,
        icon: true,
        loading: true,
        userName: "",
        role: ""
    };



    render() {
        return (
            <div >
                <Segment basic attached="top"   >
                    <Menu size="large" icon fixed="top" style={{ height: '90px', background: "#ddd", borderBottom: "2px solid #932626" }} borderless >
                        {/* <Menu.Item icon  style={{ width: '60px' }}>
                            <Icon name="sidebar" style={{ margin: 'auto' }} />
                        </Menu.Item> */}
                        <Menu.Item header >
                            {/* <img src="/assets/logo1.png" className alt="" style={{ width: "184px", height: "65px" }} /> */}
                        </Menu.Item>
                        <Menu.Item header >

                        </Menu.Item>
                        {/* <Menu.Item header >
                            <Input action={{ icon: 'search', color: "grey" }} inverted placeholder='Search...' />
                        </Menu.Item> */}
                        {/* <Menu.Item header >

                            <Popup
                                content={<div style={{ width: "300px", padding: "10px", background: "pink" }}>
                                    <label><b>Notification</b></label><br />
                                    <hr />
                                    No unread alerts. This is where recently completed forms, or paid invoices, or signed contracts will be so you can click into them quickly.
        <hr />

                                </div>}
                                on='click'

                                position='bottom center'
                                trigger={<Icon name="bell" className="menuitem" />}

                            />
                        </Menu.Item> */}
                        {/* <Menu.Item header >
                            <Icon name="envelope" className="menuitem" />
                        </Menu.Item> */}

                        <Menu.Menu position="right">

                            {/* <Menu.Item header >
                                <Link to="/settings" style={{ color: "black" }}><Icon name="cog" style={{ color: "#932626" }} /></Link>

                            </Menu.Item> */}
                            <Menu.Item>
                                <Dropdown style={{ color: "#932626" }} trigger={trigger(this.state.userName)} options={
                                    [
                                        {
                                            key: 'user',
                                            text: (
                                                <span>
                                                    Signed in as <strong>{this.state.userName}</strong>
                                                </span>
                                            ),
                                            disabled: true,
                                        },
                                        { key: 'profile', text: 'Your Profile' },
                                        (<Dropdown.Item key='sign-out' >Sign Out</Dropdown.Item>),
                                    ]
                                } />
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                </Segment>
            </div>

        )
    }
}



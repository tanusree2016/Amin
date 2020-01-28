import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Divider, Image, Icon, Form, Input } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';
import Country from './Country'
import TimeZone from './TimeZone'

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
                    <div style={{ padding: "10px" }}><Button style={{ float: "right", }}>Save</Button>
                        <text style={{ fontSize: "25px" }}>International Settings</text><br />
                        <text>Adjust your time, location, and currency settings.</text>
                    </div>
                </div>
                <Divider></Divider>
                <div style={{ padding: "20px", background: "white" }}>
                    <div >
                        <Grid columns='equal'>

                            <Grid.Column width={10}>
                                <div>
                                    <text>Time Zone</text><br /><br />

                                    <TimeZone /><br /><br />

                                    <text>Locale Settings</text><br /><br />
                                    <text style={{ fontSize: "12px" }}>This will effect date formatting and currency symbols. We do not presently allow for billing in multiple currencies.</text>
                                    <br/><br/>
                                    <Country /><br/>

                                    <label><b>Override the default currency symbol from the provided from above</b></label><br/>

                                    <Input style={{width:"20%"}}/>

                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div>
                                <text>Example Output</text><br /><br />
                                <text><b>Date : </b>  Wednesday, October 23, 2019</text><br /><br />
                                <text><b>Currency:</b> $5,000.24</text><br /><br />
                                </div>
                            </Grid.Column>
                        </Grid>
                    </div>




                </div>

            </div>



        )
    }
}
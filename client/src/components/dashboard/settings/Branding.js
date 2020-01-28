import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Divider, Image, Icon, Form, Input } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';
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
                        <text style={{ fontSize: "25px" }}>Brand Specific Settings</text><br />
                        <text>Adjust how your brand appears to your clients.</text>
                    </div>
                </div>
                <Divider></Divider>
                <div style={{ padding: "20px", background: "white" }}>
                    <div >
                        <Grid>
                            <Grid.Row centered columns={3}>
                                <Grid.Column>
                                    <text>Uplod Logo</text><br /><br />
                                    <div >
                                        <div style={{ width: "200px", height: "150px", border: "1px solid #ccc", borderRadius: "5px" }}>
                                            <Image src='/images/wireframe/image.png' />
                                        </div>
                                        <div style={{ paddingTop: "5px" }}></div>
                                        <Button secondary style={{ width: "200px" }}><Icon name="pencil alternate" /> </Button>
                                    </div>


                                </Grid.Column>
                                <Grid.Column>
                                    <text>Brand Info</text><br /><br />

                                    {/* <Button><SketchPicker /></Button> */}
                                    <label><b>Color (form/link buttons)</b></label>
                                    <input type="color" style={{ width: "230px" }} />


                                    <Form>
                                        <Form.Group widths='equal'>
                                            <Form.Field
                                                id='form-input-control-first-name'
                                                control={Input}
                                                label='Name'
                                                placeholder='Name'
                                            />
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Field

                                            >
                                                <label>Notification Email</label>
                                                <text style={{ fontSize: "12px" }}>Email where you would like to receive Dubsado alerts and notifications</text>
                                                <input placeholder='Business email address' />
                                            </Form.Field>
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Field
                                                id='form-input-control-first-name'
                                                control={Input}
                                                label='Phone'
                                                placeholder='Business phone number'
                                            />
                                        </Form.Group>
                                        <Form.Group grouped>
                                            <label>Email From Name:</label><br />
                                            <text>Your name : <b>sdffdgfg</b></text>
                                            <Form.Field
                                                label='This one'
                                                control='input'
                                                type='radio'
                                                name='htmlRadios'

                                            />
                                            <text>Your business : <b>sdffdgfg</b></text>
                                            <Form.Field
                                                label='That one'
                                                control='input'
                                                type='radio'
                                                name='htmlRadios'
                                            />
                                        </Form.Group>
                                    </Form>
                                </Grid.Column>
                                <Grid.Column>
                                    <text>Address</text><br /><br />

                                    <Form>

                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Street</label>
                                                <input placeholder='Business email address' /><br /><br />
                                                <input placeholder='Business email address' />
                                            </Form.Field>
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Field
                                                id='form-input-control-first-name'
                                                control={Input}
                                                label='City'
                                                placeholder='City'
                                            />
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Field
                                                id='form-input-control-first-name'
                                                control={Input}
                                                label='State/Prov.'
                                                placeholder='State/Prov.'
                                                style={{width:"105px"}}
                                            />
                                              <Form.Field
                                                id='form-input-control-first-name'
                                                control={Input}
                                                label='Zip/Postal'
                                                placeholder='Zip/Postal'
                                                style={{width:"105px"}}
                                            />
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Field
                                                id='form-input-control-first-name'
                                                control={Input}
                                                label='Country'
                                                placeholder='India'
                                            />
                                        </Form.Group>

                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>




                </div>

            </div>



        )
    }
}
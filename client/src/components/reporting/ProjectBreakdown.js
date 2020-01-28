import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Input, Divider, Icon, Popup, Checkbox } from 'semantic-ui-react';
import Tabs from './projectbreakdown/Tabs'

const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

const tagOptions = [
    {
        key: 'Important',
        text: 'Important',
        value: 'Important',
        label: { color: 'red', empty: true, circular: true },
    },
    {
        key: 'Announcement',
        text: 'Announcement',
        value: 'Announcement',
        label: { color: 'blue', empty: true, circular: true },
    },
    {
        key: 'Cannot Fix',
        text: 'Cannot Fix',
        value: 'Cannot Fix',
        label: { color: 'black', empty: true, circular: true },
    },
    {
        key: 'News',
        text: 'News',
        value: 'News',
        label: { color: 'purple', empty: true, circular: true },
    },
    {
        key: 'Enhancement',
        text: 'Enhancement',
        value: 'Enhancement',
        label: { color: 'orange', empty: true, circular: true },
    },
    {
        key: 'Change Declined',
        text: 'Change Declined',
        value: 'Change Declined',
        label: { empty: true, circular: true },
    },
    {
        key: 'Off Topic',
        text: 'Off Topic',
        value: 'Off Topic',
        label: { color: 'yellow', empty: true, circular: true },
    },
    {
        key: 'Interesting',
        text: 'Interesting',
        value: 'Interesting',
        label: { color: 'pink', empty: true, circular: true },
    },
    {
        key: 'Discussion',
        text: 'Discussion',
        value: 'Discussion',
        label: { color: 'green', empty: true, circular: true },
    },
]

export default class ProjectBreakdown extends Component {
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "80px", padding: "15px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>

                    <text style={{ fontSize: "25px", color: "white" }}>Project Breakdown</text>
                </div>
                <div style={{ padding: "20px", background: "white" }}>

                    <text>View results from:</text><br /><br />




                    <Grid columns='equal'>
                        <Grid.Row>
                            <Grid.Column width={10}>
                                <Tabs />
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <div style={{ paddingTop: "37px" }}>
                                    <div style={{ paddingLeft: "265px" }}>

                                        

                                        <Popup
                                            content={<div style={{ width: "300px", height: "120px", padding: "20px" }}>
                                                <text><b>View by source:</b></text><br/><br/>
                                                <Dropdown
                                                text='Filters'
                                                placeholder='I close on blur'
                                                floating
                                                labeled
                                                input
                                                className='icon'
                                                selection
                                               

                                            >
                                                <Dropdown.Menu>
                                                    <Input icon='search' iconPosition='left' className='search' />
                                                    <Dropdown.Divider />
                                                    <Dropdown.Header>
                                                        <Checkbox label="sfdsfd"/><br/><br/>
                                                        <Checkbox label="sfdsfd"/>
                                                    </Dropdown.Header>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Header>
                                                      <Button>Uncheck All</Button>
                                                    </Dropdown.Header>
                                                </Dropdown.Menu>
                                            </Dropdown><br/><br/>

                                            <Button primary style={{float:"right"}}>Done</Button><Button secondary style={{float:"right"}}>Cancel</Button>
 
                                            </div>}
                                            on='click'

                                            position='left center'
                                            trigger={<Button>Filter &nbsp;<Icon name="filter"/></Button>}

                                        />

                                    </div>

                                    <Segment style={{ height: "425px", textAlign: "center" }}>
                                        <text><b>Projects by Source</b></text>
                                        <br /><Divider></Divider> <br /> <br /> <br /> <br /> <br /> <br /><br /> <br /> <br />
                                        <text style={{ fontSize: "12px" }}>Total Projects:</text><br />
                                        <h3>0</h3>
                                        <Icon name="circle" size="tiny" color="orange" />  <text style={{ fontSize: "12px" }}> fdgfg</text><br />
                                        <Icon name="circle" size="tiny" color="blue" />  <text style={{ fontSize: "12px" }}> fdgfg</text>


                                    </Segment>
                                </div>


                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Segment style={{ height: "150px", padding: "15px" }} >
                                    <Button circular color='#e6faff' icon='user outline' style={{ background: "#ccffff", color: "#00ffff" }} />
                                    <Popup
                                        trigger={<Icon name="question circle" style={{ float: "right", color: "#ddd" }} />}
                                        content='Way off to the left'
                                        offset=''
                                        position='left center'
                                    /><br /><br />
                                    <text style={{ fontSize: "30px" }}>0</text><br />
                                    <text style={{ fontSize: "13px" }}>Avg. Projects/Week</text>

                                </Segment>

                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Segment style={{ height: "150px" }}>
                                    <Button circular icon='usd' style={{ background: "#ccffeb", color: "#00ff99" }} />
                                    <Popup
                                        trigger={<Icon name="question circle" style={{ float: "right", color: "#ddd" }} />}
                                        content='Way off to the left'
                                        offset=''
                                        position='left center'
                                    /><br /><br />
                                    <text style={{ fontSize: "30px" }}>$ 0.00</text><br />
                                    <text style={{ fontSize: "13px" }}>From Booked Projects</text>

                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Segment style={{ height: "150px", textAlign: "center", padding: "40px" }}>
                                    <h2>Coming Soon!</h2>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>




                </div>

            </div>



        )
    }
}
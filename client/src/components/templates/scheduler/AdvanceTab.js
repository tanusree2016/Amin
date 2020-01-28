import React, { Component } from 'react'
import { Accordion, Form, Menu, Icon, Divider, Popup, Grid, Checkbox, Button,Input,Dropdown } from 'semantic-ui-react'

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

const options1 = [
    { key: '.com', text: '.com', value: '.com' },
    { key: '.net', text: '.net', value: '.net' },
    { key: '.org', text: '.org', value: '.org' },
]
const ColorForm = (
    <Form>
        <Form.Group grouped>
            <Form>
                <Form.Field>
                    <label><b>Welcoming message</b>&nbsp;
                            <Popup
                            trigger={<Icon name="question circle outline" />}
                            content='Overrides default brand logo for portal login page and banner'
                            position='right center'
                        />
                    </label>
                    <input value="Book Your Free Consultation Today!" />
                </Form.Field>

                <label><b>Confirmation Email</b>&nbsp;
                            <Popup
                        trigger={<Icon name="question circle outline" />}
                        content='Overrides default brand logo for portal login page and banner'
                        position='right center'
                    />
                </label>
                <Form.Select
                    fluid

                    options={options}
                    placeholder='Select canned response'
                />

                <label><b>Additional form</b>&nbsp;
                            <Popup
                        trigger={<Icon name="question circle outline" />}
                        content='Overrides default brand logo for portal login page and banner'
                        position='right center'
                    />
                </label>
                <Form.Select
                    fluid

                    options={options}
                    placeholder='Add a new form'
                />
            </Form>


        </Form.Group>
    </Form>
)

const SizeForm = (
    <Form>
        <Form.Group grouped>
            <label><b>Prevention</b></label><br />
            <text>Prevent booking less than</text> &nbsp;<input value="12" style={{ width: "50px", height: "20px" }} />&nbsp;<text>hours in advance</text><br /><br />
            <label><b>Buffer time</b></label><br />
            <text>Create a</text> &nbsp;<input value="0" style={{ width: "50px", height: "20px" }} />&nbsp;<text>minute window before and</text>
            &nbsp;<input value="15" style={{ width: "50px", height: "20px" }} />&nbsp;<text>minute window after the appointment</text>
            <br /> <br />
            <label><b>Increments</b>&nbsp;
                            <Popup
                    trigger={<Icon name="question circle outline" />}
                    content='Overrides default brand logo for portal login page and banner'
                    position='right center'
                />
            </label><br />
            <text>Display available time slot in increments of</text> &nbsp;<input value="30" style={{ width: "50px", height: "20px" }} />&nbsp;<text>min</text><br /><br />
            <label><b>Appointment details</b></label><br />
            <text>Allow maximum</text> &nbsp;<input value="3" style={{ width: "50px", height: "20px" }} />&nbsp;<text>appointments per day</text><br /><br />

            <text>Allow this scheduler to be used</text> &nbsp;<input style={{ width: "50px", height: "20px" }} />&nbsp;<text>time(s)&nbsp;
              <Popup
                    trigger={<Icon name="question circle outline" />}
                    content='Overrides default brand logo for portal login page and banner'
                    position='right center'
                />
            </text><br />

        </Form.Group>
    </Form>
)

const SizeForm1 = (
    <Form>
        <Form.Group grouped>

            <label><b>Invoice</b>&nbsp;
                            <Popup
                    trigger={<Icon name="question circle outline" />}
                    content='Overrides default brand logo for portal login page and banner'
                    position='right center'
                />
            </label><Checkbox toggle style={{ float: "right" }} /><br />
            <text>Toggle on to require deposit to secure booking</text><br /><br />
            <label><b>Notification</b></label> <Checkbox toggle style={{ float: "right" }} /><br />
            <text>Toggle on to set up reminder notification email</text> &nbsp;<br /><br />
            <div style={{ padding: "20px" }}>
                <Grid>
                    <Grid.Row columns={3}>
                        <Grid.Column width={4}>
                            <text><b>Time prior</b></text>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <text><b>Email</b></text>
                        </Grid.Column>
                        <Grid.Column width={4} style={{ float: "right" }}>
                            <text style={{ float: "right" }}><b>Action</b></text>
                        </Grid.Column>

                    </Grid.Row>
                    <Divider></Divider>
                    <Grid.Row columns={3}>
                        <Grid.Column width={4}>
                            <text>1 hours</text>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <text>Your Upcoming Appointment with [brand.name]</text>
                        </Grid.Column>
                        <Grid.Column width={4} >
                            <Icon name="trash" style={{ float: "right" }} /><Icon name="pencil" style={{ float: "right" }} />
                        </Grid.Column>

                    </Grid.Row>

                    <Grid.Row columns={3}>
                        <Grid.Column width={3}>
                            <Input
                                label={<Dropdown defaultValue='.com' options={options} />}
                                labelPosition='right'
                                placeholder='Find '
                            />
                        </Grid.Column>
                      
                      
                        <Grid.Column width={8}>
                            <text style={{float:"right"}}> <Dropdown clearable options={options} selection /></text>
                        </Grid.Column>
                        <Grid.Column width={4} >
                            <Button style={{ float: "right" }}> Add</Button>
                        </Grid.Column>

                    </Grid.Row>
                </Grid></div>


            <label><b>Monthly View</b></label><Checkbox toggle style={{ float: "right" }} /><br />
            <text>Toggle on to change scheduler to monthly view</text> &nbsp;<br />

         <Divider></Divider>
         <Button Style={{float:"right"}}>Cancel</Button> <Button Style={{float:"right"}}>Save</Button>

        </Form.Group>
    </Form>
)

export default class AccordionExampleMenu extends Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state

        return (
            <Accordion as={Menu} vertical fluid>
                <Menu.Item>
                    <Accordion.Title
                        active={activeIndex === 0}
                        content='Advanced Appointment Settings'
                        index={0}
                        onClick={this.handleClick}
                    />
                    <Divider></Divider>
                    <Accordion.Content active={activeIndex === 0} content={SizeForm} />
                </Menu.Item>

                <Menu.Item>
                    <Accordion.Title
                        active={activeIndex === 1}
                        content='Sending & Sharing Options'
                        index={1}
                        onClick={this.handleClick}
                    />
                    <Divider></Divider>
                    <Accordion.Content active={activeIndex === 1} content={ColorForm} />
                </Menu.Item>
                <Menu.Item>
                    <Accordion.Title
                        active={activeIndex === 2}
                        content='Additional Options'
                        index={2}
                        onClick={this.handleClick}
                    />
                    <Divider></Divider>
                    <Accordion.Content active={activeIndex === 2} content={SizeForm1} />
                </Menu.Item>
            </Accordion>
        )
    }
}

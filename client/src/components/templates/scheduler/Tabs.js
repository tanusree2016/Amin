import React, { Component } from 'react'
import { Tab, Grid, Segment, Checkbox, Dropdown, Button, Icon, Divider, Form, Popup } from 'semantic-ui-react'
import AdvanceTab from './AdvanceTab'

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]




class Tabs extends Component {
    state = {}

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const panes = [
            {
                menuItem: 'Basic',
                render: () => <div attached={false} >

                    <Form>
                        <Form.Field>
                            <label>Appointment name*</label>
                            <input placeholder='Free Consultation' />
                        </Form.Field>
                        <Form.Select
                            fluid
                            label='Appointment duration*'
                            options={options}
                            placeholder='Choose appointment duration'
                        />

                        <label><b>When can this appointment be scheduled?*</b>&nbsp;
                            <Popup
                                trigger={<Icon name="question circle outline" />}
                                content='Overrides default brand logo for portal login page and banner'
                                position='right center'
                            />
                        </label>
                        <Form.Select
                            fluid

                            options={options}
                            placeholder='Gender'
                        />

                        <label><b>What times are you available?</b>&nbsp;  </label>
                        <Form.TextArea placeholder='Tell us more about you...' />
                        <label><b>Once booked, show me as</b>&nbsp;
                            <Popup
                                trigger={<Icon name="question circle outline" />}
                                content='Overrides default brand logo for portal login page and banner'
                                position='right center'
                            />
                        </label>
                        <Form.Group inline>

                            <Form.Radio
                                label='Avalable'
                                value='sm'
                                checked={value === 'sm'}
                                onChange={this.handleChange}
                            />
                            <Form.Radio
                                label='Busy'
                                value='md'
                                checked={value === 'md'}
                                onChange={this.handleChange}
                            />

                        </Form.Group>

                        <Form.Field>
                            <label><b>Location</b>&nbsp;
                            <Popup
                                    trigger={<Icon name="question circle outline" />}
                                    content='Overrides default brand logo for portal login page and banner'
                                    position='right center'
                                />
                            </label>
                            <input placeholder='First Name' />
                        </Form.Field>

                        <label><b>Email</b>&nbsp;
                            <Popup
                                trigger={<Icon name="question circle outline" />}
                                content='Overrides default brand logo for portal login page and banner'
                                position='right center'
                            />
                        </label><br />
                        <text>If using a custom or canned email, be sure to include</text>
                        <Form.Select
                            fluid

                            options={options}
                            placeholder='Gender'
                        />
                        <label>Subject Line</label>
                        <Form.Field>

                            <input placeholder='First Name' />
                        </Form.Field>
                        <text>Email Body</text>
                        <Form.TextArea placeholder='Tell us more about you...' />
               
                         <Button primary style={{float:"right"}}>Save</Button>
                    
                    </Form>
                </div>
            },
            {
                menuItem: 'Advance',
                render: () => <div attached={false} >

                    <AdvanceTab />
                </div>,
            },

        ]
        const { value } = this.state
        return (
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        )
    }
}

export default Tabs








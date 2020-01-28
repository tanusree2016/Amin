import React, { Component } from 'react'
import { Tab, Form, Icon, Popup, Button, Input } from 'semantic-ui-react'

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]
class SettingsTabs extends Component {
    state = {}

    handleChange = (e, { value }) => this.setState({ value })
    render() {
        const { value } = this.state
        const panes = [
            {
                menuItem: 'Relative',
                render: () => <Tab.Pane attached={false} style={{ width: "800px", padding: "20px", marginLeft: "-280px" }}>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input fluid placeholder='First name' value="1" />

                            <Form.Select
                                fluid

                                options={options}

                            />
                            <Form.Select
                                fluid

                                options={options}

                            />
                        </Form.Group>
                        <Form.Group inline >
                            <Icon name="bell outline" size="big" />  <text>Add Reminder</text>
                            <Popup
                                trigger={<Button style={{ background: "none" }}>What is this</Button>}
                                content='Overrides default brand logo for portal login page and banner'
                                position='right center'
                            />

                        </Form.Group>
                        <Form.Field >
                            <h5>Question Styling</h5>
                        </Form.Field >
                        <Form.Group widths='equal' >
                            <Form.Select
                                fluid
                                label='Default Font'
                                options={options}
                                placeholder='Select Font'
                            />

                        </Form.Group>
                        <Form.Group widths='equal' >
                            <Form.Select
                                fluid
                                label='Default Size'
                                options={options}
                                placeholder='Select Size'
                            />

                        </Form.Group>
                        <Form.Field >
                            <label>Default Color</label><br />
                            <input type="color" />
                        </Form.Field>
                        <Form.Field >
                            <h5>Completion Alert</h5>
                        </Form.Field >
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Header' placeholder='Top part of completion alert' />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.TextArea label='Body' placeholder='Body of completion alert' />
                        </Form.Group>


                        <Form.Field>
                            <label>Privacy Settings</label>
                        </Form.Field>

                        <Form.Group inline>

                            <Form.Radio
                                label='Private'
                                value='sm'
                                checked={value === 'sm'}
                                onChange={this.handleChange}
                            />
                            <Form.Radio
                                label='Public'
                                value='md'
                                checked={value === 'md'}
                                onChange={this.handleChange}
                            />

                        </Form.Group>

                    </Form>
                </Tab.Pane>,
            },
            {
                menuItem: 'Fixed',
                render: () => <Tab.Pane attached={false} style={{ width: "800px", padding: "20px", marginLeft: "-280px" }}>

                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label="This subcontract expires" placeholder='Select a date' type="date" />


                        </Form.Group>
                        <Form.Group inline >
                            <Icon name="bell outline" size="big" />  <text>Add Reminder</text>
                            <Popup
                                trigger={<Button style={{ background: "none" }}>What is this</Button>}
                                content='Overrides default brand logo for portal login page and banner'
                                position='right center'
                            />

                        </Form.Group>
                        <Form.Field >
                            <h5>Question Styling</h5>
                        </Form.Field >
                        <Form.Group widths='equal' >
                            <Form.Select
                                fluid
                                label='Default Font'
                                options={options}
                                placeholder='Select Font'
                            />

                        </Form.Group>
                        <Form.Group widths='equal' >
                            <Form.Select
                                fluid
                                label='Default Size'
                                options={options}
                                placeholder='Select Size'
                            />

                        </Form.Group>
                        <Form.Field >
                            <label>Default Color</label><br />
                            <input type="color" />
                        </Form.Field>
                        <Form.Field >
                            <h5>Completion Alert</h5>
                        </Form.Field >
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Header' placeholder='Top part of completion alert' />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.TextArea label='Body' placeholder='Body of completion alert' />
                        </Form.Group>


                        <Form.Field>
                            <label>Privacy Settings</label>
                        </Form.Field>

                        <Form.Group inline>

                            <Form.Radio
                                label='Private'
                                value='sm'
                                checked={value === 'sm'}
                                onChange={this.handleChange}
                            />
                            <Form.Radio
                                label='Public'
                                value='md'
                                checked={value === 'md'}
                                onChange={this.handleChange}
                            />

                        </Form.Group>

                    </Form>
                </Tab.Pane>,
            },
            {
                menuItem: 'No Expiration',
                render: () => <Tab.Pane attached={false} style={{ width: "800px", padding: "20px", marginLeft: "-280px" }}>

                    <Form>

                        <Form.Field >
                            <h5>Question Styling</h5>
                        </Form.Field >
                        <Form.Group widths='equal' >
                            <Form.Select
                                fluid
                                label='Default Font'
                                options={options}
                                placeholder='Select Font'
                            />

                        </Form.Group>
                        <Form.Group widths='equal' >
                            <Form.Select
                                fluid
                                label='Default Size'
                                options={options}
                                placeholder='Select Size'
                            />

                        </Form.Group>
                        <Form.Field >
                            <label>Default Color</label><br />
                            <input type="color" />
                        </Form.Field>
                        <Form.Field >
                            <h5>Completion Alert</h5>
                        </Form.Field >
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Header' placeholder='Top part of completion alert' />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.TextArea label='Body' placeholder='Body of completion alert' />
                        </Form.Group>


                        <Form.Field>
                            <label>Privacy Settings</label>
                        </Form.Field>

                        <Form.Group inline>

                            <Form.Radio
                                label='Private'
                                value='sm'
                                checked={value === 'sm'}
                                onChange={this.handleChange}
                            />
                            <Form.Radio
                                label='Public'
                                value='md'
                                checked={value === 'md'}
                                onChange={this.handleChange}
                            />

                        </Form.Group>

                    </Form>
                </Tab.Pane>,
            },
        ]

        return (
            <Tab menu={{ attached: false }} panes={panes} style={{ width: "266px", marginLeft: "400px" }}/>

        )
    }
}



export default SettingsTabs;

import React, { Component } from 'react';
import _ from 'lodash';
import { Grid, Segment, Button, Dropdown, Input, Menu, Icon, Checkbox, Modal, Image, Header,Form } from 'semantic-ui-react';
const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
]

export default class Projects extends Component {
    state = {
        leads: 10,
        jobs: 2,
        combined: 12,
        archived: 0
    }
    changeValue = () => {
        this.setState({
            leads: 15
        })
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    changeSize = (id)=>{
        document.getElementById(id).style.width = "200px"
    }

    render() {
        const { activeItem } = this.state

        return (
            <div>
                
                <Grid columns='equal'>
    <Grid.Column width = {4}>
      <Segment id="11" style={{width:"70px"}}><button onClick={(e)=>this.changeSize(e,11)}>change</button></Segment>
    </Grid.Column>
    <Grid.Column width = {4}>
      <Segment>2</Segment>
    </Grid.Column>
    <Grid.Column width = {4}>
      <Segment>3</Segment>
    </Grid.Column>
    <Grid.Column width = {2}>
      <Segment>3</Segment>
    </Grid.Column>
    
  </Grid>


             
            
                    {/* <Menu>
                        <Menu.Item
                            name='browse'
                            active={activeItem === 'browse'}
                            onClick={this.handleItemClick}
                        >
                            <Checkbox />
                            <Dropdown>
      <Dropdown.Menu>
        <Dropdown.Item>Delete</Dropdown.Item>
        <Dropdown.Item>Archive</Dropdown.Item>
        <Dropdown.Item>Update project status</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>

                        </Menu.Item>

                        <Menu.Item
                            name='submit'
                            active={activeItem === 'submit'}
                            onClick={this.handleItemClick}
                           >
                            <Dropdown
                                text='Filter'
                                icon='filter'
                                floating
                                labeled
                                button
                                className='icon'
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Header content='Search Issues' />
                                    <Input icon='search' iconPosition='left' name='search' />
                                    <Dropdown.Header icon='tags' content='Filter by tag' />
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        label={{ color: 'red', empty: true, circular: true }}
                                        text='Important'
                                    />
                                    <Dropdown.Item
                                        label={{ color: 'blue', empty: true, circular: true }}
                                        text='Announcement'
                                    />
                                    <Dropdown.Item
                                        label={{ color: 'black', empty: true, circular: true }}
                                        text='Discussion'
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>

                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='signup'
                                active={activeItem === 'signup'}
                                onClick={this.handleItemClick}
                            >
                                <Modal trigger={<Button>New Project</Button>} centered style={{zIndex:"1"}}>
                                    <Modal.Header>Profile Picture</Modal.Header>
                                    <Modal.Content image scrolling>
                                       

                                        <Modal.Description>
                                            <Header>Modal Header</Header>
                                            <p>
                                                This is an example of expanded content that will cause the modal's
                                                dimmer to scroll
        </p>

                                            {_.times(8, (i) => (
                                                <Form>
                                                <Form.Field>
                                                  <label>First Name</label>
                                                  <input placeholder='First Name' />
                                                </Form.Field>
                                                <Form.Field>
                                                  <label>Last Name</label>
                                                  <input placeholder='Last Name' />
                                                </Form.Field>
                                                <Form.Field>
                                                  <Checkbox label='I agree to the Terms and Conditions' />
                                                </Form.Field>
                                                <Button type='submit'>Submit</Button>
                                              </Form>
                                            ))}
                                        </Modal.Description>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button primary>
                                            Proceed <Icon name='chevron right' />
                                        </Button>
                                    </Modal.Actions>
                                </Modal>
                            </Menu.Item>
                            <Menu.Item
                                name='signup'
                                active={activeItem === 'signup'}
                                onClick={this.handleItemClick}
                            >
                                Export
          </Menu.Item>

                            <Menu.Item
                                name='help'
                                active={activeItem === 'help'}
                                onClick={this.handleItemClick}
                            >
                                Customize
          </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                */}

            </div>
        )
    }
}
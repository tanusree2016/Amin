import React from 'react'
import { Modal, Nav,Form ,ButtonToolbar,DropdownButton,SplitButton,Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Grid,Image,Checkbox,Dropdown,Input,Button} from 'semantic-ui-react'
import Modals from './Modals'
import {Link} from 'react-router-dom'
const panels = [
    {
      key: 'details',
      title: 'Optional Details',
      content: {
        as: Form.Input,
        label: 'Maiden Name',
        placeholder: 'Maiden Name',
      },
    },
  ]
function Navs() {
  
  

 
  
   
    return (
      <div>
     
     <Grid doubling columns={5} centered>
    
        <Grid.Column>
        <Checkbox />
                            <Dropdown>
      <Dropdown.Menu>
        <Dropdown.Item>Delete</Dropdown.Item>
        <Dropdown.Item>Archive</Dropdown.Item>
        <Dropdown.Item>Update project status</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
     
     
 
    </Grid.Column>
    <Grid.Column>
        
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
    </Grid.Column>
    <Grid.Column>
    <Modals />

    </Grid.Column>
    <Grid.Column>
      <Button color='grey'>Export</Button>
    </Grid.Column>
    <Grid.Column>
      <Button secondary><Link to="/customize">Customize</Link></Button>
    </Grid.Column>
  </Grid>


 


     </div>
    )
  }


export default Navs;

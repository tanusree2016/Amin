import React,{Component} from 'react'
import { Form, Tab, Segment,  Grid, Icon} from 'semantic-ui-react'
import EmailBody from '../projects/EmailBody'
import Appointment from './Appointment'
import {Dropdown,  ButtonToolbar, DropdownButton ,ButtonGroup,} from 'react-bootstrap'


class Emails extends Component{
  render(){
    const panes = [
      {
        menuItem: 'Emails',
        render: () => <Tab.Pane attached={false} >
        <div style={{height:"70px",background:"pink",padding:"20px"}}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
        <h3 style={{paddingLeft:"20px",color:"white"}}>Inbox</h3>
        </Grid.Column>
        <Grid.Column>
        <button style={{float:"right"}}>Send Email</button>
        </Grid.Column>
        </Grid.Row>
        </Grid>
        </div>
      <ButtonGroup fluid style={{width:"100%"}}>
        <div style={{width:"45%",border:"1px solid #eee",height:"330px"}}>Inbox</div>
       
        <div style={{width:"55%",border:"1px solid #eee",height:"330px"}}>Inbox</div>
        </ButtonGroup>
        </Tab.Pane>,
    
      },
      {
        menuItem: 'Invoices',
        render: () => <Tab.Pane attached={false} >Tab 2 Content</Tab.Pane>,
      },
      {
        menuItem: 'Forms',
        render: () => <Tab.Pane attached={false} >Tab 3 Content</Tab.Pane>,
      },
      {
        menuItem: 'Appointments',
        render: () => <Tab.Pane attached={false} >
         
         <div style={{height:"70px",background:"pink",padding:"20px"}}>
         <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
        <h3 style={{paddingLeft:"20px",color:"white"}}>Appointments</h3>
        </Grid.Column>
        <Grid.Column >
        <ButtonToolbar style={{float:"right"}}>
      {['Secondary'].map(
        variant => (
          <DropdownButton
            title="Schedule Appointment"
            variant={variant.toLowerCase()}
            id={`dropdown-variants-${variant}`}
            key={variant}
          >
            <Dropdown.Item eventKey="1" disabled>Fixed Date</Dropdown.Item>
            <Dropdown.Item eventKey="2">Add Appointment</Dropdown.Item>
           
            <Dropdown.Divider />
            <Dropdown.Item eventKey="1" disabled>Create Scheduler</Dropdown.Item>
            <Dropdown.Item eventKey="4">New Scheduling Request</Dropdown.Item>
            <Dropdown.Item eventKey="4">Use Existing Template</Dropdown.Item>
          </DropdownButton>
        ),
      )}
    </ButtonToolbar>
        </Grid.Column>
        </Grid.Row>
        </Grid>
    
         </div>
         <Appointment/>
        </Tab.Pane>,
      },
      {
        menuItem: 'Workflows',
        render: () => <Tab.Pane attached={false} >
          <div>
            Tab 2 Content<br />
            Tab 2 Content<br />
            Tab 2 Content<br />
            Tab 2 Content<br /> Tab 2 Content<br /> Tab 2 Content<br />
            Tab 2 Content<br /> Tab 2 Content<br />
            Tab 2 Content<br /> Tab 2 Content<br />
            Tab 2 Content<br /> Tab 2 Content<br />
            Tab 2 Content<br /> Tab 2 Content<br />
            Tab 2 Content<br /> Tab 2 Content<br />
            Tab 2 Content<br /> Tab 2 Content<br />
            Tab 2 Content<br /> Tab 2 Content<br />
            Tab 2 Content<br /> Tab 2 Content<br />
            Tab 2 Content<br /> Tab 2 Content<br />
            Tab 2 Content<br /> Tab 2 Content<br />
    
          </div>
        </Tab.Pane>,
      },
      {
        menuItem: 'Tasks',
        render: () => <Tab.Pane attached={false} >Tab 3 Content</Tab.Pane>,
      },
      {
        menuItem: 'Notes',
        render: () => <Tab.Pane attached={false} >Tab 3 Content</Tab.Pane>,
      },
    ]
    return(
      
  <div style={{ padding: "10px" }}>
  <Form>
    <Form.Group inline >
      <Form.Field>
  <div>
      <div style={{ width: "290px", height: "930px", padding: "0px",background:"white" }}>
            <div style={{ width: "290px", height: "100px", border: "1px solid #eee", padding: "15px" }}>
  
              {/* <DropdownButton style={{ backgroundColor: "white", float: "right" }}>
                <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                <Dropdown.Item eventKey="2">Archive</Dropdown.Item>
  
              </DropdownButton> */}
              <b>sddfd</b> <i className="fa fa-angle-down" aria-hidden="true" style={{ paddingLeft: "70px" }}></i><br /><br />
              <text>Set Date</text>
            </div>
  
            <div style={{ width: "290px", height: "100px", border: "1px solid #eee", padding: "15px" }}>
              <button style={{ float: "right", marginLeft: "3px", fontSize: "11px", background: "pink" }}>Needs Sending </button><button style={{ float: "right", fontSize: "11px", background: "pink" }}>Private</button>
              {/* <DropdownButton style={{ backgroundColor: "white", float: "right", marginRight: "20px" }}>
                <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                <Dropdown.Item eventKey="2">Archive</Dropdown.Item>
  
              </DropdownButton> */}
              <b>Contract</b> &nbsp; <i className="fa fa-angle-down" aria-hidden="true"></i><br /><br />
              <text>Sample Basic Contract</text>
            </div>
  
  
            <div style={{ width: "290px", height: "100px", border: "1px solid #eee", padding: "10px" }}>
              <b>Tags</b><br /><br />
              {/* <Form.Control as="select" name="client_id" required >
                <option>Select a client</option>
                <option>Client1</option>
                <option>Client2</option>
              </Form.Control> */}
  
            </div>
            <div style={{ width: "290px", height: "100px", border: "1px solid #eee", padding: "10px" }}>
              <b>Project Status</b><br /><br />
              {/* <Form.Control as="select" name="client_id" required >
                <option>Select a client</option>
                <option>Client1</option>
                <option>Client2</option>
              </Form.Control> */}
  
            </div>
            <div style={{ width: "290px", height: "100px", border: "1px solid #eee",padding: "20px 10px 20px 10px" }}>
            <b>Client</b> &nbsp; <i className="fa fa-edit" ></i><br />
            <b>Name: </b><text> ggffg</text> <br />
            <b>Email: </b><text> ggffg</text>
            </div>
            <div style={{ width: "290px", height: "100px", border: "1px solid #eee",padding: "20px 10px 20px 10px" }}>
            <b>Portal</b> &nbsp; <i className="fa fa-angle-down" ></i><br />
            <b>Password: </b><text>(click to reset)</text> <br />
            <b>Status: </b><text> Not Actice</text>
            </div>
  
            <div style={{ width: "290px", height: "100px", border: "1px solid #eee",padding: "20px 10px 20px 10px" }}>
            <b>Project Location</b> &nbsp; <i className="fa fa-edit" ></i><br />
           
            </div>
  
            <div style={{ width: "290px", height: "100px", border: "1px solid #eee", padding: "10px" }}>
              <b>Refferal Source</b><br /><br />
              {/* <Form.Control as="select" name="client_id" required >
                <option>Select a client</option>
                <option>Client1</option>
                <option>Client2</option>
              </Form.Control> */}
  
            </div>
  
            <div style={{ width: "290px", height: "100px", border: "1px solid #eee", padding: "10px" }}>
              <b>Team Member Selection</b><br /><br />
              {/* <Form.Control  name="client_id">
               
              </Form.Control> */}
  
            </div>
  
          </div>
          </div>
      </Form.Field>
      <Form.Field>
         <div style={{minHeight:"500px",background:"white" ,width:"300px"}}>
          {/* <Tab menu={{ attached: true}} panes={panes}  /> */}
      </div>
      </Form.Field>
   
       
      
  
    </Form.Group>
  </Form>
      
  
    </div>
  
      
    )
  }
} 


export default Emails;
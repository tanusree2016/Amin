import React, { Component } from 'react'
import { Dropdown, Form, Tab, Segment, Grid, Icon, Popup, Button, ButtonGroup,Input } from 'semantic-ui-react'
import EmailBody from '../projects/EmailBody'
import Appointment from './Appointment'

import Tasks from '../tasks/Tasks'
import EditClientModal from './email/EditClientModal'
import EditProjectModal from './email/EditProjectModal'
import Invoices from './email/Invoices'
import Notes from './email/Notes'
import Forms from './email/Forms'
const options = [
  { key: 1, text: 'Choice 1', value: 1 },
  { key: 2, text: 'Choice 2', value: 2 },
  { key: 3, text: 'Choice 3', value: 3 },
]

class Emails extends Component {
  render() {
    const panes = [
      {
        menuItem: 'Emails',
        render: () => <Tab.Pane attached={false} style={{ marginLeft: "300px" }}>
          <div style={{ height: "70px", background: "pink", padding: "20px" }}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <h3 style={{ paddingLeft: "20px", color: "white" }}>Inbox</h3>
                </Grid.Column>
                <Grid.Column>
                  <button style={{ float: "right" }}>Send Email</button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          <ButtonGroup fluid style={{ width: "100%" }}>
            <div style={{ width: "45%", border: "1px solid #eee", height: "330px" }}>Inbox</div>

            <div style={{ width: "55%", border: "1px solid #eee", height: "330px" }}>Inbox</div>
          </ButtonGroup>
        </Tab.Pane>,

      },
      {
        menuItem: 'Invoices',
        render: () => <div style={{ marginLeft: "300px" }}>
          <Invoices/>
        </div>,
      },
      {
        menuItem: 'Forms',
        render: () => <div attached={false} style={{ marginLeft: "300px" }}>

          <Forms/>

        </div>,
      },
      {
        menuItem: 'Appointments',
        render: () => <div attached={false} style={{ marginLeft: "300px" }}>

         
          <Appointment />
        </div>,
      },
      {
        menuItem: 'Workflows',
        render: () => <Tab.Pane attached={false} style={{ marginLeft: "300px" }}>
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
        render: () => <Tab.Pane attached={false} style={{ marginLeft: "300px" }}>

          <Tasks />
        </Tab.Pane>,
      },
      {
        menuItem: 'Notes',
        render: () => <Tab.Pane attached={false} style={{ marginLeft: "300px" }}>
          <div>
            <Notes/>
          </div>

        </Tab.Pane>,
      },
    ]
    return (

      <div style={{ padding: "10px" }}>

        <div>

          <div style={{ float: "right", width: "770px", marginTop: "-57px", }}>
            <Tab menu={{ attached: true }} panes={panes} style={{ marginLeft: "-303px" }} />
          </div>
          <div style={{ width: "290px", height: "930px", marginTop: "55px", background: "white",borderRadius:"10px" }}>
            <div style={{ width: "290px", height: "100px", border: "1px solid #eee", padding: "15px" }}>
              {/*   
              <DropdownButton style={{ backgroundColor: "white", float: "right" }}>
                <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                <Dropdown.Item eventKey="2">Archive</Dropdown.Item>
  
              </DropdownButton> */}
              <b>sddfd</b> &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Popup
                content={<div><Button.Group vertical >
                  <Button content='Archive' />
                  <Button content='Delete' />

                </Button.Group></div>}
                on='click'

                position='bottom center'
                trigger={<i className="fa fa-angle-down" aria-hidden="true"></i>}
              /><br /><br />
              <text>Set Date</text>
            </div>

            <div style={{ width: "290px", height: "100px", border: "1px solid #eee", padding: "15px" }}>
              <button style={{ float: "right", marginLeft: "3px", fontSize: "11px", background: "pink" }}>Needs Sending </button><button style={{ float: "right", fontSize: "11px", background: "pink" }}>Private</button>
              {/* <DropdownButton style={{ backgroundColor: "white", float: "right", marginRight: "20px" }}>
                <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                <Dropdown.Item eventKey="2">Archive</Dropdown.Item>
  
              </DropdownButton> */}
              <b>Contract</b> &nbsp; <br /><br />
              <text>Sample Basic Contract</text>
            </div>


            <div style={{ width: "290px", minHeight: "100px", border: "1px solid #eee", padding: "10px" }}>
              <b>Tags</b><br /><br />
              <Dropdown clearable options={options} selection />

            </div>
            <div style={{ width: "290px", minHeight: "100px", border: "1px solid #eee", padding: "10px" }}>
              <b>Project Status</b><br /><br />
              <Dropdown clearable options={options} selection />

            </div>
            <div style={{ width: "290px", minHeight: "100px", border: "1px solid #eee", padding: "20px 10px 20px 10px" }}>
              <b>Client</b> &nbsp;<text style={{float:"right"}}><EditClientModal/></text><br />
              <b>Name: </b><text> ggffg</text> <br />
              <b>Email: </b><text> ggffg</text>
            </div>
            <div style={{ width: "290px", minHeight: "100px", border: "1px solid #eee", padding: "20px 10px 20px 10px" }}>
              <b>Portal</b> &nbsp; <i className="fa fa-angle-down" ></i><br />
              <b>Password: </b><text>(click to reset)</text> <br />
              <b>Status: </b><text> Not Actice</text>
            </div>

            <div style={{ width: "290px", minHeight: "100px", border: "1px solid #eee", padding: "20px 10px 20px 10px" }}>
              <b>Project Location</b> &nbsp; <text style={{float:"right"}}><EditProjectModal/></text><br />

            </div>

            <div style={{ width: "290px", minHeight: "100px", border: "1px solid #eee", padding: "10px" }}>
              <b>Refferal Source</b><br /><br />
              <Dropdown clearable options={options} selection />

            </div>

            <div style={{ width: "290px", minHeight: "100px", border: "1px solid #eee", padding: "10px" }}>
              <b>Team Member Selection</b><br /><br />
             <Input placeholder="Assign teams/users"/>

            </div>

          </div>
        </div>





      </div>


    )
  }
}


export default Emails;
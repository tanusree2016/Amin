import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown } from 'semantic-ui-react';
import AppointmentTab from './AppointmentTab'
import AddAppointmentModal from './email/AddAppointmentModal'
const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit', },
  { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
  { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]


export default class Calendars extends Component {
  render() {
    return (

      <div style={{ padding: "10px" }}>
        <div style={{ height: "60px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
          <Dropdown
            text='Schedule Appointment'
            
            floating
            pointing="top right"
            button
            className='icon'
            style={{float:"right"}}
          >
            <Dropdown.Menu>
              <Dropdown.Header  content='Fixed' />
              <Dropdown.Divider />
              <Dropdown.Item text={<AddAppointmentModal/>} />
              <Dropdown.Divider />
              <Dropdown.Header  content='Create Scheduler' />
              <Dropdown.Divider />
              <Dropdown.Item text='New Scheduling Request' />
              <Dropdown.Item  text='Use Existing Scheduler Group' />
              <Dropdown.Item text='Use Existing Scheduler Template' />
            </Dropdown.Menu>
          </Dropdown>
          <text style={{ color: "white" }}><h3>Appointments</h3></text>

        </div>
        <div style={{ padding: "5px", background: "white" }}>
          <div >
            <AppointmentTab />

          </div>




        </div>

      </div>



    )
  }
}
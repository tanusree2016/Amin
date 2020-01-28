import React from 'react'
import { Tab, Segment ,Icon,Grid,Button} from 'semantic-ui-react'
import PendingTab from './email/PendingTab'
const panes = [
  {
    menuItem: 'Confirmed',
    render: () => <div style={{padding:"0px 50px 0px 50px"}}>
  <Segment>
    <Button style={{float:"right"}}>Event</Button>
    <text><b>rtrtrt</b></text><br/>
    <text>11/19/19 3:04PM</text><br/>
    <text>fgdgfdg</text>
  </Segment>
  </div>
   ,
  },
  {
    menuItem: 'Pending',
    render: () => <div>
   <PendingTab/>

   </div>,
  },
 
]

const AppointmentTab = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
)

export default AppointmentTab

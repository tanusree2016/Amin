import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import AddProjectEvent from './AddProjectEvent'
import AppointmentEvent from './AppointmentEvent'
import TaskEvent from './TaskEvent'
import EditAppointmentEvent from'./EditAppointmentEvent'
import EditTaskEvent from './EditTaskEvent'
const DropdownExamplePointingTwo = () => (
  <div>
  <Menu vertical style={{width:"150px"}}>
    <Menu.Item><AddProjectEvent/></Menu.Item>
    
    <Menu.Item><AppointmentEvent/></Menu.Item>
    <Menu.Item><TaskEvent/></Menu.Item>
  </Menu>

 
   <div>
   <div>
   <EditTaskEvent/>
   </div><br/><br/>
     
   </div>

  <div style={{width:"150px",height:"20px",background:"lightgreen",textAlign:"center",borderRadius:"10px",}}>
   <EditAppointmentEvent/>
  </div><br/><br/>


 


</div>
)

export default DropdownExamplePointingTwo
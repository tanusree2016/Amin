
import React from 'react'
import { Tab } from 'semantic-ui-react'
import Branding from './settings/Branding'
import Dashboard from './settings/Dashboard'
import Portal from './settings/Portal'
import UserManagement from './settings/UserManagement'
import InternationalSettings from './settings/InternationalSettings'
import RecieveMoney from './settings/RecieveMoney'
import Emails from './settings/Emails' 
const panes = [
  { menuItem: 'Branding', render: () =><Branding/> },
  { menuItem: 'Dashboard', render: () => <Dashboard/> },
  { menuItem: 'Portal', render: () =><Portal/> },
  { menuItem: 'Multi users', render: () => <UserManagement/> },
  { menuItem: 'Internation Settings', render: () => <InternationalSettings/> },
  { menuItem: 'Recieve Money', render: () => <RecieveMoney/>},
  { menuItem: 'Emails', render: () => <Emails/> },
]

const TabExampleMenuPositionRight = () => (
    <div style={{padding:"20px"}}>
  <Tab
    menu={{ fluid: true, vertical: true }}
    menuPosition='left'
    panes={panes}
  />
    </div>

)

export default TabExampleMenuPositionRight
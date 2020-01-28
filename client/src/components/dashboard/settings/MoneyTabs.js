import React from 'react'
import { Tab } from 'semantic-ui-react'
import Recieve from './Recieve'
import Money from './Money'

const panes = [
  {
    menuItem: 'Recieve',
    render: () =>  <Tab.Pane attached={false} style={{width:"770px",marginLeft:"-315px"}}><Recieve/></Tab.Pane>,
  },
  {
    menuItem: 'Invoice',
    render: () =>  <Tab.Pane attached={false} style={{width:"770px",marginLeft:"-315px"}}><Money/></Tab.Pane>,
  },
 
]

const TaskTabs = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} style={{width:"160px",marginLeft:"300px"}}/>
)

export default TaskTabs








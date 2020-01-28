import React from 'react'
import { Tab } from 'semantic-ui-react'
import Users from './Users'
import Teams from './Teams'

const panes = [
  {
    menuItem: 'Users',
    render: () =>  <Tab.Pane attached={false} style={{width:"770px",marginLeft:"-315px"}}><Users/></Tab.Pane>,
  },
  {
    menuItem: 'Teams',
    render: () =>  <Tab.Pane attached={false} style={{width:"770px",marginLeft:"-315px"}}><Teams/></Tab.Pane>,
  },
 
]

const TaskTabs = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} style={{width:"140px",marginLeft:"300px"}}/>
)

export default TaskTabs








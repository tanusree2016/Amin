import React from 'react'
import { Tab } from 'semantic-ui-react'
import OpenSortTable from './OpenSortTable'
import InvoicedSortTable from './InvoicedSortTable'
import AllSortTable from './AllSortTable'


const panes = [
  {
    menuItem: 'Open',
    render: () =>  <Tab.Pane attached={false} style={{width:"1040px",marginLeft:"-400px"}}><OpenSortTable/></Tab.Pane>,
  },
  {
    menuItem: 'Invoiced',
    render: () =>  <Tab.Pane attached={false} style={{width:"1040px",marginLeft:"-400px"}}><InvoicedSortTable/></Tab.Pane>,
  },
  {
    menuItem: 'All',
    render: () => <Tab.Pane attached={false} style={{width:"1040px",marginLeft:"-400px"}}>
      <AllSortTable/>
    
      </Tab.Pane>,
  },
]

const TaskTabs = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} style={{width:"200px",marginLeft:"400px"}}/>
)

export default TaskTabs








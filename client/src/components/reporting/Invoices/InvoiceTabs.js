import React from 'react'
import { Tab } from 'semantic-ui-react'
//import MyTaskSortTable from './MyTaskSortTable'
//import AllTaskSortTable from './AllTaskSortTable'
import InvoiceSortTable from './InvoicesSortTable'
import OverdueInvoicesTable from './OverdueInvoicesTable'


const panes = [
  {
    menuItem: 'All Invoices',
    render: () =>  <Tab.Pane attached={false} style={{width:"1065px",marginLeft:"-415px"}}>   <InvoiceSortTable /></Tab.Pane>,
  },
  {
    menuItem: 'Overdue Invoices',
    render: () =>  <Tab.Pane attached={false} style={{width:"1065px",marginLeft:"-415px"}}><OverdueInvoicesTable/></Tab.Pane>,
  },
 
]

const TaskTabs = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} style={{width:"240px",marginLeft:"400px"}}/>
)

export default TaskTabs








import React from 'react'
import { Tab } from 'semantic-ui-react'
import MyTaskSortTable from './MyTaskSortTable'
import AllTaskSortTable from './AllTaskSortTable'
import BoardList from './BoardList'


const panes = [
  {
    menuItem: 'My Tasks',
    render: () =>  <Tab.Pane attached={false} style={{width:"400%",marginLeft:"-160%"}}> <MyTaskSortTable/></Tab.Pane>,
  },
  {
    menuItem: 'All Tasks',
    render: () =>  <Tab.Pane attached={false} style={{width:"400%px",marginLeft:"-160%"}}><AllTaskSortTable/></Tab.Pane>,
  },
  {
    menuItem: 'Boards',
    render: () => <Tab.Pane attached={false} style={{width:"400%px",marginLeft:"-160%"}}>
      <BoardList/>
    
      </Tab.Pane>,
  },
]

const TaskTabs = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} style={{width:"23%",marginLeft:"40%"}}/>
)

export default TaskTabs








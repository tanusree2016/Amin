import React from 'react'
import { Tab } from 'semantic-ui-react'
import MyTaskSortTable from './MyTaskSortTable'
import AllTaskSortTable from './AllTaskSortTable'
import Boards from './Boards'

const panes = [
  {
    menuItem: 'My Tasks',
    render: () =>  <Tab.Pane attached={false} style={{width:"1065px",marginLeft:"-400px"}}> <MyTaskSortTable/></Tab.Pane>,
  },
  {
    menuItem: 'All Tasks',
    render: () =>  <Tab.Pane attached={false} style={{width:"1065px",marginLeft:"-400px"}}><AllTaskSortTable/></Tab.Pane>,
  },
  {
    menuItem: 'Boards',
    render: () => <Tab.Pane attached={false} style={{width:"1065px",marginLeft:"-400px"}}><Boards/></Tab.Pane>,
  },
]

const TabExampleSecondaryPointing = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} style={{width:"250px",marginLeft:"400px"}}/>
)

export default TabExampleSecondaryPointing


import React from 'react'
import { Tab } from 'semantic-ui-react'
import MyTaskSortTable from './MyTaskSortTable'
import AllTaskSortTable from './AllTaskSortTable'
import Boards from './Boards'
import { Segment,Grid,Button } from 'semantic-ui-react';

const panes = [
  {
    menuItem: 'My Tasks',
    render: () =>  <Tab.Pane attached={false} style={{width:"1075px",marginLeft:"-810px"}}> <MyTaskSortTable/></Tab.Pane>,
  },
  {
    menuItem: 'All Tasks',
    render: () =>  <Tab.Pane attached={false} style={{width:"1075px",marginLeft:"-810px"}}><AllTaskSortTable/></Tab.Pane>,
  },
  {
    menuItem: 'Boards',
    render: () => <Tab.Pane attached={false} style={{width:"1075px",marginLeft:"-810px"}}><Boards/></Tab.Pane>,
  },
]

const TabExampleSecondaryPointing = () => (
    <div style={{ height: "60px", padding:"10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
   <text style={{  color: "white"}}><h3>Tasks</h3></text><text style={{float:"right"}}><Tab menu={{ secondary: true, pointing: true }} panes={panes} style={{width:"250px",marginTop:"-30px"}}/></text>

 
</div>
)

export default TabExampleSecondaryPointing

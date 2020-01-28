import React from 'react'
import { Tab, Segment ,Icon,Grid,Button} from 'semantic-ui-react'
import AddNotesModal from './AddNotesModal';
import AddCallLogModal from './AddCallLogModal';
const panes = [
  {
    menuItem: 'Activity Log',
    render: () => <Tab.Pane attached={false}>
     <text>Activity Log</text>
<hr/>

<Grid>
    <Grid.Column width={2}>
<Segment><Icon name="circle"/> </Segment>
    </Grid.Column>
    <Grid.Column width={14}>
    <Segment><text>19/11/2019</text><br/>
    <text><b>sdfsffgfsgf</b> updated the project call logs.</text>
    </Segment>
    </Grid.Column>
  
  </Grid>


    </Tab.Pane>,
  },
  {
    menuItem: 'Notes',
    render: () => <Tab.Pane attached={false}>
    <text>Project Notes</text><text style={{float:"right"}}><AddNotesModal/></text><br/><br/>
<hr/>
<Segment>sdfsdfg</Segment>

    </Tab.Pane>,
  },
  {
    menuItem: 'Call Logs',
    render: () => <Tab.Pane attached={false}>

<text>Project Call Logs</text><text style={{float:"right"}}><AddCallLogModal/></text><br/><br/>
<hr/>
<Segment>sdfsdfgfgfgfdg</Segment>
    </Tab.Pane>,
  },
]

const TabExampleSecondaryPointing = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
)

export default TabExampleSecondaryPointing

import React from 'react'
import { Tab, Icon,Button } from 'semantic-ui-react'
import BigCalendar from './BigCalendar';
import AddProjectEvent from './AddProjectEvent'
import Events from './Events'
const panes = [
  {
    menuItem:  { key: 'calendar',  content: 'Calendar',icon: 'calendar alternate outline',menuPosition:"right" },
    //<Button label="Calendar" labelPosition="left" style={{float:"right"}} icon="calendar alternate outline"/>,
    // <text style={{padding:"10px"}}>Calendar <Icon name='home' size='small' /></text>,
    render: () => <Tab.Pane attached={false}><BigCalendar />
    </Tab.Pane>,
  },
  {
    menuItem: { key: 'list',  content: 'Event',icon: 'list',menuPosition:"right"  },
    //<Button label="Event" labelPosition="left" style={{float:"right"}} icon="list"/>,
    render: () => <Tab.Pane attached={false}>
      <div style={{ height: "400px" }}>
{/* <h1>No Events To Show</h1> */}

<Events/>
      </div>
    </Tab.Pane>,
  },
  {
    menuItem: { key: 'cogs',  content: 'Calendar Settings',icon: 'cogs', menuPosition:"right"  },
    //<Button label="Calendar Settings" labelPosition="left" style={{float:"right"}} icon="cogs"/>,
    render: () => <Tab.Pane attached={false}>
      <div style={{ height: "400px" }}>
      <Button basic color='pink'>
      Sync Calendar
    </Button>
      </div>
    </Tab.Pane>,
  },
]

const TabExampleTabularFalse = () => (
  <Tab menu={{ attached: false, tabular: false, menuPosition: 'right' }} panes={panes} menuPosition="right" />
)

export default TabExampleTabularFalse
import _ from 'lodash'
import React, { Component } from 'react'
import { Divider, Tab,Button ,Popup,Icon} from 'semantic-ui-react'
import DatePickers from './DatePickers'
const colors = [
 
  'green',

]

const panes = [
  {
    menuItem: 'Last 365 Days',
    render: () => <Tab.Pane attached={false}>
<div style={{height:"400px"}}>
    <text><b>Total Number of Inquiries</b></text>
    <Button style={{float:"right"}}>Monthly</Button><Button style={{float:"right"}}>Weekly</Button><Button style={{float:"right"}}>Daily</Button><br/><br/>
    <Divider></Divider>
    <canvas id="inquiry-chart" class="chart chart-line ng-isolate-scope chartjs-render-monitor" width="619" height="410" style={{display: "block", width: "619px", height: "410px"}}></canvas>
</div>

    </Tab.Pane>,
  },
  {
    menuItem: 'Year to Date',
    render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
  },
  {
    menuItem: 'Last 3 Months',
    render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
  },
  {
    menuItem: 'Last 30 Days',
    render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
  },
  {
    menuItem:         <Popup
    content={<div style={{width:"380px",height:"120px",padding:"20px"}}><DatePickers/> to <DatePickers/>
    <br/>  <br/>
    <Button primary style={{float:"right"}}>Apply</Button><Button secondary style={{float:"right"}}>Cancel</Button>
    </div>}
    on='click'

    position='bottom center'
    trigger={<Button>Custom</Button>}
    
/>,
    render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
  },
]

class TabExampleColored extends Component {
  state = { color: colors[0] }

  handleColorChange = (e) => this.setState({ color: e.target.value })

  render() {
    const { color } = this.state

    return (
      <div>
        {/* <select onChange={this.handleColorChange}>
          {_.map(colors, (c) => (
            <option key={c} value={c}>
              {_.startCase(c)}
            </option>
          ))}
        </select> */}

        <Divider hidden />

        <Tab menu={{ color, attached: false, tabular: false}} panes={panes} />
      </div>
    )
  }
}

export default TabExampleColored

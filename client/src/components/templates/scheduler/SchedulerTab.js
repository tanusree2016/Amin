import React from 'react'
import { Tab, Grid, Segment, Checkbox, Dropdown, Button, Icon, Divider } from 'semantic-ui-react'
import AddTemplateModal from './AddTemplateModal'
import Tabs from './Tabs'

const panes = [
  {
    menuItem: 'Appointment Scheduler',
    render: () => <div style={{ width: "1065px", height: "", marginLeft: "-400px" }}>
      <Grid columns='equal'>
        <Grid.Column>
          <div style={{ paddingLeft: "20px" }}>
            <text style={{ float: "right", }}><AddTemplateModal /> </text>
            <div style={{
              width: "63px", height: "35px", padding: "10px", border: "1px solid #ccc",
              borderRadius: "4px",
            }}>


              <Checkbox style={{ paddingLeft: "3px" }} />&nbsp;
                <Dropdown icon="angle down">
                <Dropdown.Menu>
                  <Dropdown.Item>Delete</Dropdown.Item>
                  <Dropdown.Item>Archive</Dropdown.Item>
                  <Dropdown.Item>Update project status</Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>

            </div>

            <Segment.Group style={{ height: "300px", }}>
              <Segment>
                <Checkbox style={{ paddingTop: "3px" }} />&nbsp;&nbsp;<text>Free Consultation</text>
                <Icon name="trash" style={{ float: "right" }} />
                <Icon name="linkify" style={{ float: "right" }} />
                <Icon name="copy" style={{ float: "right" }} />

              </Segment>
              <Segment><Checkbox style={{ paddingTop: "3px" }} />&nbsp;&nbsp;<text>Paid Session</text>
                <Icon name="trash" style={{ float: "right" }} />
                <Icon name="linkify" style={{ float: "right" }} />
                <Icon name="copy" style={{ float: "right" }} />

              </Segment>

            </Segment.Group>
          </div>
        </Grid.Column>
        <Grid.Column width={11}>
          <Segment >
            <h2 style={{ textAlign: "center" }}>Free Consultation</h2>
            <div style={{ height: "2px", background: "pink" }}></div>
            <Tabs /><br/><br/>


          </Segment>
        </Grid.Column>

      </Grid>

    </div>,
  },
  {
    menuItem: 'Scheduler Group',
    render: () => <Tab.Pane attached={false} style={{ width: "1065px", marginLeft: "-400px" }}>


    </Tab.Pane>,
  },

]

const SchedulerTab = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} style={{ width: "315px", marginLeft: "400px" }} />
)

export default SchedulerTab








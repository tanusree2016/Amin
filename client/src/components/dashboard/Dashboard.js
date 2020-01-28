import React, { Component } from 'react'
import { Image, Grid, Segment, Icon, Popup } from 'semantic-ui-react'
import Calendars from './Calendars'
import BigCalendar from './BigCalendar';
import Tasks from './Tasks';
import Financials from './Financials'
export default class Dashboard extends Component {
  render() {
    return (
      <div className="outerdiv">
        <Grid columns='equal' >

          <Grid.Column>
            <div className="dashdiv1">
              <div className="dashdiv2">
                <h1><Icon name="star outline" inverted /></h1>

                <Popup
                  trigger={<Icon name="question circle outline"className="dashpopup" />}
                  content='Way off to the left'
                  offset=''
                  position='left center'
                />

              </div>
              <div className="dashdiv3">
                <text ><b>Financial</b></text>&nbsp; <Icon name="pencil" /> <br />
                <text style={{ marginRight: "10px" }}><b>Goals</b></text>
                <h2 style={{ color: "orange" }}>$ 0</h2>

              </div>
            </div>
          </Grid.Column>

          <Grid.Column>
            <div className="dashdiv4">
              <div className="dashdiv5">
                <h1 style={{ color: "white" }}>RECENT</h1>
               

                <Popup
                  trigger={ <Icon name="question circle outline" style={{ float: "right", color: "white" }} />}
                  content='Alert of missed paymemts, contracts that require counter signatures, and dubsado feature alerts'
                  offset=''
                  position='left center'
                />
              </div>
              <div style={{ padding: "20px" }}>
                <text><Icon name="wordpress forms" /> 0 invoices have missed payments</text><br />
                <text> <Icon name="plus circle" /> 0 contracts need counter signatures</text><br />
                <text> <Icon name="checkmark box outline" /> 0 workflow actions need approval</text><br />
                <text> <Icon name="exclamation triangle" /> Click here to read more about our latest updates!</text>
              </div>

            </div>
          </Grid.Column>

        </Grid>

        <Grid columns='equal'>

          <Grid.Column>
          
            <Calendars/>
          </Grid.Column>



        </Grid>



        <Grid columns='equal'>
          <Grid.Column  width={10}>
         
          
          
            <Financials/>
          
          </Grid.Column>
          <Grid.Column width={6}>
         
            <Tasks/>
          </Grid.Column>

        </Grid>

      </div>

    )
  }
}

import React, { Component } from 'react';
import _ from 'lodash';
import { Grid, Segment, Dropdown, Input, Menu, Icon, Checkbox, Modal, Image, Header, Form, Divider,Button,ButtonGroup } from 'semantic-ui-react';

import Navs from './Navs';
const options = [
  { key: 1, text: 'Choice 1', value: 1 },
  { key: 2, text: 'Choice 2', value: 2 },
]

export default class Layout extends Component {
  state = {
    leads: 10,
    jobs: 2,
    combined: 12,
    archived: 0
  }
  changeValue = () => {
    this.setState({
      leads: 15
    })
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div style={{  padding: "20px" }}>



        <Grid columns='equal'>
          <Grid.Column width={5}>
            <text>Leads</text>
            <ButtonGroup className="mt-3">

              <Button  style={{ background: "white",  width: "130px", height: "100px" ,border: "1px solid #eee" }}> <text style={{ marginTop: "-20px", float: "left" }}>1</text> <br />All</Button>

              <Button  style={{ background: "white", color: "black", width: "130px", height: "100px",border: "1px solid #eee" }}> <text style={{ marginTop: "-20px", float: "left" }}>1</text> <br />Secondary</Button>
              <Button  style={{ background: "white", color: "black", width: "50px", height: "100px" ,border: "1px solid #eee"}}>
                <i aria-hidden="true" class="angle right  icon"></i>
              </Button>


            </ButtonGroup>
          </Grid.Column>
          <Grid.Column width={4}>
            <text>Jobs</text>
            <ButtonGroup className="mt-3">

              <Button  style={{ background: "white", color: "black", width: "130px", height: "100px",border: "1px solid #eee" }}> <text style={{ marginTop: "-20px", float: "left" }}>1</text> <br />All</Button>
              <Button  style={{ background: "white", color: "black", width: "130px", height: "100px",border: "1px solid #eee" }}><text style={{ marginTop: "-20px", float: "left" }}>1</text> <br /> Secondary</Button>

            </ButtonGroup>
          </Grid.Column>
          <Grid.Column width={4}>
            <text>Combined</text>
            <ButtonGroup className="mt-3">

              <Button style={{ background: "white", color: "black", width: "130px", height: "100px",border: "1px solid #eee" }}> <text style={{ marginTop: "-20px", float: "left" }}>1</text> <br />All</Button>
              <Button  style={{ background: "white", color: "black", width: "130px", height: "100px" ,border: "1px solid #eee"}}><text style={{ marginTop: "-20px", float: "left" }}>1</text> <br /> Secondary</Button>

            </ButtonGroup>     </Grid.Column>
          <Grid.Column width={2}>
            <text>Archived</text>
            <ButtonGroup className="mt-3">

              <Button  style={{ background: "white", color: "black", width: "130px", height: "100px",border: "1px solid #eee" }}>0</Button>

            </ButtonGroup>    </Grid.Column>

        </Grid>
        <br /><br />

        <Navs />

        {/* <DropdownButton style={{ backgroundColor: "white" }}>
          <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
          <Dropdown.Item eventKey="2">Archive</Dropdown.Item>

        </DropdownButton> */}
      </div>
    )
  }
}
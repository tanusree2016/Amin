import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Divider, Image, Icon, Form, Input, Checkbox } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';
const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

export default class Calendars extends Component {

    state = {}
    handleChange = (e, { value }) => this.setState({ value })
    render() {
        const { value } = this.state
        return (

            <div style={{ background: "white", borderRadius: "10px 10px 0 0" }}>
                <div style={{ height: "70px", background: "white", borderRadius: "10px 10px 0 0", padding: "10px" }}>
                    <div style={{ padding: "10px" }}><Button style={{ float: "right", }}>Save</Button>
                        <text style={{ fontSize: "25px" }}>Dashboard Settings</text><br />
                        <text>Customize your dashboard.</text>
                    </div>
                </div>
                <Divider></Divider>
                <div style={{ padding: "20px", background: "white" }}>
                    <div >
                        <text>Financial Indicators</text><br />
                        <div>
                           <text><Checkbox toggle label="Off"
                              
                            /> </text> <br />
                            <text>Dashboard Color Scheme:</text><br /><br />
                            <div style={{ padding: "20px", background: "white" }}>
                            <Form>
                           

                            <Grid columns={3} >
                           
    <Grid.Row>
      <Grid.Column>
      <Form.Radio
                                       label='Default'
                                        value='sm'
                                        checked={value === 'sm'}
                                        onChange={this.handleChange}
                                        color="#66ffff"
                                    />
                                    <Button attached='left' style={{background:"#66ffff"}}></Button>
                                    <Button attached='right'style={{background:" #ccffff"}}></Button>
      </Grid.Column>
      <Grid.Column>
      <Form.Radio
                                      
                                      label='Big Baby Blue
                                      '
                                      value='md'
                                      checked={value === 'md'}
                                      onChange={this.handleChange}
                                  />
                                    <Button attached='left' style={{background:"#0099ff"}}></Button>
                                    <Button attached='right' style={{background:"#b3e0ff"}}></Button>
      </Grid.Column>
      <Grid.Column>
      <Form.Radio
                                      label='Orange Sky
                                      '
                                        value='lg'
                                        checked={value === 'lg'}
                                        onChange={this.handleChange}
                                    />
                                      <Button attached='left' style={{background:"#ff9933"}}></Button>
                                    <Button attached='right' style={{background:"#ffd9b3"}}></Button>
      </Grid.Column>
    </Grid.Row>
   
    <Grid.Row>
      <Grid.Column>
      <Form.Radio
                                   
                                   label='Purple Rain
                                   '
                                    value='s'
                                    checked={value === 's'}
                                    onChange={this.handleChange}
                                />
                                      <Button attached='left' style={{background:"#6600cc"}}></Button>
                                    <Button attached='right' style={{background:"#d9b3ff"}}></Button>
      </Grid.Column>
      <Grid.Column>
      <Form.Radio
                                      
                                      label='Really Red'
                                      value='m'
                                      checked={value === 'm'}
                                      onChange={this.handleChange}
                                  />
                                   <Button attached='left' style={{background:"#ff0000"}}></Button>
                                    <Button attached='right' style={{background:"#ffcccc"}}></Button>
      </Grid.Column>
      <Grid.Column>
      <Form.Radio
                                        
                                        label='Dark Knight
                                        '
                                          value='l'
                                          checked={value === 'l'}
                                          onChange={this.handleChange}
                                      />
                                          <Button attached='left' style={{background:"grey"}}></Button>
                                    <Button attached='right' style={{background:"#ddd"}}></Button>
      </Grid.Column>
    </Grid.Row>

  </Grid>

                                

                            </Form>

</div>
                        </div>

                    </div>




                </div>

            </div>



        )
    }
}
import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Divider, Image, Icon, Form, Input,Checkbox ,Popup} from 'semantic-ui-react';
import { SketchPicker } from 'react-color';
const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

export default class Calendars extends Component {
    render() {
        return (

            <div style={{ background: "white", borderRadius: "10px 10px 0 0" }}>
                <div style={{ height: "70px", background: "white", borderRadius: "10px 10px 0 0", padding: "10px" }}>
                    <div style={{ padding: "10px" }}><Button style={{ float: "right", }}>Save</Button>
                        <text style={{ fontSize: "25px" }}>Portal Settings</text><br />
                        <text>To preview a portal click view from a client.</text>
                    </div>
                </div>
                <Divider></Divider>
                <div style={{ padding: "20px", background: "white" }}>
              
                    <div >
                    <Form>
                   
                        <Grid>
                            <Grid.Row centered columns={3}>
                                <Grid.Column>
                                  
                                    <div >
                                    <label><b>Portal Welcome Message</b> &nbsp;&nbsp;
                                    
                                    <Popup
          trigger={  <Icon name="question circle"/>}
          content='Overrides default portal welcome message'
          position='right center'
        />
                                    
                                   </label>
                                            <Form.Group widths='equal'>
                                            
                                                <Form.Field
                                                    id='form-input-control-first-name'
                                                    control={Input}
                                                   
                                                    placeholder='Portal Welcome Message'
                                                />
                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <Form.Field>
                                                    <Checkbox label='Hide welcome message
' />
                                                </Form.Field>
                                            </Form.Group>
                                            <Form.Group widths='equal'>
                                                <Form.Field

                                                >
                                                   
                                                    <label><b>Portal Projects Label Overridee</b> &nbsp;&nbsp;
                                                    <Popup
          trigger={ <Icon name="question circle"/>}
          content='Overrides the default project tab label'
          position='right center'
        />
                                                    
                                                    </label>
                                                    <input placeholder='Projects' />
                                                </Form.Field>
                                                </Form.Group>
                                              
                                                <label><b>Portal Specific Logo</b> &nbsp;&nbsp;
                                                <Popup
          trigger={ <Icon name="question circle"/>}
          content='Overrides default brand logo for portal login page and banner'
          position='right center'
        />
                                                
                                               </label><br/>
                                                
                                        <Button secondary style={{ width: "230px" }}>Upload </Button>
                                        <br/><br/>
                                        <Form.Group widths='equal'>
                                                <Form.Field>
                                                    <Checkbox label='Hide welcome message
' />
                                                </Form.Field>
                                            </Form.Group>

                                        <label style={{ float: "right",}}><input type="file" style={{display:"none" }} /></label>
                                    </div>


                                </Grid.Column>
                                <Grid.Column>
                                  
                                   
                                    <label><b>Portal Banner</b> &nbsp;&nbsp;
                                    <Popup
          trigger={<Icon name="question circle"/>}
          content='General banner image for desktop view'
          position='right center'
        />
                                    </label><br/><br/>
                                    <Button secondary style={{ width: "230px" }}>Upload </Button>
                                    <br/><br/>
                                  
                                    <label><b>Portal Mobile Device Banner</b>&nbsp;&nbsp;
                                    <Popup
          trigger={<Icon name="question circle"/>}
          content='Overrides desktop view on device with a width smaller than 768 pixels'
          position='right center'
        />
                                     </label><br/><br/>
                                    <Button secondary style={{ width: "230px" }}>Upload </Button>
                                     


                                </Grid.Column>
                                <Grid.Column>
                                   

                                    <label><b>Portal Banner Color</b></label><br/>
                                    <input type="color" style={{ width: "230px" }} /><br/><br/>
                                    <label><b>Portal Banner Font Color</b></label><br/>
                                    <input type="color" style={{ width: "230px" }} /><br/><br/>
                                    <label><b>Portal Summary Header Color</b></label><br/>
                                    <input type="color" style={{ width: "230px" }} /><br/><br/>
                                    <label><b>Portal Summary Header Font Color</b></label><br/>
                                    <input type="color" style={{ width: "230px" }} /><br/><br/>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <div>
                        <text style={{fontSize:"25px",color:"grey"}}>Links and Embed Code</text><br />
                        <text>Any client with an active portal and password set can access their portal through this link.</text><br/>
                        <label><b>Portal Link</b></label><br/>
                        <text style={{fontSize:"12px"}}>Any client with an active portal and password set can access their portal through this link.</text><br />
                        
                        
                        <Form.TextArea  placeholder='https://hello.dubsado.com:443/public/client/portal/5d652d9b313d4f69f68b1bb2' />


<label><b>Portal Embed Code</b><Icon name="cut"/></label><br/>
<Form.TextArea  placeholder='<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.14/iframeResizer.min.js"></script><iframe src="https://hello.dubsado.com:443/public/client/portal/5d652d9b313d4f69f68b1bb2?iframe=true" frameBorder="0" width="100%" height="750"></iframe><script type="text/javascript">setTimeout(function(){iFrameResize({checkOrigin: false});},30);</script>' />

                     
                        </div>
                        
                        </Form>

                    </div>




                </div>

            </div>



        )
    }
}
import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Image, Divider, Icon, Form } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom'
import QuesUploadModal from './forms/QuesUploadModal'
class Forms extends Component {
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "60px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
                    <Button style={{ float: "right", }}>Template Library</Button>
                    <text style={{ float: "right" }}></text>

                    <text style={{ float: "right" }}></text>
                    <text style={{ float: "right" }}></text><text style={{ color: "white" }}><h3>Forms</h3></text>

                </div>
                <div style={{ background: "white" }}>
                    <div style={{ padding: "20px", marginLeft: "30px" }}>
                        <Grid>
                            <Grid.Row columns={5}>
                                <Grid.Column>
                                    <div style={{ height: "40px", padding: "5px ", background: "pink", borderRadius: "10px 10px 0 0", }}>

                                        <text style={{ fontSize: "18px", paddingLeft: "5px" }}>Contacts  <text style={{ fontSize: "24px", paddingLeft: "65px" }}><Link to="/contacts" style={{ textDecoration: 'none', color: "black" }}>+ </Link></text>       </text>
                                    </div>
                                    <Divider></Divider>
                                    <div>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                        <Divider></Divider>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                        <Divider></Divider>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div style={{ height: "40px", padding: "5px", background: "pink", borderRadius: "10px 10px 0 0", }}>

                                        <text style={{ fontSize: "18px", paddingLeft: "5px" }}>Sub-Agreements  <text style={{ fontSize: "24px", paddingLeft: "3px" }}><Link to="/subarguments" style={{ textDecoration: 'none', color: "black" }}>+ </Link> </text> </text>
                                    </div>
                                    <Divider></Divider>
                                    <div>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />

                                        <text>fdggghgh</text><br />
                                        <Divider></Divider>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                        <Divider></Divider>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div style={{ height: "40px", padding: "5px", background: "pink", borderRadius: "10px 10px 0 0", }}>
                                        <Form><Form.Group inline>
                                        <text style={{ fontSize: "18px", paddingLeft: "5px" }}>Questionnaires</text>&nbsp;&nbsp;<QuesUploadModal /><text style={{ fontSize: "24px" }}><Link to="/questionnaires" style={{ textDecoration: 'none', color: "black" }}>+ </Link> </text>
                                        </Form.Group></Form>
                                        
                                    </div>
                                    <Divider></Divider>
                                    <div>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                        <Divider></Divider>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                        <Divider></Divider>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div style={{ height: "40px", padding: "5px", background: "pink", borderRadius: "10px 10px 0 0", }}>

                                        <text style={{ fontSize: "18px", paddingLeft: "5px" }}>Proposal  <text style={{ fontSize: "24px", paddingLeft: "65px" }}><Link to="/Proposal" style={{ textDecoration: 'none', color: "black" }}>+ </Link></text> </text>

                                    </div>
                                    <Divider></Divider>
                                    <div>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                        <Divider></Divider>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                        <Divider></Divider>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div style={{ height: "40px", padding: "5px", background: "pink", borderRadius: "10px 10px 0 0", }}>

                                        <text style={{ fontSize: "18px", paddingLeft: "5px" }}>Lead Capture  <text style={{ fontSize: "24px", paddingLeft: "30px" }}><Link to="/leadcapture" style={{ textDecoration: 'none', color: "black" }}>+ </Link></text> </text>

                                    </div>
                                    <Divider></Divider>
                                    <div>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                        <Divider></Divider>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                        <Divider></Divider>
                                        <text>fdggghgh</text><br />
                                        <Button.Group style={{ float: "right" }}>
                                            <Button icon='copy outline' style={{ background: "black", color: "white" }} />

                                            <Button icon='trash' style={{ background: "orange", color: "white" }} />
                                        </Button.Group>
                                        <text>fdggghgh</text><br />
                                        <text>fdggghgh</text><br />
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </div>

                </div>

            </div>



        )
    }
}

export default withRouter(Forms);
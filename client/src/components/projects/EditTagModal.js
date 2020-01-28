import React, { Component, useState } from 'react'
import { Button, Modal, Form, ButtonToolbar, OverlayTrigger, Col,Row, Tooltip, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Divider,Segment } from 'semantic-ui-react'
import DateRange from './DateRange';
import AddDate from './AddDate'
import PropTypes from 'prop-types';
import './hvr.css'
import { connect } from 'react-redux';
import { createProject } from './CreateNewProject'

class NewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag_name: ''

        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleShow = (show) => {
        this.setState({
            show: show
        })
    }

    render() {
        // const list = this.state.createproject.map(item => {
        //     return <h1>{item.dub_project}</h1>
        // })
        //    {if(projectTitle===this.state.projectTitle&&client===this.state.client&&status===this.state.status)?}
        return (

            <div>
                <>

                    {/* <Button color='green' onClick={() => this.handleShow(true)}>New Project</Button> */}
                    {/* <Button color='#eee' floated="right" style={{ border: "1px solid #aaa" }} onClick={() => this.handleShow(true)}>Add Tag</Button> */}
                  
                            
                            <div style={{width:"20px",height:"15px"}} onClick={() => this.handleShow(true)}>Edit</div>
                            
                           
                  
                    <Modal
                        size="lg"
                        show={this.state.show}
                        onHide={() => this.handleShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Add Tag
                     </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form onSubmit={this.handleSubmit} >
                                <Form.Group controlId="formBasicEmail">

                                    <Form.Label>Tag name</Form.Label>
                                    <Row>
                                        <Col>
                                        <ButtonGroup>
                                        <Form.Control type="text" placeholder="Tag name" name="tag_name" value={this.state.project_title} onChange={this.handleChange} required />
                                        <Form.Control type="color" style={{padding:"0px", width:"30px"}}/>
                                        </ButtonGroup>
                                    
                                    </Col>
                                  
                                    </Row>
                                </Form.Group>


                                <Button variant="secondary" onClick={() => this.handleShow(false)} style={{marginLeft:"150px"}}>
                                    Cancel
                            </Button>&nbsp;
                            <Button variant="secondary" onClick={() => this.handleShow(false)} >
                                    Delete
                            </Button>&nbsp;
                            <Button variant="secondary" onClick={() => this.handleShow(false)} >
                                    Archive
                            </Button>&nbsp;
                            <Button variant="primary" disabled={!this.state.funnel_name} type="submit" >
                                    Save
                            </Button>

                            </Form>
                        </Modal.Body>
                    </Modal>
                </>

            </div>

        )
    }
}




NewProject.propTypes = {
    //classes: PropTypes.object.isRequired,
    createProject: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { createProject })(NewProject);


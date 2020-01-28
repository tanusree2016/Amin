import React, { Component, useState } from 'react'
import { Button, Modal, Form, ButtonToolbar, OverlayTrigger, Col, Tooltip } from 'react-bootstrap';

import { Dropdown, Divider,Icon } from 'semantic-ui-react'
import DateRange from './DateRange';
import AddDate from './AddDate'
import PropTypes from 'prop-types';
import './hvr.css'
import { connect } from 'react-redux';
import {createProject} from './CreateNewProject'


const options = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
    { key: 'design', text: 'Graphic Design', value: 'design' },
    { key: 'ember', text: 'Ember', value: 'ember' },
    { key: 'html', text: 'HTML', value: 'html' },
    { key: 'ia', text: 'Information Architecture', value: 'ia' },
    { key: 'javascript', text: 'Javascript', value: 'javascript' },
    { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
    { key: 'meteor', text: 'Meteor', value: 'meteor' },
    { key: 'node', text: 'NodeJS', value: 'node' },
    { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'rails', text: 'Rails', value: 'rails' },
    { key: 'react', text: 'React', value: 'react' },
    { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
    { key: 'ruby', text: 'Ruby', value: 'ruby' },
    { key: 'ui', text: 'UI Design', value: 'ui' },
    { key: 'ux', text: 'User Experience', value: 'ux' },
  ]
  

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project_title: '',
            client_id: 0,
            status: 0,
            first_name: '',
            last_name: '',
            company_name: '',
            emailaddress: '',
            phoneno: '',
           
            tag_id: 0,
            notes: '',
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: '',
            is_all_day: '',
            show_me: '',
            available: '',
            busy: '',
            createproject: []

        }
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleShow = (show) => {
        this.setState({
            show: show
        })
    }

    handleData = () => {
        fetch('/list')
            .then(response => response.json())
            .then(res2 => this.setState({ createproject: res2 }));

    }


    handleClick = (e, id) => {
        id = id + 1

        document.getElementById(id).style.display = "block";
        document.getElementById(id + 4).required = true;

    }
    handleDate = (e, id) => {
        id = id + 1
        if (document.getElementById(id).style.display == "none") {
            document.getElementById(id).style.display = "block";
            document.getElementById(id + 1).innerHTML = "Hide Dates"

        }

        else {
            if (document.getElementById(id + 1).innerHTML = "Hide Dates")
                document.getElementById(id + 1).innerHTML = "Add Dates"

            document.getElementById(id).style.display = "none";

        }
    }

    resetField = () => {
        this.setState({
            project_title: '',
            client_id: 0,
            status: 0,
            first_name: '',
            last_name: '',
            company_name: '',
            email: '',
            phone_number: '',
            status: '',
            tag_id: 0,
            notes: '',
        });
    }

  

    handleSubmit=(event)=>{
        event.preventDefault();
        let createProject = {

            project_title: this.state.project_title,
            client_id: parseInt(this.state.client_id),
            status: parseInt(this.state.status),
            tag_id: parseInt(this.state.tag_id),
            notes: this.state.notes,
        
        }
        alert(this.state.client_id)
     


        console.log("")
       
        this.props.createProject(createProject, this.props.history);
        this.resetField();
    }



    componentDidMount = () => {
        this.handleData();
    }


    render() {
            return (

            <div>
                <>

                    <div style={{width:"135px",height:"15px"}} onClick={() => this.handleShow(true)}>Edit Appointment</div>
                    <Modal
                        show={this.state.show}
                        onHide={() => this.handleShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                        size="lg"
                    
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Edit Appointment  <text style={{marginLeft:"400px"}}><Icon name="briefcase" size="large" /></text>
                     </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form onSubmit={this.handleSubmit} >
                                <Form.Group controlId="formBasicEmail">

                                    <Form.Label><b>Title*</b></Form.Label>
                                    <Form.Control type="text" placeholder="Enter project title here" name="project_title" value={this.state.project_title} onChange={this.handleChange} required />

                                </Form.Group>


                                <div id="4" style={{   width: "650px",}}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">

                                            <AddDate />







                                        </Form.Group>

                                    </Form.Row>

                                </div>


                                <Form.Group controlId="formBasicPassword">
                                
                                       
                                            <Form.Label><b>Project</b></Form.Label>
                                            <Form.Control as="select" name="client_id" value={this.state.client_id} onChange={this.handleChange} required >
                                                <option>Select a project</option>
                                                <option>Project1</option>
                                                <option>Project2</option>
                                            </Form.Control>
                                      

                                      

                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label><b>Location</b></Form.Label>
                                    <Form.Control  as="textarea" rows="2" type="text" name="notes" placeholder="Add some notes" value={this.state.notes} onChange={this.handleChange} />
                         
                                </Form.Group> 

                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label><b>Discription</b></Form.Label>
                                   <Form.Control  as="textarea" rows="2" type="text" name="notes" placeholder="Add some notes" value={this.state.notes} onChange={this.handleChange} />
                          
                                </Form.Group> 
                                

                               


                               

                               

                                {/* 
                                <AddDate /> */}
                                <div id="3"></div>
                                {/* <button class="btn btn-light" onClick={(e) => this.handleDate(e, 3)} style={{width:"650px"}} >
                                    Create New Client
                                            </button><br /><br /> */}
                               

                                <Divider></Divider>
                                

                                <Button variant="secondary" onClick={() => this.handleShow(false)} style={{ marginLeft: "400px" }}>
                                        Cancel
                            </Button>&nbsp;&nbsp;
                            <Button variant="secondary" onClick={() => this.handleShow(false)} >
                                        Delete
                            </Button>&nbsp;&nbsp;
                            <Button variant="secondary" disabled={!(this.state.project_title)} type="submit" style={{ marginRight: "30px", background: "#e9768d" }}>
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




AddProject.propTypes = {
    //classes: PropTypes.object.isRequired,
    createProject: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    project: state.project,
    errors: state.errors
  });
   
  //export default withStyles(styles)(Company);
  export default connect(mapStateToProps, {createProject})(AddProject);


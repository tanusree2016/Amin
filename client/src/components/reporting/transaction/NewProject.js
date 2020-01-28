import React, { Component, useState } from 'react'
import { Button, Modal, Form, ButtonToolbar, OverlayTrigger, Col, Tooltip } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Divider } from 'semantic-ui-react'
import DateRange from './DateRange';
import AddDate from './AddDate'
import PropTypes from 'prop-types';
import './hvr.css'
import { connect } from 'react-redux';
import {createProject} from './CreateNewProject'

class NewProject extends Component {
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

    // handleSubmit = (event) => {
    //     //   console.log(this.state.)

    //     alert('A list was submitted: ' + this.state.client + "" + this.state.projectTitle
    //         + "" + this.state.status + "" + this.state.firstname + "" + this.state.lastname
    //         + "" + this.state.companyname + "" + this.state.emailaddress + "" + this.state.phoneno
    //         + "" + this.state.tags + "" + this.state.notes + "" + this.state.allday);
    //     event.preventDefault();
    //     var data = new URLSearchParams();
    //     for (const pair of new FormData(event.target)) {
    //         data.append(pair[0], pair[1])
    //     }
    //     //localhost:5000/sent
    //     fetch('/create-project', {
    //         method: "post",
    //         body: data,

    //     }).then(res => res.json())
    //         .then(res2 => {
    //             console.log(res2)

    //             this.setState({
    //                 createproject: [...this.state.createproject, res2]
    //             })
    //         });
    // }

    handleSubmit=(event)=>{
        event.preventDefault();
        let createProject = {

            project_title: this.state.project_title,
            client_id: parseInt(this.state.client_id),
            status: parseInt(this.state.status),
            tag_id: parseInt(this.state.tag_id),
            notes: this.state.notes,
            // start_date: '',
            // end_date: '',
            // start_time: '',
            // end_time: '',
            // is_all_day: '',
            // show_me: '',
            // available: '',
            // busy: ''

        }
        alert(this.state.client_id)
        // const createNewClient = {

        //     first_name: this.state.first_name,
        //     last_name: this.state.last_name,
        //     company_name: this.state.company_name,
        //     email: this.state.email,
        //     phone_number: this.state.phone_number,

        // }


        console.log("")
        //this.props.createNewClient(createNewClient, this.props.history);
        this.props.createProject(createProject, this.props.history);
        this.resetField();
    }



    componentDidMount = () => {
        this.handleData();
    }


    render() {
        // const list = this.state.createproject.map(item => {
        //     return <h1>{item.dub_project}</h1>
        // })
        //    {if(projectTitle===this.state.projectTitle&&client===this.state.client&&status===this.state.status)?}
        return (

            <div>
                <>

                    <Button style={{background:"#e9768d",color:"white"}} onClick={() => this.handleShow(true)}>New Project</Button>
                    <Modal
                        show={this.state.show}
                        onHide={() => this.handleShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                        size="xl"

                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Create a new project
                     </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form onSubmit={this.handleSubmit} >
                                <Form.Group controlId="formBasicEmail">

                                    <Form.Label>Project Title*</Form.Label>
                                    <Form.Control type="text" placeholder="Enter project title here" name="project_title" value={this.state.project_title} onChange={this.handleChange} required />

                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Label>Client*</Form.Label>
                                            <Form.Control as="select" name="client_id" value={this.state.client_id} onChange={this.handleChange} required >
                                                <option>Select a client</option>
                                                <option>Client1</option>
                                                <option>Client2</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Or</Form.Label><br />
                                            {/* <Button variant="light">Create New Client</Button> */}

                                            <div id="1"></div>

                                            <div className="hvr" onClick={(e) => this.handleClick(e, 1)} style={{ background: "rgb(250,250,250)", width: "50%", height: "35px", textAlign: "center", paddingTop: "7px" }}>
                                                Create New Client
                                            </div><br /><br />
                                        </Form.Group>

                                    </Form.Row>

                                </Form.Group>



                                <div id="2" style={{ display: "none", background: "rgb(250,250,250)", width: "648px" }}>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>First Name*</Form.Label>
                                            <Form.Control type="text" name="first_name" placeholder="First Name" id="6" value={this.state.first_name} onChange={this.handleChange} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.handleChange} />
                                        </Form.Group>
                                    </Form.Row>


                                    <Divider horizontal>Optional</Divider>

                                    <Form.Group>
                                        <Form.Control type="text" name="company_name" placeholder="Company Name" value={this.state.company_name} onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Row>

                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control type="email" name="email" placeholder="Enter an email address" value={this.state.email} onChange={this.handleChange} />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control type="text" name="phone_number" placeholder="Enter a phone no." value={this.state.phone_number} onChange={this.handleChange} />
                                        </Form.Group>
                                    </Form.Row>

                                </div>


                                <Form.Group>
                                    <Form.Label>Status*</Form.Label>
                                    <Form.Label style={{ float: "right" }}> <ButtonToolbar >
                                        {['top'].map(placement => (
                                            <OverlayTrigger
                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                    <Tooltip id={`tooltip-${placement}`} style={{ width: "100px" }}>
                                                        Assign a status to this project to help you keep track of the progress you made
                                                 </Tooltip>
                                                }
                                            >
                                                <text style={{color:"#e9768d"}}>What is this?</text>
                                            </OverlayTrigger>
                                        ))}
                                    </ButtonToolbar></Form.Label>

                                    {/* <Form.Label>State</Form.Label> */}
                                    <Form.Control as="select" name="status" value={this.state.status} onChange={this.handleChange} required>
                                        <option>Select your project status</option>
                                        <option>Status1</option>
                                        <option>Status2</option>
                                    </Form.Control>

                                </Form.Group>


                                <Divider horizontal>Optional</Divider>



                                <Form.Group>
                                    <Form.Label>Tags</Form.Label>
                                    <Form.Label style={{ float: "right" }}> <ButtonToolbar>
                                        {['top'].map(placement => (
                                            <OverlayTrigger
                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                    <Tooltip id={`tooltip-${placement}`} style={{ width: "100px" }}>
                                                        Assign tags to this project to help you identify it and search for it later
                                                 </Tooltip>
                                                }
                                            >
                                                <text style={{ color:"#e9768d"}}>What is this?</text>
                                            </OverlayTrigger>
                                        ))}
                                    </ButtonToolbar></Form.Label>
                                    <Form.Control as="select" value={this.state.tags} onChange={this.handleChange}>
                                        <option>Select a tag</option>
                                        <option>...</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control type="text" name="notes" placeholder="Add some notes" value={this.state.notes} onChange={this.handleChange} />
                                </Form.Group>

                                {/* 
                                <AddDate /> */}
                                <div id="3"></div>
                                {/* <button class="btn btn-light" onClick={(e) => this.handleDate(e, 3)} style={{width:"650px"}} >
                                    Create New Client
                                            </button><br /><br /> */}
                                <div className="hvr" onClick={(e) => this.handleDate(e, 3)} style={{ background: "rgb(250,250,250)", width: "650px", height: "35px", textAlign: "center", paddingTop: "7px" }}>
                                    <text id="5">Add Dates</text>
                                </div><br /><br />


                                <div id="4" style={{ display: "none", background: "rgb(250,250,250)" }}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">

                                            <AddDate />







                                        </Form.Group>

                                    </Form.Row>

                                </div>
                                <br /><br />

                                <Button variant="secondary" onClick={() => this.handleShow(false)} style={{ float: "right" }}>
                                    Cancel
                            </Button>&nbsp;
                            <Button  disabled={!(this.state.project_title && this.state.client_id && this.state.status)} type="submit" style={{ float: "right", marginRight: "30px",background:"#e9768d" }}>
                                    Submit
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
  export default connect(mapStateToProps, {createProject})(NewProject);


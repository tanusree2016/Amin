import React, { Component, useState } from 'react'


import { Modal, Form,Button, Dropdown, Divider } from 'semantic-ui-react'

import AddDate from './AddDate'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
//import { addAppointment} from './appointment/AppointmentApi'




class AddAppointmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
     

            id: '',
            title: '',
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: '',
            is_all_day: '',
            show_me: '',
            project_id:'',
            location : '',
            description:'',
          

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
            id: 0,
            title: '',
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: '',
            is_all_day: '',
            show_me: '',
            project_id:'',
            location : '',
            description:'',
        });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        let addAppointment = {

            title: this.state.title,
            // start_date: '',
            // end_date: '',
            // start_time: '',
            // end_time: '',
            // is_all_day: '',
            // show_me: '',
            project_id: this.state.project_id,
            location : this.state.location,
            description: this.state.description,

        }
      


       

        this.props.addAppointment(addAppointment, this.props.history);
        this.resetField();
    }



    // componentDidMount = () => {
    //     this.handleData();
    // }


    render() {
        return (

            <div>
                <>

                    <div style={{ width: "135px", height: "15px" }} onClick={() => this.handleShow(true)}>Appointment</div>
                    <Modal
                        show={this.state.show}
                        onHide={() => this.handleShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                        size="lg"

                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Add Appointment
                     </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form onSubmit={this.handleSubmit} >
                                <Form.Group controlId="formBasicEmail">

                                    <Form.Label>Title*</Form.Label>
                                    <Form.Control type="text" placeholder="Enter project title here" name="title" value={this.state.title} onChange={this.handleChange} />

                                </Form.Group>


                                <div id="4" style={{ background: "rgb(250,250,250)", width: "650px", }}>
                                   
                                        <Form.Group >

                                            <AddDate />







                                        </Form.Group>

                            

                                </div>


                                <Form.Group controlId="formBasicPassword">


                                    <Form.Label>Project</Form.Label>
                                    <Form.Control as="select" name="project_id" value={this.state.project_id} onChange={this.handleChange} >
                                        <option>Select a project</option>
                                        <option>Project1</option>
                                        <option>Project2</option>
                                    </Form.Control>




                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control as="textarea" rows="2" type="text" name="location" placeholder="Add some notes" value={this.state.location} onChange={this.handleChange} />

                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Discription</Form.Label>
                                    <Form.Control as="textarea" rows="2" type="text" name="description" placeholder="Add some notes" value={this.state.description} onChange={this.handleChange} />

                                </Form.Group>









                                {/* 
                                <AddDate /> */}
                                <div id="3"></div>
                                {/* <button class="btn btn-light" onClick={(e) => this.handleDate(e, 3)} style={{width:"650px"}} >
                                    Create New Client
                                            </button><br /><br /> */}


                                <Divider></Divider>


                                <Button secondary onClick={() => this.handleShow(false)} style={{ float: "right" }}>
                                    Cancel
                            </Button>&nbsp;
                            <Button primary disabled={!(this.state.title)} type="submit" style={{ float: "right", }}>
                                    Create
                            </Button>

                            </Form>
                        </Modal.Body>
                    </Modal>
                </>

            </div>

        )
    }
}




AddAppointmentModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    //addAppointment: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps)(AddAppointmentModal);


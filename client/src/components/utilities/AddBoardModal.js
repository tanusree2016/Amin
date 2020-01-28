import React, { Component, useState } from 'react'


import { Dropdown, Divider,Button, Modal, Form, } from 'semantic-ui-react'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
//import { createProject } from './CreateNewProject'


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


class AddBoardModal extends Component {
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

    handleCheck = (e, id) => {

        if ((document.getElementById(id).style.display == "block")) { document.getElementById(id).style.display = "none"; }

        else if ((document.getElementById(id).style.display == "none")) {
            document.getElementById(id).style.display = "block";

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
            project: '',
            assignee: ''
        });
    }



    handleSubmit = (event) => {
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

                    <div style={{ width: "70px", height: "15px" }} onClick={() => this.handleShow(true)}>Add Board</div>
                   
                   
                   
                    <Modal
                        show={this.state.show}
                        onHide={() => this.handleShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                        size="lg"

                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Board
                     </Modal.Title>
                        </Modal.Header>
                        <br/>
                        <Modal.Body>


                            <Form onSubmit={this.handleSubmit} >
                                <Form.Group controlId="formBasicEmail">

                                    <Form.Label><b>Name</b></Form.Label>
                                    <Form.Control type="text" placeholder="Enter project title here" name="project_title" value={this.state.project_title} onChange={this.handleChange} required />

                                </Form.Group>


                                <div id="4" style={{width: "500px", }}>
                                   

                                </div>


                                <Form.Group controlId="formBasicPassword">


                                    <Form.Label><b>Project</b></Form.Label>
                                    <Form.Control as="select" name="client_id" value={this.state.project} onChange={this.handleChange} required >
                                        <option>Select a project</option>
                                        <option>Project1</option>
                                        <option>Project2</option>
                                    </Form.Control>




                                </Form.Group><br/><br/>
                              

                                <Divider></Divider>


                                <Button variant="secondary" onClick={() => this.handleShow(false)} style={{ float: "right" }}>
                                    Cancel
                            </Button>&nbsp;
                            <Button variant="secondary" disabled={!(this.state.project_title)} type="submit" style={{ float: "right", marginRight: "30px", background: "#e9768d" }}>
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




AddBoardModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    //createProject: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps,)(AddBoardModal);


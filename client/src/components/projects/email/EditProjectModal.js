import React, { Component, useState } from 'react'


import { Modal, Form, Button, Dropdown, Divider, Icon, Grid, Segment ,Image} from 'semantic-ui-react'


import { connect } from 'react-redux';
//import { createProject } from './CreateNewProject'




class EditClientModal extends Component {
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
            createproject: [],
            open: false

        }
        //this.handleSubmit = this.handleSubmit.bind(this);
    }


    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

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
        const { open, size } = this.state
        return (

            <div>

                <Icon name="pencil" onClick={this.show('small')} />


                <Modal size={size} open={open} onClose={this.close}>
                    <Modal.Header>Edit Project Details</Modal.Header>
                    <Modal.Content>
                        
                    <Form>
                      

                                  
                                    <Form.Field>
                                        <label>Contact Name</label>
                                        <input placeholder='Facebook username' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Location Name</label>
                                        <input placeholder='Twitter username' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Address Line 1</label>
                                        <input placeholder='Instagram username' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Line 2</label>
                                        <input placeholder='Website url' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>City</label>
                                        <input placeholder='Pinterest username' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>State / Province</label>
                                        <input placeholder='Instagram username' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Zip / Postal</label>
                                        <input placeholder='Website url' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Country</label>
                                        <input placeholder='Pinterest username' />
                                    </Form.Field>
                                  
                        
                        
                       
                        </Form>
                    
                           

                    </Modal.Content>
                  
                    <Modal.Actions>
                    <Button secondary>Cancel</Button>
                    <Button secondary>Save</Button>
                 
                    </Modal.Actions>
               
                </Modal>
            </div>

        )
    }
}




EditClientModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    //createProject: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps)(EditClientModal);


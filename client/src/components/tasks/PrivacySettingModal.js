import React, { Component, useState } from 'react'
import { Button, Modal, ButtonToolbar, OverlayTrigger, Col, Tooltip, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Divider, Form, Radio } from 'semantic-ui-react'
import DateRange from './DateRange';
import AddTaskDate from './AddTaskDate'
import PropTypes from 'prop-types';
import './hvr.css'
import { connect } from 'react-redux';
import { createProject } from './CreateNewProject'


class AddBoardModal extends Component {
    constructor(props) {
        super(props);
        this.state = {}
      
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e, { value }) => this.setState({ value })
    handleShow = (show) => {
        this.setState({
            show: show
        })
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
        //this.handleData();
    }


    render() {
        return (

            <div>
                <>

                    <div style={{ height: "15px" }} onClick={() => this.handleShow(true)}>Privacy Settings</div>



                    <Modal
                        show={this.state.show}
                        onHide={() => this.handleShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                        size="lg"

                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Privacy Settings
                     </Modal.Title>
                        </Modal.Header>
                        <br />
                        <Modal.Body>


                            <Form>
                              
                                <Form.Field>
                                    <Radio
                                        label='Admin & Assigned users'
                                        name='radioGroup'
                                        value='this'
                                        checked={this.state.value === 'this'}
                                        onChange={this.handleChange}
                                    /><br/>
                                    <text style={{fontSize:"12px",paddingLeft:"25px"}}>Only the admin and assigned users will be able to edit, create and assign tasks</text>
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='Client Portal'
                                        name='radioGroup'
                                        value='that'
                                        checked={this.state.value === 'that'}
                                        onChange={this.handleChange}
                                    /><br/>
                                    <text style={{fontSize:"12px",paddingLeft:"25px"}}>All clients will be able to edit, create and assign tasks</text>
                                </Form.Field>



                                <Divider></Divider>


                                <Button variant="secondary" onClick={() => this.handleShow(false)} style={{ float: "right" }}>
                                    Cancel
                            </Button>&nbsp;
                            <Button variant="secondary" disabled={!(this.state.project_title)} type="submit" style={{ float: "right", marginRight: "30px", background: "#e9768d" }}>
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




AddBoardModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    createProject: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { createProject })(AddBoardModal);


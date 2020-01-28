import React, { Component, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Checkbox } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import './hvr.css'
import { connect } from 'react-redux';
import { createProject } from './CreateNewProject'

class NewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            funnel_name: '',


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
                    {/* <Button color='#eee' floated="right" style={{ border: "1px solid #aaa" }} onClick={() => this.handleShow(true)}>Add Status</Button> */}
                    <Button variant="secondary" style={{ background: "white", color: "black", width: "130px", height: "112px", display: "inline" }} onClick={() => this.handleShow(true)}> <text style={{ marginTop: "-20px", float: "left" }}>1</text> <Checkbox style={{ float: "right", marginTop: "-20px" }} /> <br />All</Button>

                    <Modal
                        show={this.state.show}
                        onHide={() => this.handleShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"


                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Edit Funnel
                     </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form onSubmit={this.handleSubmit} >
                                <Form.Group>

                                    <Form.Label>Funnel Name</Form.Label>
                                    <Form.Control type="text" placeholder="Funnel Name" name="funnel_name" value={this.state.project_title} onChange={this.handleChange} required />

                                </Form.Group>
                                <Form.Group >

                                    <Form.Check
                                        type="radio"
                                        label="Lead"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"

                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Job"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                    />
                                </Form.Group>


                                <Button variant="secondary" onClick={() => this.handleShow(false)} style={{marginLeft:"150px"}}>
                                    Cancel
                            </Button>&nbsp;
                            <Button variant="secondary" onClick={() => this.handleShow(false)} >
                                    Delete
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



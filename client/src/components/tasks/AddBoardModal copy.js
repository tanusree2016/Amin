import React, { Component, useState } from 'react'
import { Modal, Form, ButtonToolbar, OverlayTrigger, Col, Tooltip,DropdownButton } from 'react-bootstrap';
import { Button, Dropdown, Divider, } from 'semantic-ui-react'

import PropTypes from 'prop-types';
import './hvr.css'
import { connect } from 'react-redux';
import { addBoard } from './taskandboard/BoardApi'


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
           name : '',
           project : '',
          // privacy : ''

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


    resetField = () => {
        this.setState({
            name : '',
           project : '',
          // privacy : ''

        });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        let addBoard = {

            name : this.state.name,
            project : this.state.project,
            //privacy : this.state.privacy
 
        }
        this.props.addBoard(addBoard, this.props.history);
        this.resetField();
    }





    render() {
        return (

            <div>
                <>

                    <div  onClick={() => this.handleShow(true)}>Add Board</div>
                   
                   
                   
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
                                    <Form.Control type="text" placeholder="Enter name" name="name" value={this.state.name} onChange={this.handleChange}/>

                                </Form.Group>


                                <div id="4" style={{width: "500px", }}>
                                   

                                </div>


                                <Form.Group controlId="formBasicPassword">


                                    <Form.Label><b>Project</b></Form.Label>
                                    <Form.Control as="select" name="project" value={this.state.project} onChange={this.handleChange} >
                                        <option>Select a project</option>
                                        <option>Project1</option>
                                        <option>Project2</option>
                                    </Form.Control>




                                </Form.Group><br/><br/>
                              

                                <Divider></Divider>


                            <Button primary disabled={!(this.state.name)} type="submit" style={{ float: "right" }}>
                                    Create
                            </Button>

                            </Form>
                            
                            <Button secondary onClick={() => this.handleShow(false)} style={{ float: "right" }}>
                                    Cancel
                            </Button>&nbsp;
                        </Modal.Body>
                    </Modal>
                </>
</div>

        )
    }
}




AddBoardModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    addBoard: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    task: state.task,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { addBoard })(AddBoardModal);


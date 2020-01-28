import React, { Component, useState } from 'react'


import {Modal, Form, Button,Dropdown, Divider ,TextArea} from 'semantic-ui-react'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
//import {addTag } from './customize/AddTagApi'

class AddNotesModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: '',
            open:false

        }
    }

    close = () => this.setState({open:false});

    show =(size) =>()=>{
        this.setState({
            open:true,
            size
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleShow = (show) => {
        this.setState({
            show: show
        })
    }

    resetField =()=>{
        this.setState({

            tag : '',
         
        })
    }

    // handleSubmit = (e)=>{

    //     e.preventDefault();

    //     let addTag = {
    //         tag : this.state.tag,
           
    //     }

    //     this.props.addTag(addTag, this.props.history);
    //     this.resetField();
    //     this.handleShow(false);
       
    // }

    render() {

        const {open,size} = this.state;

        // const list = this.state.createproject.map(item => {
        //     return <h1>{item.dub_project}</h1>
        // })
        //    {if(projectTitle===this.state.projectTitle&&client===this.state.client&&status===this.state.status)?}
        return (

            <div>
                <>

                    {/* <Button color='green' onClick={() => this.handleShow(true)}>New Project</Button> */}
                    <Button secondary onClick={this.show("small")}>Add Notes</Button>
                 

                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header> Add Note to yuiuiuyiuyiui</Modal.Header>
                        <Modal.Content>

                 


                            <Form  >
                                <Form.Group >

                                <TextArea placeholder='Tell us more' />
                                </Form.Group>



                      
                            <Button primary disabled={!(this.state.tag)} type="submit"  style={{ float: "right" }}>
                                    Add
                            </Button>

                            </Form>
                            <Button secondary onClick={this.close} style={{ float: "right" }}>
                                    Cancel
                            </Button>&nbsp;<br/><br/>
                            
                            </Modal.Content>
                    </Modal>
                </>

            </div>

        )
    }
}




AddNotesModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    //addTag: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//     project: state.project,
//     errors: state.errors
// });

//export default withStyles(styles)(Company);
export default connect(null)(AddNotesModal);


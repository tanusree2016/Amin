import React, { Component, useState } from 'react'


import { Modal, Form, Button, Dropdown, Divider } from 'semantic-ui-react'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]


//import { addStatus } from './customize/AddStatusApi'

class ExpensesModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status_name: '',
            status_category: 0,
            open: false


        }
    }

    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

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

            status_name: '',
            status_category: ''
        })
    }

    // handleSubmit = (e) => {

    //     e.preventDefault();

    //     let addStatus = {
    //         status_name: this.state.status_name,
    //         status_category: this.state.status_category
    //     }

    //     this.props.addStatus(addStatus, this.props.history);
    //     this.resetField();
    //    this.handleShow(false);
    // }

    render() {

        const { open, size } = this.state;
        // const list = this.state.createproject.map(item => {
        //     return <h1>{item.dub_project}</h1>
        // })
        //    {if(projectTitle===this.state.projectTitle&&client===this.state.client&&status===this.state.status)?}
        return (

            <div>
                <>

                    {/* <Button color='green' onClick={() => this.handleShow(true)}>New Project</Button> */}
                    <Button onClick={this.show("small")}>Add Status</Button>

                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>Add Funnel</Modal.Header>
                        <Modal.Content>



                            <Form  >
                                <Form.Group widths='equal'>
                                    <Form.Input label='First name' placeholder='First name' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input label='Last name' placeholder='Last name' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input label='Last name' placeholder='Last name' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.TextArea label='About' placeholder='Tell us more about you...' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Select

                                        label='Gender'
                                        options={options}
                                        placeholder='Gender'
                                    />
                                </Form.Group>



                                <Form.Select

                                    label='Gender'
                                    options={options}
                                    placeholder='Gender'
                                />
                                <Button>dsfd</Button>

                                <hr />


                          
                            <Button primary disabled={!this.state.status_name} type="submit" style={{ float: "right"}}>
                                    Save
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




ExpensesModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    //addStatus: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//     status: state.status,
//     errors: state.errors
// });

//export default withStyles(styles)(Company);
export default connect(null)(ExpensesModal);



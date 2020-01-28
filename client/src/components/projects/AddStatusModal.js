import React, { Component, useState } from 'react'


import { Modal, Form, Button, Dropdown, Divider } from 'semantic-ui-react'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { addStatus } from './customize/AddStatusApi'

class AddStatusModal extends Component {
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

    handleSubmit = (e) => {

        e.preventDefault();

        let addStatus = {
            status_name: this.state.status_name,
            status_category: this.state.status_category
        }

        this.props.addStatus(addStatus, this.props.history);
        this.resetField();
        this.handleShow(false);
    }

    render() {
        const { value, size, open } = this.state
           return (

            <div>
                <>


                    <Button onClick={this.show('small')}>Add Status</Button>
                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>Add Funnel</Modal.Header>
                        <Modal.Content>
                            <Form onSubmit={this.handleSubmit} >

                                <Form.Field>
                                    <label>Funnel Name</label>
                                    <input placeholder='Funnel Name' name="status_name" value={this.state.status_name} onChange={this.handleChange} />
                                </Form.Field>
                                <Form.Group inline>
                                    <label>Size</label>
                                    <Form.Radio
                                        label='Lead'
                                        value='sm'
                                        checked={value === 'sm'}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Radio
                                        label='Job'
                                        value='md'
                                        checked={value === 'md'}
                                        onChange={this.handleChange}
                                    />

                                </Form.Group>




                                <Button primary disabled={!this.state.status_name} type="submit" style={{ float: "right", marginRight: "30px" }}>
                                    Save
                                </Button>

                            </Form>
                            <Button secondary onClick={this.close} style={{ float: "right" }}>
                                Cancel
                            </Button>&nbsp;
                        </Modal.Content>

                        <br />
                    </Modal>
                </>

            </div>

        )
    }
}




AddStatusModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    addStatus: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//     status: state.status,
//     errors: state.errors
// });

//export default withStyles(styles)(Company);
export default connect(null, { addStatus })(AddStatusModal);



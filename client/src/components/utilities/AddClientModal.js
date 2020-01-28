import React, { Component, useState } from 'react'


import { Modal, Dropdown, Divider, Form, Button, } from 'semantic-ui-react'


import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addClient } from './client/ClientApi'




class AddClientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            company_name: '',
            email: '',
            phone_number: '',
            quick_notes: '',
            open: false

        }
        //this.handleSubmit = this.handleSubmit.bind(this);
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
            first_name: '',
            last_name: '',
            company_name: '',
            email: '',
            phone_number: '',
            quick_notes: ''

        });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        alert("ok")
        let addClient = {

            first_name: this.state.first_name,
            last_name: this.state.last_name,
            company_name: this.state.company_name,
            email: this.state.email,
            phone_number: this.state.phone_number,
            quick_notes: this.state.quick_notes
        }






        this.props.addClient(addClient, this.props.history);
        this.resetField();
        this.handleShow(false);
    }




    render() {

        const { open, size } = this.state;

        return (

            <div>
                <>

                    <div style={{ width: "80px", height: "15px", fontSize: "12px", }} onClick={this.show('small')}>Add Client</div>


                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>    Add Client</Modal.Header>
                        <Modal.Content>



                            <Form onSubmit={this.handleSubmit}>
                                <div >
                                    <Form.Field>
                                        <label>First Name</label>
                                        <input placeholder='First Name' name="first_name" value={this.state.first_name} onChange={this.handleChange} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Last Name</label>
                                        <input placeholder='Last Name' name="last_name" value={this.state.last_name} onChange={this.handleChange} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Phone Number</label>
                                        <input placeholder='First Name' name="phone_number" value={this.state.phone_number} onChange={this.handleChange} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Email Address</label>
                                        <input placeholder='Last Name' name="email" value={this.state.email} onChange={this.handleChange} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Company Name</label>
                                        <input placeholder='First Name' name="company_name" value={this.state.company_name} onChange={this.handleChange} />
                                    </Form.Field>

                                    <Form.TextArea label='Quick Note' placeholder='Tell us more about you...' name="quick_notes" value={this.state.quick_notes} onChange={this.handleChange} />


                                </div>







                                <Divider></Divider>



                                <Button primary disabled={!(this.state.first_name)} type="submit" style={{ float: "right", marginRight: "30px", }}>
                                    Add and create project
                            </Button>

                            </Form>
                            <Button secondary onClick={this.close} style={{ float: "right" }}>
                                Cancel
                            </Button>&nbsp;
                            </Modal.Content>
                    </Modal>
                </>

            </div>

        )
    }
}




AddClientModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    addClient: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    clients: state.clients,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { addClient })(AddClientModal);


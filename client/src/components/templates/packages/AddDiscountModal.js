import React, { Component, useState } from 'react'


import { Button, Dropdown, Divider, Form, Input, Select, Label, Modal, } from 'semantic-ui-react'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addDiscount } from './DiscountApi'

const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]
class AddDiscountModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discount_name: '',
            discount_type: '',
            value: '',
            discount_code: '',
            category: '',
            max_noof_users: 0,
            expiration_date: '',
            open: false

        }
    }

    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    resetField = () => {
        this.setState({
            discount_name: '',
            discount_type: '',
            value: '',
            discount_code: '',
            category: '',
            max_noof_users: 0,
            expiration_date: '',


        })
    }

    handleSubmit = (e) => {

        e.preventDefault();

        let addDiscount = {

            discount_name: this.state.discount_name,
            discount_type: this.state.discount_type,
            value: this.state.value,
            discount_code: this.state.discount_code,
            category: this.state.category,
            max_noof_users: parseInt(this.state.max_noof_users),
            expiration_date: this.state.expiration_date,

        }

        this.props.addDiscount(addDiscount, this.props.history);
        this.resetField();
        this.close();

    }

    handleDiscountChange = (e, { value }) => this.setState((prevState, props) => {
        let newState = { ...prevState }
        newState.discount_type = value;
        return { ...newState };
    });
    
    handleCategoryChange = (e, { value }) => this.setState((prevState, props) => {
      let newState = { ...prevState }
      newState.category = value;
      return { ...newState };
    });

    
    render() {
        const { open, size } = this.state;
        // const list = this.state.createproject.map(item => {
        //     return <h1>{item.dub_project}</h1>
        // })
        //    {if(projectTitle===this.state.projectTitle&&client===this.state.client&&status===this.state.status)?}
        return (

            <div >
                <>

                    {/* <Button color='green' onClick={() => this.handleShow(true)}>New Project</Button> */}
                    <Button color='#eee' floated="right" style={{ border: "1px solid #aaa" }} onClick={this.show('small')}>Add Discount</Button>
                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header> Add Discount</Modal.Header>
                        <Modal.Content>

                            <div >

                                <Form onSubmit={this.handleSubmit} >
                                    <Form.Field
                                        id='form-input-control-last-name'
                                        control={Input}
                                        label='Discount name*'
                                        placeholder='Enter a discount name'
                                        name="discount_name"
                                        value={this.state.discount_name}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Field >
                                        <label>Discount type*</label>
                                        <Dropdown
                                            fluid
                                            selection
                                            multiple={false}
                                            search={true}
                                            options={genderOptions}
                                            value={this.state.discount_type}
                                            placeholder='Select your project status'
                                            onChange={this.handleDiscountChange}

                                            disabled={false}
                                            loading={false}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Value*</label>
                                        <Input label='$' placeholder='mysite.com' type="number"
                                            name="value"
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field
                                        id='form-input-control-last-name'
                                        control={Input}
                                        label='Discount code'
                                        placeholder='Enter a code(If applicable)'
                                        name="discount_code"
                                        value={this.state.discount_code}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Field >
                                        <label>Discount type*</label>
                                        <Dropdown
                                            fluid
                                            selection
                                            multiple={false}
                                            search={true}
                                            options={genderOptions}
                                            value={this.state.category}
                                            placeholder='Select your category'
                                            onChange={this.handleCategoryChange}

                                            disabled={false}
                                            loading={false}
                                        />
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Max. number of uses</label>
                                        <Input type="number"
                                            name="max_noof_users"
                                            value={this.state.max_noof_users}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Expiration date</label>
                                        <Input placeholder='Select a date' type="date"
                                            name="expiration_date"
                                            value={this.state.expiration_date}
                                            onChange={this.handleChange}

                                        />
                                    </Form.Field>


                                    <Button primary disabled={!(this.state.discount_name)} type="submit" style={{ float: "right" }}>
                                        Save
                            </Button>

                                </Form>
                                <Button secondary onClick={this.close} style={{ float: "right" }}>
                                    Cancel
                            </Button>&nbsp;<br /><br />
                            </div>
                        </Modal.Content>
                    </Modal>
                </>

            </div>

        )
    }
}




AddDiscountModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    addDiscount: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//     project: state.project,
//     errors: state.errors
// });

//export default withStyles(styles)(Company);
export default connect(null, { addDiscount })(AddDiscountModal);


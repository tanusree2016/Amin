import React, { Component, useState } from 'react'

import envirionment from '../../../common/utils/envirionment'
import {Modal, Form, Dropdown, Divider, Button, Icon } from 'semantic-ui-react'
import _ from 'lodash'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addTransaction } from './TransactionApi'

const options = [
    { key: 'm', text: 'Select a client', value: 'male' },
    { key: 'f', text: 'Tax Item-20%', value: 'female' },
    { key: 'o', text: 'Tax Item-10%', value: 'other' },
]



class TaxPaymentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tax:'',
            amount: '',
            method: '',
            date: '',
            description: '',
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
            amount: '',
            method: '',
            date: '',
            description: '',
            tax: '',
          
        });
    }


    handleSubmit = (event) => {
        event.preventDefault();
        let addTransaction = {

            amount: this.state.amount,
            method: this.state.method,
            date: this.state.date,
            description: this.state.description,
            tax: this.state.tax,
        
        }


        console.log("")
        //this.props.createNewClient(createNewClient, this.props.history);
        this.props.addTransaction(addTransaction, this.props.history);
        this.resetField();
    }




    render() {

        const { open, size } = this.state;
       
            return (

            <div>
                <>

                    <Button onClick={this.show('medium')}>Tax Payment &nbsp; <Icon size="small" name="plus" /></Button>
                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header> Add Tax Payment</Modal.Header>
                        <Modal.Content>

                            <Form onSubmit={this.handleSubmit} >

                            <Form.Field >
                                        <label>Tax</label>
                                        <Dropdown
                                            fluid
                                            selection
                                            multiple={false}
                                            search={true}
                                            options={options}
                                            value={this.state.tax}
                                            placeholder='Select your project status'
                                            onChange={this.handleStatusChange}

                                            disabled={false}
                                            loading={false}
                                        />
                                    </Form.Field>

                                    <Form.Field>
                                            <label>Amount</label>
                                            <input type="number" placeholder="$0.00" name="amount" value={this.state.amount} onChange={this.handleChange} />
                                        </Form.Field>

                                        <Form.Field >
                                        <label>Method</label>
                                        <Dropdown
                                            fluid
                                            selection
                                            multiple={false}
                                            search={true}
                                            options={options}
                                            value={this.state.method}
                                            placeholder='Select your project status'
                                            onChange={this.handleStatusChange}

                                            disabled={false}
                                            loading={false}
                                        />
                                    </Form.Field>

                                    <Form.Field>
                                            <label>Date</label>
                                            <input type="date" placeholder="Enter project title here" name="date" value={this.state.date} onChange={this.handleChange} />
                                        </Form.Field>
                               
                                        
                               
                                        <Form.TextArea label='Description' placeholder='Tell us more about you...' name="description" value={this.state.description} onChange={this.handleChange} />

              
                            






                                <br /><br />

                               
                            <Button primary type="submit" style={{ float: "right", marginRight: "30px", }}>
                                    Add
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




TaxPaymentModal.propTypes = {
    addTransaction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    project: state.project,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps,{ addTransaction })(TaxPaymentModal);


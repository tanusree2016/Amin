import React, { Component, useState } from 'react'


import { Modal, Form, Button, Dropdown, Divider, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addExpense } from './ChartOfAccountApi'

const options = [
    { key: 'm', text: 'Cost of goods', value: 'Cost of goods' },
    { key: 'f', text: 'Operating', value: 'Operating' },
    { key: 'o', text: 'Non-Operating', value: 'Non-Operating' },
]



class ExpenseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expense_name: '',
            expense_type: '',
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

            expense_name: '',
            expense_type: '',

        });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        let addExpense = {

            expense_name: this.state.expense_name,
            expense_type: this.state.expense_type,

        }




        console.log("")

        this.props.addExpense(addExpense, this.props.history);
        this.resetField();
    }

    handleExpenseChange = (e, { value }) => this.setState((prevState, props) => {
        let newState = { ...prevState }
        newState.expense_type = value;
        return { ...newState };
    });



    render() {

        const { open, size } = this.state;

        return (

            <div>
                <>

                    <div style={{ height: "15px" }} onClick={this.show('small')}>Expense Category&nbsp;<Icon name="plus" /></div>


                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>  Add Expense Category </Modal.Header>
                        <Modal.Content>



                            <Form onSubmit={this.handleSubmit} >
                            <Form.Field>
                                    <label>Name</label>
                                    <input type="text" name="expense_name" value={this.state.expense_name} onChange={this.handleChange} />
                                </Form.Field>

                                <Form.Field >
                                    <label>Status*</label>
                                    <Dropdown
                                        fluid
                                        selection
                                        multiple={false}
                                        search={true}
                                        options={options}
                                        value={this.state.expense_type}
                                        placeholder='Select your income type'
                                        onChange={this.handleExpenseChange}

                                        disabled={false}
                                        loading={false}
                                    />
                                </Form.Field>


                              


                                <br /><br />


                                <Divider></Divider>



                                <Button primary disabled={!(this.state.expense_name)} type="submit" style={{ float: "right", marginRight: "30px", }}>
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




ExpenseModal.propTypes = {

    addExpense: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    incexp: state.incexp,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { addExpense })(ExpenseModal);


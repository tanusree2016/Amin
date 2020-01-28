import React, { Component, useState } from 'react'

import { Modal, Form, Button, Dropdown, Divider, Icon } from 'semantic-ui-react'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addIncome } from './ChartOfAccountApi'

const options = [
    { key: 'm', text: 'Sales', value: 'Sales' },
    { key: 'f', text: 'Service', value: 'Service' },
    { key: 'o', text: 'OthNon-Operatinger', value: 'OthNon-Operatinger' },
]



class IncomeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            income_name: '',
            income_type: '',
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

            income_name: '',
            income_type: '',

        });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        let addIncome = {

            income_name: this.state.income_name,
            income_type: this.state.income_type,

        }




        console.log("")

        this.props.addIncome(addIncome, this.props.history);
        this.resetField();
    }


    handleIncomeChange = (e, { value }) => this.setState((prevState, props) => {
        let newState = { ...prevState }
        newState.income_type = value;
        return { ...newState };
    });


    render() {

        const { open, size } = this.state;

        return (

            <div>
                <>


                    <div style={{ height: "15px" }} onClick={this.show('small')}>Income Category&nbsp;<Icon name="plus" /></div>

                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>  Add Income Category </Modal.Header>
                        <Modal.Content>



                            <Form onSubmit={this.handleSubmit} >

                                <Form.Field>
                                    <label>Name</label>
                                    <input name="income_name" value={this.state.income_name} onChange={this.handleChange} />
                                </Form.Field>

                                <Form.Field >
                                    <label>Status*</label>
                                    <Dropdown
                                        fluid
                                        selection
                                        multiple={false}
                                        search={true}
                                        options={options}
                                        value={this.state.income_type}
                                        placeholder='Select your income type'
                                        onChange={this.handleIncomeChange}

                                        disabled={false}
                                        loading={false}
                                    />
                                </Form.Field>





                                <br /><br />


                                <Divider></Divider>



                                <Button primary disabled={!(this.state.income_name)} type="submit" style={{ float: "right", marginRight: "30px", }}>
                                    Add
                            </Button>

                            </Form>
                            <Button secondary onClick={this.close} style={{ float: "right" }}>
                                Cancel
                            </Button>&nbsp;<br /><br />
                        </Modal.Content>
                    </Modal>
                </>
            </div>

        )
    }
}




IncomeModal.propTypes = {

    addIncome: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    incexp: state.incexp,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { addIncome })(IncomeModal);


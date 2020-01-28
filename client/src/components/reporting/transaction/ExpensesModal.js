import React, { Component, useState } from 'react'

import envirionment from '../../../common/utils/envirionment'
import { Dropdown, Divider, Button, Icon, Modal, Form, } from 'semantic-ui-react'
import _ from 'lodash'
import PropTypes from 'prop-types';
import moment from 'moment'
import { connect } from 'react-redux';
import { addTransaction } from './TransactionApi'

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

class ExpensesModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            method: '',
            date: new Date(),
            description: '',
            project: '',
            incomecategory: 0,
            name: '',
            projectList: [],
            id: 0,
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
    // handleDate =() => {
    //     this.setState({
    //       date: this.state.date
    //     });
    //   };



    handleData() {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + "project/list", {

            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded ' }
        }).then(res => res.json())
            .then(res2 => {
                console.log("Size --- " + res2.list.length);

                console.log('project list------' + JSON.stringify(this.state.data));

                this.setState({
                    projectList: res2.list,

                })


            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }


    componentDidMount = () => {
        this.handleData();

    }
    handleClick = (e, id) => {
        id = id + 1

        document.getElementById(id).style.display = "none";
        document.getElementById(id + 1).style.display = "block";

    }

    resetField = () => {
        this.setState({
            amount: '',
            method: '',
            date: '',
            description: '',
            project: '',
            expensescategory: 0,
            name: ''
        });
    }


    handleSubmit = (event) => {
        event.preventDefault();
        let addTransaction = {

            amount: this.state.amount,
            method: this.state.method,
            date: this.state.date,
            description: this.state.description,
            project: this.state.project,
            expensescategory: parseInt(this.state.expensescategory),
            name: this.state.name

        }


        console.log("")
        //this.props.createNewClient(createNewClient, this.props.history);
        this.props.addTransaction(addTransaction, this.props.history);
        this.resetField();
    }




    render() {
        const { projectList, open, size } = this.state;

        const projectlist = _.map(projectList, ({ project_title, id, i }) => (
            { id }
        ))

        return (

            <div>
                <>

                    <Button onClick={this.show('medium')}>Expenses &nbsp; <Icon size="small" name="plus" /></Button>

                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>   Add Expenses</Modal.Header>
                        <Modal.Content>




                            <Form onSubmit={this.handleSubmit} >



                                <Form.Field>
                                    <label>Amount</label>
                                    <input type="number" placeholder="$0.00" name="amount" value={this.state.amount} onChange={this.handleChange} />
                                </Form.Field>

                                <Form.Field>
                                    <label>Method</label>
                                    <input type="text" name="method" value={this.state.method} onChange={this.handleChange} />
                                </Form.Field>

                                <Form.Field>
                                    <label>Method</label>
                                    <input type="text" name="method" value={this.state.method} onChange={this.handleChange} />
                                </Form.Field>

                                <Form.Field>
                                    <label>Date</label>
                                    <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
                                </Form.Field>



                                <Form.TextArea label='Description' placeholder='Tell us more about you...' name="description" value={this.state.description} onChange={this.handleChange} />

                                <Form.Field >
                                    <label>Status*</label>
                                    <Dropdown
                                        fluid
                                        selection
                                        multiple={false}
                                        search={true}
                                        options={projectlist}
                                        value={this.state.status}
                                        placeholder='Select your project status'
                                        onChange={this.handleStatusChange}

                                        disabled={false}
                                        loading={false}
                                    />
                                </Form.Field>




                                <div id="11"></div>
                                <div id="12" style={{ display: "block" }}>


                                    <Form.Field >
                                        <label>Expenses Category</label>
                                        <Dropdown
                                            fluid
                                            selection
                                            multiple={false}
                                            search={true}
                                            options={options}
                                            value={this.state.expensescategory}
                                            placeholder='Select your project status'
                                            onChange={this.handleStatusChange}

                                            disabled={false}
                                            loading={false}
                                        />
                                    </Form.Field>

                                    <Button onClick={(e) => this.handleClick(e, 11)}>New Category</Button>

                                </div>
                                <div id="13" style={{ display: "none" }}>
                                    <Form.Group inline>


                                        <Form.Field>
                                            <label>Name</label>
                                            <input type="text" placeholder="Enter project title here" name="name" value={this.state.name} onChange={this.handleChange} />
                                        </Form.Field>

                                        <Form.Field>
                                            <label>Type</label>
                                            <input type="text" placeholder="Enter project title here" name="incomecategory" value={this.state.incomecategory} onChange={this.handleChange} />
                                        </Form.Field>



                                        <Button secondary>Cancel</Button>


                                        <Button primary>Create</Button>

                                    </Form.Group>

                                </div>






                                <br /><br />


                                <Button primary type="submit" style={{ float: "right", marginRight: "30px", }}>
                                    Submit
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




ExpensesModal.propTypes = {

    addTransaction: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    transaction: state.transaction,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { addTransaction })(ExpensesModal);


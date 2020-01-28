import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Input,Form } from 'semantic-ui-react';
//import AddTaskModal from './ProjectSources/AddTaskModal'
//import AddSourceModal from './ProjectSources/AddSourceModal'
import TransactionSortTable from './transaction/TransactionSortTable'
import IncomeModal from './transaction/IncomeModal'
import ExpensesModal from './transaction/ExpensesModal'
import TaxPaymentModal from './transaction/TaxPaymentModal'

const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

export default class Calendars extends Component {
    


    handleDate = (e, id) => {
        id = id + 1
        if (document.getElementById(id).style.display == "none") {
            document.getElementById(id).style.display = "block";
            document.getElementById(id + 1).innerHTML = "Show"

        }

        else {
            if (document.getElementById(id + 1).innerHTML = "Show")
                document.getElementById(id + 1).innerHTML = "reset / close"

            document.getElementById(id).style.display = "none";

        }
    }
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "80px", padding: "15px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
                    <Button style={{ float: "right", }}>Export as CSV</Button>
                    <text style={{ float: "right", }}><IncomeModal/></text>
                    <text style={{ float: "right", }}><ExpensesModal/></text>
                    <text style={{ float: "right", }}><TaxPaymentModal/></text>
                    <text style={{ fontSize: "25px", color: "white" }}>Transactions</text><br />
                </div>
                <div style={{ padding: "20px", background: "white" }}>
                    <div>
                        <div id="3"></div>
                        {/* <button class="btn btn-light" onClick={(e) => this.handleDate(e, 3)} style={{width:"650px"}} >
                                    Create New Client
                                            </button><br /><br /> */}
                        <div className="hvr" onClick={(e) => this.handleDate(e, 3)} style={{ background: "rgb(250,250,250)", height: "35px", textAlign: "center", paddingTop: "7px" }}>
                            <text>Filter</text>&nbsp;<text id="5" style={{ color: "pink" }}>Show</text>
                        </div><br /><br />


                        <div id="4" style={{ display: "none", background: "rgb(250,250,250)",padding:"20px" }}>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Field label='From Date:' control='input' type="date" />
                                    <Form.Field label='To Date:' control='input' type="date" icon='search'/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field label='From Amount:' control='input' />
                                    <Form.Field label='To Amount:' control='input' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field label='Projects:' control='input' />
                                    <Form.Field label='Income Category:' control='input' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field label='Expense Category:
' control='input' />
                                    <Form.Field label='Tax:' control='input' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field label='Description:' control='input' />
                                    <Form.Field label='Method:
' control='input' />
                                </Form.Group>
                            </Form>

                        </div>

                    </div>

                    <TransactionSortTable />
                </div>

            </div>



        )
    }
}
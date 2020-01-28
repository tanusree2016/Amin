import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Input, Menu, Icon, Popup } from 'semantic-ui-react';
//import AddTaskModal from './ProjectSources/AddTaskModal'
//import AddSourceModal from './ProjectSources/AddSourceModal'
import IncomeSortTable from './chartofaccounts/IncomeSortTable'
import IncomeModal from './chartofaccounts/IncomeModal'
import ExpensesSortTable from './chartofaccounts/ExpensesSortTable'
import ExpensesModal from './chartofaccounts/ExpensesModal'
import DatePickers from './chartofaccounts/DatePickers'
const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

export default class ChartOfAccounts extends Component {
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "80px", padding: "15px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
                    <Button style={{ float: "right", }}>Export Profit and Loss</Button>
                    <text style={{ fontSize: "25px", color: "white" }}>Chart of Accounts</text><br />
                </div>
                <div style={{ padding: "20px", background: "white" }}>
                    {/* <Menu borderless={true} style={{ border: "none" }}>
                        <Menu.Item >
                            <Button>Last 365 Days</Button>
                        </Menu.Item>

                        <Menu.Item>
                            <Button>Year To Date</Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button>Last 3 Months</Button>
                        </Menu.Item>

                        <Menu.Item>
                            <Button>Last Month</Button>
                        </Menu.Item>
                        <Menu.Item>
                          
                        </Menu.Item>


                    </Menu> */}
                    <Button>Last 365 Days</Button>
                    <Button>Year To Date</Button>
                    <Button>Last 3 Months</Button>
                    <Button>Last Month</Button>


                    <Popup
                        content={<div style={{ width: "380px", height: "120px", padding: "20px" }}><DatePickers /> to <DatePickers />
                            <br />  <br />
                            <Button primary style={{ float: "right" }}>Apply</Button><Button secondary style={{ float: "right" }}>Cancel</Button>
                        </div>}
                        on='click'

                        position='bottom center'
                        trigger={<Button>Custom</Button>}

                    /><br /><br />


                    <div>
                        <text style={{ fontSize: "25px" }}>Income</text> <Button basic style={{ background: "white", float: "right" }}> <IncomeModal /> </Button>

                        <IncomeSortTable />

                    </div><br />
                    <div>
                        <text style={{ fontSize: "25px" }}>Expenses</text> <Button basic style={{ background: "white", float: "right" }}> <ExpensesModal /> </Button>

                        <ExpensesSortTable />

                    </div>

                </div>


            </div>



        )
    }
}



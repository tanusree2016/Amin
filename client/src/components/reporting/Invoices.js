import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Input } from 'semantic-ui-react';
//import AddTaskModal from './ProjectSources/AddTaskModal'
//import AddSourceModal from './ProjectSources/AddSourceModal'
import InvoiceSortTable from './Invoices/InvoicesSortTable'
import InvoiceTabs from './Invoices/InvoiceTabs'

const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

export default class Calendars extends Component {
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "80px", padding: "15px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
                    <Button style={{ float: "right", }}>Export as CSV</Button>
                    <text style={{ fontSize: "25px", color: "white" }}>Invoices</text><br />
                </div>
                <div style={{ padding: "20px", background: "white" }}>

                  <InvoiceTabs/>
                </div>

            </div>



        )
    }
}



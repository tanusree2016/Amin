import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown } from 'semantic-ui-react';

import InvoiceTabs from './InvoiceTabs'

const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

export default class Invoices extends Component {
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "60px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>

                    <text style={{ color: "white" }}><h3>Invoices</h3></text>
                </div>
                <div style={{ padding: "5px", background: "white" }}>

                    <div>
                       
                    </div>
                    <div >
                        <InvoiceTabs />
                    </div>




                </div>

            </div>



        )
    }
}
import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown } from 'semantic-ui-react';
import PackageTabs from './packages/PackageTabs'
import AddDiscountModal from './packages/AddDiscountModal'
import { Link } from 'react-router-dom'

export default class Calendars extends Component {
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "70px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
                    <Button style={{ float: "right", }}>
                        <Link to='/packagesettings' style={{ textDecoration: "none", color: "black" }}>  Add Packages </Link>
                    </Button> <text style={{ float: "right", }}><AddDiscountModal /> </text>
                    <text style={{ float: "right" }}></text>

                    <text style={{ float: "right" }}></text>
                    <text style={{ float: "right" }}></text><text style={{ color: "white" }}><h3>Packages</h3></text>
                    <text style={{ fontSize: "12px", color: "white" }}>Create sets of invoice items</text>
                </div>
                <div style={{ padding: "5px", background: "white" }}>



                    <PackageTabs />

                </div>

            </div>



        )
    }
}
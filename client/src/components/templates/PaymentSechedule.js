import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Icon } from 'semantic-ui-react';
import swal from 'sweetalert'
import { Link } from 'react-router-dom'

export default class Calendars extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleAdd = () => {
        swal({
            title: "Create Payment Schedule",
            text: "Enter the name of the payment schedule you would like to create.",
            content: "input",
            buttons: {
                cancel: "Close",
                ok: "Ok"
            },
        })
            .then((value) => {
                swal(`You typed: ${value}`);
            });
    }

    handleDelete = () => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                }
            });
    }
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "70px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
                    <Button style={{ float: "right", }} onClick={this.handleAdd}>Add Payment Schedule</Button>
                    <text style={{ float: "right" }}></text>

                    <text style={{ float: "right" }}></text>
                    <text style={{ float: "right" }}></text><text style={{ color: "white" }}><h3>Payment Schedules</h3></text>
                    <text style={{ fontSize: "12px", color: "white" }}>Set up the payment schedules you apply to invoices</text>
                </div>
                <div style={{ padding: "20px", background: "white" }}>
                    <div >
                        <Segment style={{ height: "250px" }}>Very padded content.
                    <Icon name="trash" style={{ float: "right" }} onClick={this.handleDelete} />&nbsp;&nbsp;<Link to='/editpaymentschedule' style={{ textDecoration: "none", color: "black" }}> <Icon name="cog" style={{ float: "right" }} /></Link>

                        </Segment>
                        <Segment style={{ height: "250px" }}>Very padded content.
                    <Icon name="trash" style={{ float: "right" }} onClick={this.handleDelete} />&nbsp;&nbsp;<Link to='/editpaymentschedule' style={{ textDecoration: "none", color: "black" }}><Icon name="cog" style={{ float: "right" }} /></Link>

                        </Segment>
                        <Segment style={{ height: "250px" }}>Pay In Full (with Reminders)
                    <Icon name="trash" style={{ float: "right" }} onClick={this.handleDelete} />&nbsp;&nbsp;<Link to='/editpaymentschedule' style={{ textDecoration: "none", color: "black" }}><Icon name="cog" style={{ float: "right" }} /></Link>
                            <hr />
                            <text>(TBD) - 0 day(s) after invoice has been created</text>
                        </Segment>
                        <Segment style={{ height: "250px" }}>50/50
                    <Icon name="trash" style={{ float: "right" }} onClick={this.handleDelete} />&nbsp;&nbsp;<Link to='/editpaymentschedule' style={{ textDecoration: "none", color: "black" }}><Icon name="cog" style={{ float: "right" }} /></Link>
                            <hr />
                            <text>(TBD) - 0 day(s) after invoice has been created</text>
                            <hr />
                            <text>(TBD) - 0 day(s) after invoice has been created</text>
                        </Segment>
                        <Segment style={{ height: "250px" }}>34/33/33
                    <Icon name="trash" style={{ float: "right" }} onClick={this.handleDelete} />&nbsp;&nbsp;<Link to='/editpaymentschedule' style={{ textDecoration: "none", color: "black" }}> <Icon name="cog" style={{ float: "right" }} /></Link>
                            <hr />
                            <text>(TBD) - 0 day(s) after invoice has been created</text>
                            <hr />
                            <text>(TBD) - 0 day(s) after invoice has been created</text>
                            <hr />
                            <text>(TBD) - 0 day(s) after invoice has been created</text>
                        </Segment>
                    </div>




                </div>

            </div>



        )
    }
}
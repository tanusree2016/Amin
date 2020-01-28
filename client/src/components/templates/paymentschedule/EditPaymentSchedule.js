import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Input, Checkbox, ButtonGroup, Form, Divider ,Icon} from 'semantic-ui-react';
import NewDueDateModal from './NewDueDateModal'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import EditDueDateModal from './EditDueDateModal'
export default class EditPaymentSchedule extends Component {

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

                    <text style={{ float: "right" }}></text>

                    <text style={{ float: "right" }}></text>
                    <text style={{ float: "right" }}></text><text style={{ color: "white" }}><h3>Edit Payment Schedule</h3></text>

                </div>
                <div style={{ padding: "20px", background: "white", minHeight: "300px" }}>
                    <h2><i>(Needs Title)</i></h2>
                    <div style={{ padding: "20px", }}>

                        <Grid>

                            <Grid.Row columns={4}>
                                <Grid.Column>
                                    Due Date
                                </Grid.Column>
                                <Grid.Column>
                                    Amount Due
                                </Grid.Column>
                                <Grid.Column>
                                    Reminders
                                </Grid.Column>
                                <Grid.Column>
                                    Actions
                                </Grid.Column>
                            </Grid.Row>
                            <hr />
                            <Grid.Row columns={4}>
                                <Grid.Column>
                                    (TBD) - 3 day(s) before event
                                </Grid.Column>
                                <Grid.Column>
                                    (TBD) - 50% of remaining invoice
                                </Grid.Column>
                                <Grid.Column>

                                    (TBD) - 0 day(s) before payment due
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid style={{paddingLeft:"20px"}}>
                                        <Grid.Row>
                                            <Grid.Column>
                                            <EditDueDateModal/>
                                            </Grid.Column>
                                            <Grid.Column>
                                            <Icon name="trash"  onClick={this.handleDelete} />
                                                </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                            

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>


                    </div>
                    <hr />
                    <NewDueDateModal />
                    <Button style={{ float: "right" }}><Link to="/paymentschedule" style={{ textDecoration: "none", color: "black" }}>Save</Link></Button>

                </div></div>



        )
    }
}
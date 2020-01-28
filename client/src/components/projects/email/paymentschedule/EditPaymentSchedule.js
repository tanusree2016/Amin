import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Input, Checkbox, ButtonGroup, Form, Divider, Icon } from 'semantic-ui-react';
import NewDueDateModal from './NewDueDateModal'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import EditDueDateModal from './EditDueDateModal'
const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
  ]
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

            <div >


<Button.Group style={{float:"right"}}>
          <Button>Select Discount</Button>
          <Dropdown
            className='button icon'
            floating
            options={options}
            trigger={<React.Fragment />}
          />
        </Button.Group>
        <h3>Payment Schedule</h3><br/>

                <Grid style={{ paddingLeft: "20px" }} columns="equal">

                    <Grid.Row >
                        <Grid.Column>
                            Status
                                </Grid.Column>
                        <Grid.Column>
                            Due Date
                                </Grid.Column>
                        <Grid.Column>
                            Amount Due
                                </Grid.Column>
                        <Grid.Column>
                            Remaings
                                </Grid.Column>
                        <Grid.Column>
                            Reminders
                                </Grid.Column>
                        <Grid.Column>
                            Actions
                                </Grid.Column>
                    </Grid.Row>
                </Grid>
                <hr />
                <Grid style={{ paddingLeft: "20px" }} columns="equal">
                    <Grid.Row >
                        <Grid.Column>
                            Paid
                                </Grid.Column>
                        <Grid.Column>
                            (TBD) - 3 day(s) before event
                                </Grid.Column>
                        <Grid.Column>
                            (TBD) - 50% of remaining invoice
                                </Grid.Column>
                        <Grid.Column>

                          $100.00
                        </Grid.Column>
                        <Grid.Column>

                            (TBD) - 0 day(s) before payment due
                                </Grid.Column>
                        <Grid.Column>
                            <Grid style={{ paddingLeft: "20px" }}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <EditDueDateModal />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Icon name="trash" onClick={this.handleDelete} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>


                        </Grid.Column>
                    </Grid.Row>
                </Grid>


                <hr />
                <NewDueDateModal />


            </div>



        )
    }
}
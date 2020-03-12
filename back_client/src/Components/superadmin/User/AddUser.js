import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddUser extends Component {

    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <Typography variant="h5" gutterBottom paragraph>
                    Add User
                </Typography>

                <div>
                    <TextField style={textfieldHeight}
                        variant="outlined"
                        margin="dense"
                        required

                        id="username"
                        label="Employee Name"
                        name="planName"
                        value={this.state.planName}
                        onChange={(ev) => this.handleInputChangeValue(ev)}
                        autoFocus
                    />
                </div>
            </div>
        )
    }
}
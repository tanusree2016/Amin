import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { resetWarningCache } from 'prop-types';
import envirionment from '../../../common/utils/envirionment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import base_url from '../../../common/utils/axios';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';

import ListConsumer from './listConsumer';

mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}
var formData = null;

class AddConsumer extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            address: '',
            landmark: '',
            showChild: true,
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }


    reloadChild = () => {
        this.setState({
            showChild: false
        })

        setTimeout(() => {
            this.setState({
                showChild: true
            })
        }, 100);

        console.log("Reload Child Invoked")
    }

    checkEmail(event) {
        const validEmail = {
            email: this.state.email,
        }
        base_url.post('service/is_exits', validEmail, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    //swal("Plan is added successfully");
                    // let success = "Plan is added successfully"
                    // this.showAlert(success);
                }
                else {
                    showAlert(res.data.message);
                    this.setState({ email: '' });
                }
            })
            .catch(e => console.log(e))
    }

    handleInputChangeValue(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

    }

    handleSubmit(e) {
        e.preventDefault();

        const consumerAdd = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            address: this.state.address,
            landmark: this.state.landmark,
        }
        base_url.post('admin/add-consumer', consumerAdd, {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        }).then(res => {

            if (res.data.value == 1)
                showAlert("consumer is added successfully");
            else
                showAlert(res.data.message);
            this.reloadChild();
        })
            .catch(e => console.log(e))

        this.resetField();

    }

    resetField = () => {
        this.setState({ name: '' });
        this.setState({ email: '' });
        this.setState({ phone: '' });
        this.setState({ password: '' });
        this.setState({ address: '' });
        this.setState({ landmark: '' });

    }


    render() {

        const { open } = this.state;

        const stylesForm = {
            display: 'flex',
            flexWrap: 'wrap',
        };

        const stylesBotton = {
            marginTop: 20
        };

        const styles1 = {
            textAlign: 'center',
            paddingTop: '2',
        };

        const textfieldHeight = {
            width: 280,
            height: 50,
            marginLeft: 4,
            marginRight: 4,
            marginTop: 5,
        };

        const formControl = {
            minWidth: 150,
            marginLeft: 15,
        };
        return (
            <div style={styles1}>
                <form className="reg" encType="multipart/form-data" onSubmit={this.handleSubmit} >
                    <div id='1' style={stylesForm}>
                        <div id='2'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="name"
                                label="Full Name"
                                name="name"
                                value={this.state.name}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />

                        </div>

                        <div id='3'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="email"
                                label="Email id"
                                type="email"
                                name="email"
                                onBlur={(ev) => this.checkEmail(ev)}
                                value={this.state.email}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />
                        </div>

                        <div id='4'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="phone"
                                label="Phone"
                                name="phone"
                                type="number"
                                value={this.state.phone}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />
                        </div>

                        <div id='5'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                type="password"
                                id="password"
                                label="Password"
                                name="password"
                                value={this.state.password}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />
                        </div>

                        <div id='6'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="address"
                                label="Address"
                                name="address"
                                value={this.state.address}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />
                        </div>

                        <div id='7'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="landmark"
                                label="landmark"
                                name="landmark"
                                value={this.state.landmark}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />
                        </div>
                        <br /><br />



                        <Button style={stylesBotton}
                            type="submit"
                            variant="contained"
                            color="primary"

                        >
                            Submit
                    </Button>
                        <br /><br />



                    </div>

                </form>
                {this.state.showChild ?
                    <ListConsumer reloadChild={this.reloadChild} /> : null
                }

            </div>
        )

    }


}


AddConsumer.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps)(AddConsumer)
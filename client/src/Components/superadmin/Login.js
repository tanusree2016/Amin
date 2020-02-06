import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { loginSuperAdmin } from './authentication';
import LoginUI from '../../Material_UI/superadminUI/LoginUI'
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import envirionment from '../../common/utils/envirionment';
import { Provider } from "react-redux";
import store from "../../store";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../setAuthToken";
import { setCurrentUser, logoutUser } from "./authentication"
import { Switch, Route } from 'react-router-dom';
import DashBoard from './DashBoard';


if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
}

class Login extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            email: '',
            password: '',

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    handleSubmit(e) {
        e.preventDefault();

        const loginSuperAdmin = {
            email: this.state.email,
            password: this.state.password,
        }
        //localStorage.clear();

        this.props.loginSuperAdmin(loginSuperAdmin, this.props.history);
        //this.props.history.push('/dashboard')
        // if(localStorage.getItem('token').length>0)
        //     this.state.token=true

        // this.resetField();
    }

    resetField = () => {
        this.setState({ email: '' });
        this.setState({ password: '' });
    }


    render() {
        const { open } = this.state;

        const styles1 = {
            flexGrow: 1,
            textAlign: 'center',
            marginTop: 200
        };

        const textfieldHeight = {
            width: 300,
            height: 50,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 2,
        };


        return (

            <Provider store={store}>
                <div>
                    <CssBaseline />
                    <div>
                        <LoginUI />
                    </div>
                    <div style={styles1}>
                        <Dialog open={open} onClose={this.handleClose}>
                            <DialogTitle>Modal Pop-up</DialogTitle>
                            <DialogContent>
                                <DialogContentText>This is an example of modal pop-up</DialogContentText>
                            </DialogContent>

                        </Dialog>
                        <Typography variant="h5" gutterBottom paragraph>
                            Login
        </Typography>

                        <form className="reg" noValidate>
                            <div>
                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    inputProps={{ "padding-top": '0', "padding-bottom": '0' }}
                                    id="email"
                                    type="email"
                                    label="Email Address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={(ev) => this.handleInputChangeValue(ev)}
                                />
                            </div>
                            <div>
                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required

                                    name="password"
                                    value={this.state.password}
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={(ev) => this.handleInputChangeValue(ev)}
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                //className={classes.submit}
                                onClick={this.handleSubmit} >
                                Submit
                            </Button>
                        </form>

                    </div>
                </div>
            </Provider>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginSuperAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps, { loginSuperAdmin })(Login)

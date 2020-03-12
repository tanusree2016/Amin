import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginCompany } from './authentication';
import { Provider } from "react-redux";
import store from "../../store";
import LoginUI from '../../Material_UI/superadminUI/LoginUI'
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class CompanyLogin extends Component {


    constructor() {
        super();
        this.state = {
            open: false,
            email: '',
            password: '',
            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
        
        const loginCompany = {
            email: this.state.email,
            password: this.state.password,
        }
        //localStorage.clear();
        
        this.props.loginCompany(loginCompany, this.props.history);
        //this.props.history.push('/dashboard')
        // if(localStorage.getItem('token').length>0)
        //     this.state.token=true

        //this.resetField();
    }

    resetField = () => {
        this.setState({ email: '' });
        this.setState({ password: '' });
    }


    render() {
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

CompanyLogin.propTypes = {
    classes: PropTypes.object.isRequired,
    loginCompany: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps, { loginCompany })(CompanyLogin)

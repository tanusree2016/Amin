import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { changePass } from './authentication';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class PasswordChange extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            oldpassword: '',
            confirmpassword: '',
            open1: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password === this.state.confirmpassword) {
            let superid;
            superid = localStorage.getItem('id');
            const changePass = {
                email: this.state.email,
                oldpassword: this.state.oldpassword,
                password: this.state.password,
                superid: superid,
            }
            this.props.changePass(changePass, this.props.history);
            this.resetField();
        }
        else {
            //alert("New Password and Confirm Password is not same.")
            console.log("Testing --- ");
            this.state.open1 = true
            this.forceUpdate();
        }
    }

    handleClose = () => {
        this.state.open1 = false;
        this.forceUpdate();
    };

    resetField = () => {
        this.setState({ email: '' });
        this.setState({ password: '' });
        this.setState({ oldpassword: '' });
        this.setState({ confirmpassword: '' });
    }


    render() {
        const { open, open1 } = this.state;

        const styles1 = {
            textAlign: 'center',
            paddingTop: '2',
        };

        const stylesMargin = {
            marginTop: 3
        };

        const textfieldHeight = {
            width: 300,
            height: 50,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 2,
        };

        const textfieldAmount = {
            width: 100,
            height: 40,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 2,
            marginBottom: 15,
        };


        return (
            <div style={styles1}>

                <Typography variant="h5" gutterBottom paragraph>
                    Change Password
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
                            name="oldpassword"
                            value={this.state.oldpassword}
                            label="Old Password"
                            type="password"
                            id="password"
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
                            label="New Password"
                            type="password"
                            id="newpassword"
                            onChange={(ev) => this.handleInputChangeValue(ev)}
                        />
                    </div>
                    <div>
                        <TextField style={textfieldHeight}
                            variant="outlined"
                            margin="dense"
                            required
                            name="confirmpassword"
                            value={this.state.confirmpassword}
                            label="Confirm Password"
                            type="password"
                            id="confirmpassword"
                            onChange={(ev) => this.handleInputChangeValue(ev)}
                        />
                    </div>
                    <Button style={stylesMargin}
                        type="submit"
                        variant="contained"
                        color="primary"
                        //className={classes.submit}
                        onClick={this.handleSubmit} >
                        Submit
                    </Button>
                </form>

                <Dialog
                    open={open1}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                        New Password and Confirm Password is not same.
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            OK
          </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}

PasswordChange.propTypes = {
    classes: PropTypes.object.isRequired,
    changePass: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { changePass })(PasswordChange)

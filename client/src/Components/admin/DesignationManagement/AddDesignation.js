import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { resetWarningCache } from 'prop-types';
import envirionment from '../../../common/utils/envirionment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import base_url from '../../../common/utils/axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { designationAdd } from '../authentication';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import Designation from './Designation';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';


mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}

var desigNameArray = [];
var desigIdArray = [];

class AddDesignation extends Component {

    constructor() {
        super();
        this.state = {
            designation: '',
            department: '',
            getAllModule: [],
            showChild: true,
            shortname: '',
            head_sub: '',
            loading: false, // will be true when ajax request is running
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

    fetchmodule() {

        console.log('hhh' + JSON.stringify(localStorage.getItem('subscription')))
        let subscription = localStorage.getItem('subscription');
        console.log('subscripti' + subscription);
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'subscriptionbyId/' + subscription, {
                data: 'planName',
                data: 'price',
                data: 'subscriptionId',
                method: "GET",
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'x-access-db': localStorage.getItem('dbname')
                }
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        getAllModule: res.subscription,
                        loading: false,
                    });

                    for (let i = 0; i < res.subscription.length; i++) {
                        desigNameArray.push(res.subscription[i].planName);
                        desigIdArray.push(res.subscription[i].subscriptionId);
                    }
                })
        })
    }

    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchmodule();
    }


    handleInputChangeValue(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

    }

    handleInputChangeValueDept(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, "::", val);
        this.setState({ [nam]: val });
        for (let i = 0; i < this.state.getAllModule.length; i++) {
            console.log("JSON.stringify(desigNameArray.pop(i) --- " + i + " " + JSON.stringify(desigNameArray.pop(i)) + " " + val)
            if (JSON.stringify(desigIdArray.pop(i)) == val) {
                console.log("entered");
                this.state.id = val;
            }
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        if (this.state.department == '' || this.state.designation == '' || this.state.shortname == '' || this.state.head_sub == '') {
            showAlert('Please Fill required feilds')
        }

        else {

            const designationAdd = {
                moduleId: this.state.department,
                designation: this.state.designation,
                shortname: this.state.shortname,
                head_sub: this.state.head_sub,
                dbname: localStorage.getItem('dbname'),
            }
            console.log("DATA send --- " + JSON.stringify(designationAdd))
            // this.props.designationAdd(designationAdd, this.props.history);
            base_url.post('designation', designationAdd, {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'x-access-db': localStorage.getItem('dbname'),
                }
            })
                .then(res => {
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if (res.data.value == 1)
                        showAlert("Designation is added successfully");
                    else
                        showAlert(res.data.message);
                    this.reloadChild();
                })
                .catch(e => console.log(e))
        }
        this.resetField();
    }

    resetField = () => {
        this.setState({ department: '' });
        this.setState({ designation: '' });
        this.setState({ shortname: '' });
        this.setState({ head_sub: '' });
    }

    render() {

        const { loading } = this.state;

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

        const centerLoad = {
            margin: 'auto',
            width: '50%',
            maxWidth: 400,
            minWidth: 150,
            position: 'absolute',
            top: '50%',
            left: '50%',
            fontsize: 100,
        }

        if (this.state.loading) {
            return (
                <div style={centerLoad}>
                    <i className="fa fa-cog fa-spin" />
                </div>
            );
        }
        else {

            return (

                <div style={styles1}>
                    <form className="reg" onSubmit={this.handleSubmit} >

                        <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                            <FormControl style={formControl}>
                                <InputLabel htmlFor="department">Deparment</InputLabel>
                                <Select
                                    value={this.state.department}
                                    onChange={(ev) => this.handleInputChangeValueDept(ev, 9)}
                                    inputProps={{
                                        name: 'department',
                                        id: 'department',
                                    }}
                                >
                                    {this.state.getAllModule.map(module => (
                                        <MenuItem value={module.subscriptionId}>{module.planName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl style={formControl}>
                                <InputLabel htmlFor="head_sub">Head/Sub</InputLabel>
                                <Select
                                    value={this.state.head_sub}
                                    onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                                    inputProps={{
                                        name: 'head_sub',
                                        id: 'head_sub',
                                    }} >
                                    <MenuItem value={"Head"}>Head</MenuItem>
                                    <MenuItem value={"Sub"}>Sub</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <br />

                        <div id='2'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="designation"
                                label="Designation"
                                name="designation"
                                value={this.state.designation}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />

                        </div>

                        <div id='3'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="shortname"
                                label="Short Name"
                                name="shortname"
                                value={this.state.shortname}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />
                        </div>

                        <Button style={stylesBotton}
                            type="submit"
                            variant="contained"
                            color="primary"
                        //className={classes.submit}
                        //onClick={this.handleSubmit}
                        >
                            Submit
                    </Button>

                    </form>
                    <br /><br />
                    {this.state.showChild ?
                        <Designation reloadChild={this.reloadChild} /> : null
                    }

                </div>
            )
        }
    }

}


AddDesignation.propTypes = {
    classes: PropTypes.object.isRequired,
    designationAdd: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { designationAdd })(AddDesignation)
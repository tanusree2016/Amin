import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { resetWarningCache } from 'prop-types';
import envirionment from '../../../common/utils/envirionment';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import { userAdd } from '../authentication';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import base_url from '../../../common/utils/axios';


import {
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdChevronRight,
    MdKeyboardArrowDown,
    MdAddBox,
    MdIndeterminateCheckBox,
    MdFolder,
    MdFolderOpen,
    MdInsertDriveFile
} from "react-icons/md";


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
var desigPrimaryId = [];
var headIdArray = [];


var errorFetchSupervisor = true;
class AddUser extends Component {

    constructor() {
        super();
        this.state = {
            getAllModule: [],
            getAllDesig: [],
            getAllSuperVisor: [],
            getAllMenu: [],
            checked: [],
            expanded: [],
            email: '',
            password: '',
            employee_id: '',
            prefix: '',
            firstname: '',
            lastname: '',
            joining_date: new Date(),
            min_joining_date: new Date(),
            max_joining_date: new Date(),
            department: '',
            designation: '',
            mobile: '',
            blood_group: '',
            head_sub: '',
            superiorId: '',
            birth_date: new Date(),
            min_birth_date: new Date(),
            max_birth_date: new Date(),
            type: '',
            employeetype: '',
            period: '',
            role: '',
            status: '',
            dbname: '',
            id: '',
            date: '',
            month: '',
            year: '',
            labelWidth: 35,
            labelWidthPref: 35,
            labelWidthDep: 75,
            labelWidthDes: 80,
            labelWidthSup: 50,
            labelWidthEmp: 105,
            labelWidthHS: 65,
        }

        this.state.min_birth_date.setFullYear(this.state.birth_date.getFullYear() - 100);
        this.state.max_birth_date.setFullYear(this.state.birth_date.getFullYear() - 13);
        this.state.birth_date.setFullYear(this.state.birth_date.getFullYear() - 14);


        this.state.max_joining_date = this.state.joining_date;
        this.state.min_joining_date.setFullYear(this.state.birth_date.getFullYear() + 13);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleJoiningDateChange = this.handleJoiningDateChange.bind(this);
        this.handleBirthDateChange = this.handleBirthDateChange.bind(this);
    }

    handleErrors(response) {
        if (!response.ok) {

            throw Error(response.status);
        }
        return response;
    }

    handleJoiningDateChange(date) {
        this.setState({ joining_date: date })
    }

    handleBirthDateChange(date) {
        this.setState({ birth_date: date })
    }

    fetchmodule() {
        console.log('hhh' + JSON.stringify(localStorage.getItem('subscription')))
        let subscription = localStorage.getItem('subscription');
        fetch(envirionment.BASE_URL + 'subscriptionbyId/' + subscription, {
            method: "GET",
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'x-access-db': localStorage.getItem('dbname')
            }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    getAllModule: res.subscription
                });

                console.log('All Module --- ' + JSON.stringify(res.subscription))

                for (let i = 0; i < res.subscription.length; i++) {
                    desigPrimaryId.push(res.subscription[i]._id);
                    desigNameArray.push(res.subscription[i].planName);
                    desigIdArray.push(res.subscription[i].subscriptionId);
                }
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchmodule();
        this.fetchAllMenu();
        this.fetchSupervisor();
    }

    handleSubmit(e) {
        e.preventDefault();
        alert("Processing...")
    }

    handleInputChangeValue(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

        if (id == 13) {
            if (id == 13 && val == "Head") {
                document.getElementById(14).style.display = "none"
            }
            else {
                document.getElementById(14).style.display = "block"
            }
        }
        if (id == 15) {
            if (id == 15 && val == "Contractor") {
                console.log("Enter into --- " + val)
                document.getElementById(17).style.display = "block"
            }
            else {
                console.log("Enter into " + val)
                document.getElementById(17).style.display = "none"
            }
        }
    }

    checkEmail(event) {
        const validEmail = {
            email: this.state.email,
        }
        base_url.post('user-check', validEmail, {
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

    checkMobile(event) {
        if (this.state.mobile.length != 10) {
            showAlert('Please enter valid mobile number with 10 digit.');
        }
    }

    handleInputChangeValueDept(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, "::", val);
        this.setState({ [nam]: val });
        for (let i = 0; i < this.state.getAllModule.length; i++) {
            console.log("JSON.stringify(desigNameArray.pop(i) --- " + i + " " + JSON.stringify(desigNameArray.pop[i]) + " " + val)
            if (JSON.stringify(desigIdArray.pop[i]) == val) {
                console.log("entered");
                this.state.id = val;
            }
        }

        this.fetchAllDesig(val);
    }

    fetchAllDesig(deptId) {
        console.log("url --- " + envirionment.BASE_URL + 'designsub/' + deptId)
        fetch(envirionment.BASE_URL + 'designsub/' + deptId, {
            method: "GET",
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'x-access-db': localStorage.getItem('dbname')
            }
        }).then(res => res.json())
            .then(res => {
                console.log("Size --- " + res.Designation.length);
                this.setState({
                    getAllDesig: res.Designation
                });
            })
            .catch(error => console.log(error));
    }

    fetchSupervisor() {
        fetch(envirionment.BASE_URL + 'head-list', {
            method: "GET",
            headers: {
                'x-access-db': localStorage.getItem('dbname'),
                'x-access-token': localStorage.getItem('token'),
            }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    getAllSuperVisor: res.users,
                });
                console.log("User Details --- " + JSON.stringify(res.users))
                errorFetchSupervisor = false;

                for (let i = 0; i < res.users.length; i++) {
                    headIdArray.push(res.users[i].employee_id);
                }
            })
            .catch(error => {
                console.log("ERROR --- " + error)
                errorFetchSupervisor = true;
                console.log("Value : " + errorFetchSupervisor)
            });
    }

    fetchAllMenu() {

        fetch(envirionment.BASE_URL + 'menu', {
            method: "GET",
            headers: {
                'x-access-db': localStorage.getItem('dbname'),
                'x-access-token': localStorage.getItem('token'),
            }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    getAllMenu: res.menulist
                });
                console.log("Menu:List --- " + JSON.stringify(res.menulist))
            })
            .catch(error => console.log(error));
    }

    handleSubmit(e) {
        e.preventDefault();

        let menuid;
        menuid = this.state.checked;

        if (this.state.department == '') {
            console.log('I am in handle submit')
            showAlert('Please select Department');
        }
        else if (this.state.designation == '') {
            showAlert('Please select Designation');
        }
        else if (this.state.type == '') {
            showAlert('Please select Type');
        }
        else if (this.state.employeetype == '') {
            showAlert('Please select Employee Type');
        }
        else if (this.state.head_sub == '') {
            showAlert('Please select Head or sub');
        }
        else if (this.state.head_sub == 'Sub' && this.state.superiorId == '') {
            showAlert('Please select superior');
        }
        else if (this.state.type == 'Contractor' && this.state.period == '') {
            showAlert('Please enter period');
        }
        else if (this.state.mobile.length != 10) {
            showAlert('Please enter valid mobile number with 10 digit.');
        }
        else if (menuid.length == 0) {
            showAlert('Please select atleast one menu.');
        }
        else {

            const userAdd = {
                email: this.state.email,
                password: this.state.password,
                employee_id: this.state.employee_id,
                prefix: this.state.prefix,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                joining_date: this.state.joining_date,
                department: this.state.department,
                designation: this.state.designation,
                mobile: this.state.mobile,
                blood_group: this.state.blood_group,
                head_sub: this.state.head_sub,
                superiorId: this.state.superiorId,
                status: 'active',
                dbname: localStorage.getItem('dbname'),
                birth_date: this.state.birth_date,
                type: this.state.type,
                employeetype: this.state.employeetype,
                period: this.state.period,
                menu_submenu: menuid,
            }
            console.log("userAdd --- " + this.state.email + " " + this.state.joining_date + " " + this.state.birth_date + " " + this.state.department + " " + this.state.designation + " " + this.state.head_sub + " " + this.state.type + " " + this.state.employeetype)
            console.log("Checked item --- " + menuid)
            //this.props.userAdd(userAdd, this.props.history);

            base_url.post('add-employee', userAdd, {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'x-access-db': localStorage.getItem('dbname'),
                }
            })
                .then(res => {
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if (res.data.value == 1) {
                        showAlert("New user has been added successfully");
                        this.fetchSupervisor();
                    }
                    else {
                        showAlert(res.data.message);
                    }
                })
                .catch(err => {

                });

            this.resetField();

            //this.forceUpdate();
        }
    }

    resetField = () => {
        this.setState({ email: '' });
        this.setState({ password: '' });
        this.setState({ employee_id: '' });
        this.setState({ prefix: '' });
        this.setState({ firstname: '' });
        this.setState({ lastname: '' });
        this.setState({ joining_date: new Date() });
        this.setState({ department: '' });
        this.setState({ designation: '' });
        this.setState({ head_sub: '' });
        this.setState({ mobile: '' });
        this.setState({ blood_group: '' });
        this.setState({ period: '' });
        this.setState({ superiorId: '' });
        this.setState({ type: '' });
        this.setState({ employeetype: '' });
        this.setState({ checked: [] });
        this.setState({ expanded: [] });

        this.state.birth_date = new Date();
        this.state.min_birth_date.setFullYear(this.state.birth_date.getFullYear() - 100);
        this.state.max_birth_date.setFullYear(this.state.birth_date.getFullYear() - 13);
        this.state.birth_date.setFullYear(this.state.birth_date.getFullYear() - 14);


        this.state.max_joining_date = this.state.joining_date;
        this.state.min_joining_date.setFullYear(this.state.birth_date.getFullYear() + 13);
    }


    render() {
        const { open } = this.state;

        const stylesMargin = {
            marginTop: 3
        };

        const stylesForm = {
            display: 'flex',
            flexWrap: 'wrap',
        };

        const stylesBotton = {
            //marginTop: 20
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
            marginTop: 9,
        };

        const datefieldHeight = {
            width: 280,
            height: 50,
            marginTop: 1,
            marginLeft: 4,
            marginRight: 4,
            resize: 'none',
        };

        const formControl = {
            minWidth: 150,
        };

        const formControlEmpType = {
            minWidth: 200,
        };

        const icons = {
            check: <MdCheckBox className="rct-icon rct-icon-check" />,
            uncheck: <MdCheckBoxOutlineBlank className="rct-icon rct-icon-uncheck" />,
            halfCheck: (
                <MdIndeterminateCheckBox className="rct-icon rct-icon-half-check" />
            ),
            expandClose: (
                <MdChevronRight className="rct-icon rct-icon-expand-close" />
            ),
            expandOpen: (
                <MdKeyboardArrowDown className="rct-icon rct-icon-expand-open" />
            ),
            expandAll: <MdAddBox className="rct-icon rct-icon-expand-all" />,
            collapseAll: (
                <MdIndeterminateCheckBox className="rct-icon rct-icon-collapse-all" />
            ),
            parentClose: <MdFolder className="rct-icon rct-icon-parent-close" />,
            parentOpen: <MdFolderOpen className="rct-icon rct-icon-parent-open" />,
            leaf: <MdInsertDriveFile className="rct-icon rct-icon-leaf-close" />
        };

        return (
            <div style={styles1}>
                <Dialog open={open} onClose={this.handleClose}>
                    <DialogTitle>Modal Pop-up</DialogTitle>
                    <DialogContent>
                        <DialogContentText>This is an example of modal pop-up</DialogContentText>
                    </DialogContent>

                </Dialog>
                <Typography variant="h5" gutterBottom paragraph>
                    Add New User
                </Typography>
                <form className="reg" onSubmit={this.handleSubmit}>
                    <div style={stylesForm}>
                        <div id='1'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="employee_id"
                                label="Employee Id"
                                name="employee_id"
                                value={this.state.employee_id}
                                onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                            />
                        </div>
                        <div id='2' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                            <FormControl variant="outlined" margin="dense" style={formControl}>
                                <InputLabel htmlFor="prefix-simple">Prefix</InputLabel>
                                <Select style={{ height: "40px", minHeight: "40px" , marginLeft: 4, marginRight: 4}}
                                    value={this.state.prefix}
                                    onChange={(ev) => this.handleInputChangeValue(ev, 2)}
                                    labelWidth={this.state.labelWidth}
                                    inputProps={{
                                        name: 'prefix',
                                        id: 'prefix-simple',
                                    }}
                                >
                                    <MenuItem value={"Mr"}>Mr.</MenuItem>
                                    <MenuItem value={"Mrs"}>Mrs.</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div id='3'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                id="firstname"
                                label="First Name"
                                name="firstname"
                                value={this.state.firstname}
                                onChange={(ev) => this.handleInputChangeValue(ev, 3)}
                            />
                        </div>
                        <div id='4'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                name="lastname"
                                label="Last Name"
                                id="lastname"
                                value={this.state.lastname}
                                onChange={(ev) => this.handleInputChangeValue(ev, 4)}
                            />
                        </div>
                        <div id='5'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                name="email"
                                label="Email"
                                id="email"
                                type="email"
                                value={this.state.email}
                                onChange={(ev) => this.handleInputChangeValue(ev, 5)}
                                onBlur={(ev) => this.checkEmail(ev)}
                            />
                        </div>
                        <div id='6'>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker style={datefieldHeight}
                                    margin="normal"
                                    id="birth_date"
                                    label="Birth Date"
                                    name="birth_date"
                                    format="dd/MM/yyyy"
                                    minDate={this.state.min_birth_date}
                                    maxDate={this.state.max_birth_date}
                                    value={this.state.birth_date}
                                    onChange={this.handleBirthDateChange}
                                    KeyboardButtonProps={{ 'aria-label': 'change date', }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div id='7'>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker style={datefieldHeight}
                                    margin="normal"
                                    id="joining_date"
                                    label="Joining Date"
                                    name="joining_date"
                                    format="dd/MM/yyyy"
                                    maxDate={this.state.max_joining_date}
                                    minDate={this.state.min_joining_date}
                                    value={this.state.joining_date}
                                    onChange={this.handleJoiningDateChange}
                                    KeyboardButtonProps={{ 'aria-label': 'change date', }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div id='8'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                type="password"
                                name="password"
                                label="Password"
                                id="password"
                                value={this.state.password}
                                onChange={(ev) => this.handleInputChangeValue(ev, 8)}
                            />
                        </div>
                        <div id='9' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                            <FormControl variant="outlined" margin="dense" style={formControl}>
                                <InputLabel htmlFor="department">Deparment</InputLabel>
                                <Select style={{ height: "40px", minHeight: "40px" , marginLeft: 4, marginRight: 4}}
                                    value={this.state.department}
                                    onChange={(ev) => this.handleInputChangeValueDept(ev, 9)}
                                    labelWidth={this.state.labelWidthDep}
                                    inputProps={{
                                        name: 'department',
                                        id: 'department',
                                    }}
                                >
                                    {this.state.getAllModule.length > 0 && this.state.getAllModule.map(module => (
                                        <MenuItem value={module._id}>{module.planName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div id='10' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                            <FormControl variant="outlined" margin="dense" style={formControl}>
                                <InputLabel htmlFor="designation">Designation</InputLabel>
                                <Select style={{ height: "40px", minHeight: "40px" , marginLeft: 4, marginRight: 4}}
                                    value={this.state.designation}
                                    onChange={(ev) => this.handleInputChangeValue(ev, 10)}
                                    labelWidth={this.state.labelWidthDes}
                                    inputProps={{
                                        name: 'designation',
                                        id: 'designation',
                                    }}
                                >
                                    {this.state.getAllDesig.length > 0 && this.state.getAllDesig.map(module => (
                                        <MenuItem value={module._id}>{module.designation}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div id='11'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                type="number"
                                name="mobile"
                                label="Mobile Number"
                                id="mobile"
                                value={this.state.mobile}
                                onChange={(ev) => this.handleInputChangeValue(ev, 11)}
                                onBlur={(ev) => this.checkMobile(ev)}
                            />
                        </div>
                        <div id='12'>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                name="blood_group"
                                label="Blood Group"
                                id="blood_group"
                                value={this.state.blood_group}
                                onChange={(ev) => this.handleInputChangeValue(ev, 12)}
                            />
                        </div>
                        <div id='13' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                            <FormControl variant="outlined" margin="dense" style={formControl}>
                                <InputLabel htmlFor="head_sub">Head/Sub</InputLabel>
                                <Select style={{ height: "40px", minHeight: "40px" , marginLeft: 4, marginRight: 4}}
                                    value={this.state.head_sub}
                                    onChange={(ev) => this.handleInputChangeValue(ev, 13)}
                                    labelWidth={this.state.labelWidthHS}
                                    inputProps={{
                                        name: 'head_sub',
                                        id: 'head_sub',
                                    }} >
                                    <MenuItem value={"Head"}>Head</MenuItem>
                                    <MenuItem value={"Sub"}>Sub</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div id='14' style={{ paddingLeft: '5px', paddingRight: '5px', display: 'none' }}>
                            <FormControl variant="outlined" margin="dense" style={formControl}>
                                <InputLabel htmlFor="superiorId">Supervisor</InputLabel>
                                <Select style={{ height: "40px", minHeight: "40px" , marginLeft: 4, marginRight: 4}}
                                    value={this.state.superiorId}
                                    onChange={(ev) => this.handleInputChangeValue(ev, 14)}
                                    labelWidth={this.state.labelWidthSup}
                                    inputProps={{
                                        name: 'superiorId',
                                        id: 'superiorId',
                                    }} >
                                    {this.state.getAllSuperVisor.length > 0 && this.state.getAllSuperVisor.map(module => (
                                        <MenuItem value={module._id}>{module.employee_id}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div id='15' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                            <FormControl variant="outlined" margin="dense" style={formControl}>
                                <InputLabel htmlFor="type">Type</InputLabel>
                                <Select style={{ height: "40px", minHeight: "40px" , marginLeft: 4, marginRight: 4}}
                                    value={this.state.type}
                                    onChange={(ev) => this.handleInputChangeValue(ev, 15)}
                                    labelWidth={this.state.labelWidth}
                                    inputProps={{
                                        name: 'type',
                                        id: 'type',
                                    }}
                                >
                                    <MenuItem value={"Employee"}>Employee.</MenuItem>
                                    <MenuItem value={"Contractor"}>Contractor.</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div id='16' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                            <FormControl variant="outlined" margin="dense" style={formControlEmpType}>
                                <InputLabel htmlFor="type">Employee Type</InputLabel>
                                <Select style={{ height: "40px", minHeight: "40px" , marginLeft: 4, marginRight: 4}}
                                    value={this.state.employeetype}
                                    onChange={(ev) => this.handleInputChangeValue(ev, 16)}
                                    labelWidth={this.state.labelWidthEmp}
                                    inputProps={{
                                        name: 'employeetype',
                                        id: 'employeetype',
                                    }}
                                >
                                    <MenuItem value={"Probation"}>Probation.</MenuItem>
                                    <MenuItem value={"Confirmed"}>Confirmed.</MenuItem>
                                    <MenuItem value={"Trainee"}>Trainee.</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div id='17' style={{ display: 'none' }}>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                type="number"
                                name="period"
                                label="Period"
                                id="period"
                                value={this.state.period}
                                onChange={(ev) => this.handleInputChangeValue(ev, 17)}
                            />
                        </div>
                    </div>
                    <div>
                        <CheckboxTree
                            nodes={this.state.getAllMenu}
                            checked={this.state.checked}
                            expanded={this.state.expanded}
                            onCheck={checked => this.setState({ checked })}
                            onExpand={expanded => this.setState({ expanded })}
                            icons={icons}
                        />

                        <Button style={stylesBotton}
                            type="submit"
                            variant="contained"
                            color="primary"
                        //onClick={this.handleSubmit}
                        >
                            Submit
                    </Button>
                    </div>
                </form>
            </div>
        );
    }
}

AddUser.propTypes = {
    classes: PropTypes.object.isRequired,
    userAdd: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { userAdd })(AddUser)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import envirionment from '../../../common/utils/envirionment';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EditIcon from '@material-ui/icons/Edit';
import { userDelete } from '../../admin/authentication';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CheckboxTree from 'react-checkbox-tree';
import { userEdit } from '../authentication';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';

import Slide from '@material-ui/core/Slide';

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

mobiscroll.settings = {
    theme: 'ios',
}

function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}

const searchtextfieldHeight = {
    width: 350,
};


var desigNameArray = [];
var desigIdArray = [];
var desigPrimaryId = [];
var headIdArray = [];
var errorFetchSupervisor = true;
class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            open1: false,
            employee_id: '',
            firstname: '',
            lastname: '',
            mobile: '',
            department: '',
            designation: '',
            getAllUser: [],
            getAllUserBySearch: [],
            getSelectedUserAllMenu: [],
            userid: '',
            email: '',
            blood_group: '',
            head_sub: '',
            type: '',
            employeetype: '',
            superiorId: '',
            period: '',
            editIndex: -1,
            delIndex: -1,
            searchItemIndex: -1,
            getAllModule: [],
            getAllDesig: [],
            getAllSuperVisor: [],
            getAllMenu: [],
            checkedItem: [],
            labelWidth: 35,
            labelWidthPref: 35,
            labelWidthDep: 75,
            labelWidthDes: 80,
            labelWidthSup: 50,
            labelWidthEmp: 105,
            labelWidthHS: 65,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

    }

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,
            checkedItem: [],

        });
    };

    handleClick(id, empid, uprefix, ufirstname, ulastname, umobile, ublood_group, modname, desig, h_s, utype, etype, sid, uperiod, uemail, udob, udoj, index) {
        console.log("Dept : ---" + modname + " " + desig + " --- " + index)
        this.fetchAllDesig(modname);
        this.setState({
            open: true,
            employee_id: empid,
            prefix: uprefix,
            firstname: ufirstname,
            lastname: ulastname,
            mobile: umobile,
            blood_group: ublood_group,
            department: modname,
            designation: desig,
            head_sub: h_s,
            type: utype,
            employeetype: etype,
            superiorId: sid,
            period: uperiod,
            email: uemail,
            birth_date: udob,
            joining_date: udoj,
            editIndex: index,
            loading: false, // will be true when ajax request is running
        });
        this.state.editIndex = index;
        this.fetchSelectedUserMenu();
    };

    handleClickDelete(deluserid, deluseremail, index) {
        this.setState({
            open1: true,
            userid: deluserid,
            email: deluseremail,
            delIndex: index,
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
            })
            .catch(error => console.log(error));
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

                for (let i = 0; i < res.subscription.length; i++) {
                    desigPrimaryId.push(res.subscription[i]._id);
                    desigNameArray.push(res.subscription[i].planName);
                    desigIdArray.push(res.subscription[i].subscriptionId);
                }
            })
            .catch(error => console.log(error));
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

        this.fetchAllDesig(val);
    }


    fetchAllUser() {
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'userlist', {
                method: "GET",
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'x-access-db': localStorage.getItem('dbname')
                }
            }).then(res => res.json())
                .then(res => {
                    this.setState({
                        getAllUser: res.userlist,
                        getSelectedUserAllMenu: res.userlist,
                        loading: false,
                    });
                })
        });
    }

    fetchSelectedUserMenu() {
        console.log("getSelectedUserAllMenu --- " + this.state.editIndex + " --- :" + JSON.stringify(this.state.getSelectedUserAllMenu))
        for (let i = 0; i < this.state.getSelectedUserAllMenu[this.state.editIndex].menuprimary.length; i++) {
            if (typeof this.state.getSelectedUserAllMenu[this.state.editIndex].menuprimary[i].submenupri != "undefined") {
                this.state.checkedItem.push(this.state.getSelectedUserAllMenu[this.state.editIndex].menuprimary[i].menupri + "_" + this.state.getSelectedUserAllMenu[this.state.editIndex].menuprimary[i].submenupri)
            }
            else {
                this.state.checkedItem.push(this.state.getSelectedUserAllMenu[this.state.editIndex].menuprimary[i].menupri)
            }

        }
        this.setState({ checked: this.state.checkedItem })
        console.log("Array Items --- " + this.state.checkedItem)
    }

    // fetchSelectedUserMenu() {
    //     fetch(envirionment.BASE_URL + 'userlist', {
    //         method: "GET",
    //         headers: {
    //             'x-access-token': localStorage.getItem('token'),
    //             'x-access-db': localStorage.getItem('dbname')
    //         }
    //     }).then(res => res.json())
    //         .then(res => {
    //             this.setState({
    //                 getSelectedUserAllMenu: res.userlist,
    //             });

    //             console.log("res.userlist --- "+JSON.stringify(res.userlist))
    //             console.log("getSelectedUserAllMenu --- "+JSON.stringify(this.state.getSelectedUserAllMenu))
    //             for (let i = 0; i < res.userlist[this.state.editIndex].menuprimary.length; i++) {
    //                 if (typeof res.userlist[this.state.editIndex].menuprimary[i].submenupri != "undefined") {
    //                     this.state.checkedItem.push(res.userlist[this.state.editIndex].menuprimary[i].menupri + "_" + res.userlist[this.state.editIndex].menuprimary[i].submenupri)
    //                 }
    //                 else {
    //                     this.state.checkedItem.push(res.userlist[this.state.editIndex].menuprimary[i].menupri)
    //                 }

    //             }
    //             this.setState({ checked: this.state.checkedItem })
    //             console.log("Array Items --- " + this.state.checkedItem)
    //         })
    // }
    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllUser();
        this.fetchmodule();
        this.fetchSupervisor();
        this.fetchAllMenu();
    }

    handleDelete(e) {
        e.preventDefault();
        const userDelete = {
            userid: this.state.userid,
            email: this.state.email
        }

        this.setState((prevState) => ({
            getAllUser: prevState.getAllUser.filter((_, i) => i !== this.state.delIndex)
        }));

        this.props.userDelete(userDelete, this.props.history);
        this.handleClose();
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

    handleSubmit(e) {
        e.preventDefault();
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
        else {

            let menuid;
            menuid = this.state.checked;
            const userEdit = {

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
                email: this.state.email,
            }
            console.log("Checked item --- " + menuid)

            this.props.userEdit(userEdit, this.props.history);
            //this.resetField();
            this.handleClose();
        }
    }

    resetField = () => {

        this.setState({ employee_id: '' });
        this.setState({ firstname: '' });
        this.setState({ lastname: '' });
        this.setState({ joining_date: new Date() });
        this.setState({ department: '' });
        this.setState({ designation: '' });
        this.setState({ mobile: '' });
        this.setState({ blood_group: '' });
        this.setState({ birth_date: new Date() });
        this.setState({ period: '' });
    }

    handleInputChangeSearchValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

        if (val === "") {
            console.log("Clear")
            this.state.getAllUserBySearch = [];
            this.forceUpdate();
        }
    }

    handleSearch(e) {
        e.preventDefault();
        this.searchItemDisplay();
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.searchItemDisplay();
        }
    }

    searchItemDisplay() {
        this.state.getAllUserBySearch = [];
        let c = 0;
        console.log("Search Calling --- " + this.state.searchBy)
        for (let i = 0; i < this.state.getAllUser.length; i++) {
            if (this.state.searchBy === this.state.getAllUser[i].employee_id) {
                this.state.searchItemIndex = i;
                this.state.getAllUserBySearch.push(this.state.getAllUser[i])
                c = 1;
                this.forceUpdate();
                break;
            }
        }
        if(c==0){
            for (let i = 0; i < this.state.getAllUser.length; i++) {
                if (this.state.searchBy === this.state.getAllUser[i].firstname) {
                    this.state.searchItemIndex = i;
                    this.state.getAllUserBySearch.push(this.state.getAllUser[i])
                    c = 1;
                    this.forceUpdate();
                    //break;
                }
            } 
        }
        if(c==0){
            for (let i = 0; i < this.state.getAllUser.length; i++) {
                if (this.state.searchBy === this.state.getAllUser[i].lastname) {
                    this.state.searchItemIndex = i;
                    this.state.getAllUserBySearch.push(this.state.getAllUser[i])
                    c = 1;
                    this.forceUpdate();
                    //break;
                }
            } 
        }
        if(c==0){
            for (let i = 0; i < this.state.getAllUser.length; i++) {
                if (this.state.searchBy === this.state.getAllUser[i].designation.modulename) {
                    this.state.searchItemIndex = i;
                    this.state.getAllUserBySearch.push(this.state.getAllUser[i])
                    c = 1;
                    this.forceUpdate();
                    //break;
                }
            } 
        }
        if(c==0){
            for (let i = 0; i < this.state.getAllUser.length; i++) {
                if (this.state.searchBy === this.state.getAllUser[i].designation.designation) {
                    this.state.searchItemIndex = i;
                    this.state.getAllUserBySearch.push(this.state.getAllUser[i])
                    c = 1;
                    this.forceUpdate();
                    //break;
                }
            } 
        }
    }


    render() {
        const { open, open1 } = this.state;
        const likePointer = { cursor: 'pointer', color: 'blue' };
        const delPointer = { cursor: 'pointer', color: 'red' };

        const stylesForm = {
            display: 'flex',
            flexWrap: 'wrap',
        };

        const textfieldHeight = {
            width: 280,
            height: 50,
            marginLeft: 4,
            marginRight: 4,
            marginTop: 9,
        };

        const datefieldHeight = {
            width: 135,
            height: 50,
            marginTop: 1,
            marginLeft: 4,
            marginRight: 4,
            resize: 'none',
        };

        const formControl = {
            minWidth: 150,
        };

        const tableHeadStyle = { fontWeight: 'bold', fontSize: '15px', color: 'black' }
        const tableBodyStyle = { fontSize: '12px' }

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

        const { loading } = this.state;

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
                <div>

                    <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth="false">
                        <div style={{ width: 800 }}>
                            <DialogTitle id="scroll-dialog-title">Edit User Details
                        <IconButton style={{ float: 'right', color: 'red' }} onClick={this.handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>

                                <form>
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
                                                // onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                                                InputProps={{
                                                    disabled: true,
                                                }}
                                            />
                                        </div>
                                        <div id='2' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                            <FormControl variant="outlined" margin="dense" style={formControl}>
                                                <InputLabel htmlFor="prefix-simple">Prefix</InputLabel>
                                                <Select style={{ height: "40px", minHeight: "40px", marginLeft: 4, marginRight: 4 }}
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

                                        <div id='6'>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker style={datefieldHeight}
                                                    margin="normal"
                                                    id="birth_date"
                                                    label="Birth Date"
                                                    name="birth_date"
                                                    format="dd/MM/yyyy"
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
                                                    value={this.state.joining_date}
                                                    onChange={this.handleJoiningDateChange}
                                                    KeyboardButtonProps={{ 'aria-label': 'change date', }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </div>

                                        <div id='9' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                            <FormControl variant="outlined" margin="dense" style={formControl}>
                                                <InputLabel htmlFor="department_name">Deparment</InputLabel>
                                                <Select style={{ height: "40px", minHeight: "40px", marginLeft: 4, marginRight: 4 }}
                                                    value={this.state.department}
                                                    onChange={(ev) => this.handleInputChangeValueDept(ev, 9)}
                                                    labelWidth={this.state.labelWidthDep}
                                                    inputProps={{
                                                        name: 'department',
                                                        id: 'department_name',
                                                    }}
                                                >
                                                    {this.state.getAllModule.map(module => (
                                                        <MenuItem value={module._id}>{module.planName}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div id='10' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                            <FormControl variant="outlined" margin="dense" style={formControl}>
                                                <InputLabel htmlFor="designation">Designation</InputLabel>
                                                <Select style={{ height: "40px", minHeight: "40px", marginLeft: 4, marginRight: 4 }}
                                                    value={this.state.designation}
                                                    onChange={(ev) => this.handleInputChangeValue(ev, 10)}
                                                    labelWidth={this.state.labelWidthDes}
                                                    inputProps={{
                                                        name: 'designation',
                                                        id: 'designation',
                                                    }}
                                                >
                                                    {this.state.getAllDesig.map(module => (
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
                                                <Select style={{ height: "40px", minHeight: "40px", marginLeft: 4, marginRight: 4 }}
                                                    value={this.state.head_sub}
                                                    onChange={(ev) => this.handleInputChangeValue(ev, 13)}
                                                    labelWidth={this.state.labelWidthHS}
                                                    inputProps={{
                                                        name: 'head_sub',
                                                        id: 'head_sub',
                                                    }}
                                                >
                                                    <MenuItem value={"Head"}>Head</MenuItem>
                                                    <MenuItem value={"Sub"}>Sub</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div id='14' style={{ paddingLeft: '5px', paddingRight: '5px', display: 'none' }}>
                                            <FormControl variant="outlined" margin="dense" style={formControl}>
                                                <InputLabel htmlFor="superiorId">Supervisor</InputLabel>
                                                <Select style={{ height: "40px", minHeight: "40px", marginLeft: 4, marginRight: 4 }}
                                                    value={this.state.superiorId}
                                                    onChange={(ev) => this.handleInputChangeValue(ev, 14)}
                                                    labelWidth={this.state.labelWidthSup}
                                                    inputProps={{
                                                        name: 'superiorId',
                                                        id: 'superiorId',
                                                    }} >
                                                    {errorFetchSupervisor ?
                                                        ''
                                                        :
                                                        <div>{this.state.getAllSuperVisor.map(module =>
                                                            <MenuItem value={module.employee_id}>{module.employee_id}</MenuItem>
                                                        )} </div>
                                                    };
                                </Select>
                                            </FormControl>
                                        </div>
                                        <div id='15' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                            <FormControl variant="outlined" margin="dense" style={formControl}>
                                                <InputLabel htmlFor="type">Type</InputLabel>
                                                <Select style={{ height: "40px", minHeight: "40px", marginLeft: 4, marginRight: 4 }}
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
                                            <FormControl variant="outlined" margin="dense" style={formControl}>
                                                <InputLabel htmlFor="type">Employee Type</InputLabel>
                                                <Select style={{ height: "40px", minHeight: "40px", marginLeft: 4, marginRight: 4 }}
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

                                        <div style={{ marginTop: 25 }}>
                                            <CheckboxTree
                                                nodes={this.state.getAllMenu}
                                                checked={this.state.checked}
                                                expanded={this.state.expanded}
                                                onCheck={checked => this.setState({ checked })}
                                                onExpand={expanded => this.setState({ expanded })}
                                                icons={icons}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button style={{ fontWeight: 'bold' }} onClick={this.handleSubmit} color="primary">
                                    Edit
                                </Button>
                            </DialogActions>
                        </div>
                    </Dialog>


                    <Dialog
                        open={open1}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Are you sure to delete the user?"}</DialogTitle>
                        <DialogContent>

                        </DialogContent>
                        <DialogActions>
                            <Button style={{ fontWeight: 'bold' }} onClick={this.handleClose} color="primary">
                                Disagree
                        </Button>
                            <Button onClick={this.handleDelete} color="secondary" autoFocus>
                                Agree
                        </Button>
                        </DialogActions>
                    </Dialog>


                    {/* <Dialog
                        open={open1}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description" >
                        <DialogTitle id="alert-dialog-title">{"Are you sure to delete the user?"}</DialogTitle>
                        <DialogContent>

                        </DialogContent>
                        <DialogActions>
                            <Button style={{ fontWeight: 'bold' }} onClick={this.handleClose} color="primary">
                                Disagree
                        </Button>
                            <Button onClick={this.handleDelete} color="secondary" autoFocus>
                                Agree
                        </Button>
                        </DialogActions>
                    </Dialog> */}

                    <div align="right">
                        <TextField style={searchtextfieldHeight}
                            label="Search by Id/First/Last Name/Dept./Desig."
                            id="searchBy"
                            name="searchBy"
                            value={this.state.searchBy}
                            autoComplete='off'
                            onChange={this.handleInputChangeSearchValue.bind(this)}
                            onKeyDown={this._handleKeyDown}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon onClick={this.handleSearch} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>

                    {this.state.getAllUserBySearch.length > 0 ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableHeadStyle}>Employee Id</TableCell>
                                    <TableCell style={tableHeadStyle}>Firstname</TableCell>
                                    <TableCell style={tableHeadStyle}>Lastname</TableCell>
                                    <TableCell style={tableHeadStyle}>Mobile</TableCell>
                                    <TableCell style={tableHeadStyle}>Department</TableCell>
                                    <TableCell style={tableHeadStyle}>Designation</TableCell>
                                    <TableCell style={tableHeadStyle}>Edit</TableCell>
                                    <TableCell style={tableHeadStyle}>Delete</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.getAllUserBySearch.length > 0 && this.state.getAllUserBySearch.map((user, i) =>

                                    <TableRow>
                                        <TableCell style={tableBodyStyle}>{user.employee_id}</TableCell>
                                        <TableCell style={tableBodyStyle}>{user.firstname}</TableCell>
                                        <TableCell style={tableBodyStyle}>{user.lastname}</TableCell>
                                        <TableCell style={tableBodyStyle}>{user.mobile}</TableCell>
                                        <TableCell style={tableBodyStyle}>{user.designation.modulename}</TableCell>
                                        <TableCell style={tableBodyStyle}>{user.designation.designation}</TableCell>
                                        <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(user._id, user.employee_id, user.prefix, user.firstname, user.lastname, user.mobile, user.blood_group, user.designation.modulePrimary, user.designation._id, user.head_sub, user.type, user.employeetype, user.superiorId, user.period, user.email, user.birth_date, user.joining_date, this.state.searchItemIndex)} /></TableCell>
                                        <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(user._id, user.email, this.state.searchItemIndex)} /></TableCell>
                                    </TableRow>

                                )}
                            </TableBody></Table>
                        :
                        [(this.state.getAllUser.length > 0 ?
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={tableHeadStyle}>Employee Id</TableCell>
                                        <TableCell style={tableHeadStyle}>Firstname</TableCell>
                                        <TableCell style={tableHeadStyle}>Lastname</TableCell>
                                        <TableCell style={tableHeadStyle}>Mobile</TableCell>
                                        <TableCell style={tableHeadStyle}>Department</TableCell>
                                        <TableCell style={tableHeadStyle}>Designation</TableCell>
                                        <TableCell style={tableHeadStyle}>Edit</TableCell>
                                        <TableCell style={tableHeadStyle}>Delete</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.getAllUser.length > 0 && this.state.getAllUser.map((user, i) =>


                                        <TableRow>
                                            <TableCell style={tableBodyStyle}>{user.employee_id}</TableCell>
                                            <TableCell style={tableBodyStyle}>{user.firstname}</TableCell>
                                            <TableCell style={tableBodyStyle}>{user.lastname}</TableCell>
                                            <TableCell style={tableBodyStyle}>{user.mobile}</TableCell>
                                            <TableCell style={tableBodyStyle}>{user.designation.modulename}</TableCell>
                                            <TableCell style={tableBodyStyle}>{user.designation.designation}</TableCell>
                                            <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(user._id, user.employee_id, user.prefix, user.firstname, user.lastname, user.mobile, user.blood_group, user.designation.modulePrimary, user.designation._id, user.head_sub, user.type, user.employeetype, user.superiorId, user.period, user.email, user.birth_date, user.joining_date, i)} /></TableCell>
                                            <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(user._id, user.email, i)} /></TableCell>
                                        </TableRow>

                                    )}
                                </TableBody></Table>
                            :
                            <h3>No list to be displayed</h3>
                        )]
                    }
                </div>

            )
        }
    }
}
UserList.propTypes = {
    auth: PropTypes.object.isRequired,
    userDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { userDelete, userEdit })(UserList)
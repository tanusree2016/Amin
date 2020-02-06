import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import axios from '../../../common/utils/axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import envirionment from '../../../common/utils/envirionment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { editDesignation, designationDelete } from '../authentication';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";


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

const searchtextfieldHeight = {
    width: 350,
};

class Designation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getAlldesignation: [],
            getAlldesignationBySearch: [],
            getmodulename: [],
            getAllModule: [],
            department: '',
            designation: '',
            moduleId: '',
            modulename: '',
            delIndex: -1,
            editIndex: -1,
            searchItemIndex: -1,
            shortname: '',
            searchBy: '',
            loading: false, // will be true when ajax request is running
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,

        });
    };

    handleClick(e, f, g, h, i, index) {
        this.setState({
            open: true,
            designation: e,
            moduleId: f,
            modulename: g,
            desigid: h,
            shortname: i,
            editIndex: index,
        });
    };

    handleClickDelete(e, index) {
        this.setState({
            open1: true,
            desigid: e,
            delIndex: index,
        });
    }

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    handleInputChangeValueDept(event, id) {

        console.log('dept--------' + event.target);
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        var strArray = val.split("_");
        console.log(nam, "::", val);
        console.log(strArray);
        this.setState({ [nam]: val });
        this.setState({ modulename: strArray[1] });
        this.setState({ moduleId: strArray[0] });
        for (let i = 0; i < this.state.getAllModule.length; i++) {
            console.log("JSON.stringify(desigNameArray.pop(i) --- " + i + " " + JSON.stringify(desigNameArray.pop(i)) + " " + val)
            if (JSON.stringify(desigIdArray.pop(i)) == val) {
                console.log("entered");
                this.state.id = val;
            }
        }


    }

    fetchmodule() {

        console.log('hhh' + JSON.stringify(localStorage.getItem('subscription')))
        let subscription = localStorage.getItem('subscription');
        console.log('subscripti' + subscription);
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
                    getAllModule: res.subscription
                });

                for (let i = 0; i < res.subscription.length; i++) {
                    desigNameArray.push(res.subscription[i].planName);
                    desigIdArray.push(res.subscription[i].subscriptionId);
                }
            })
    }

    fetchAllDesignation() {

        console.log("Calling --- ");
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'designation', {
                method: "GET",
                headers: { 'x-access-token': localStorage.getItem('token'), 'x-access-db': localStorage.getItem('dbname') }
            }).then(res => res.json())
                .then(res => {
                    console.log("hello --- " + res.Designation);
                    this.setState({
                        getAlldesignation: res.Designation,

                    });
                    if(res.Designation.length<=0)
                    {
                        this.state.loading = false
                    }
                    for (let i = 0; i < res.Designation.length; i++) {
                        // let subscription = res.Designation[i].moduleId;
                        desigNameArray.push(res.Designation[i].moduleId);
                        console.log('ddd' + desigNameArray);
                        fetch(envirionment.BASE_URL + 'subscriptionbyId/' + desigNameArray, {
                            data: 'planName',
                            data: 'price',
                            data: 'subscriptionId',
                            method: "GET",
                            headers: {
                                'x-access-token': localStorage.getItem('token'),
                                'x-access-db': localStorage.getItem('dbname')
                            }
                        }).then(res1 => res1.json())
                            .then(res1 => {

                                console.log("hi --- " + JSON.stringify(res1.subscription));

                                this.setState({
                                    getmodulename: res1.subscription,
                                    loading: false,
                                });
                            })

                    }

                })
        })
        console.log("Calling --- End ---  ");
        this.forceUpdate();
    }

    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllDesignation();
        this.fetchmodule();
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.moduleId == '' || this.state.designation == '') {
            showAlert('Please Fill required feilds')
        }

        else {
            console.log('hghd' + this.state.department);
            let val = this.state.department;
            var strArray = val.split("_");
            const editDesignation = {

                moduleId: this.state.moduleId,
                modulename: this.state.modulename,
                designation: this.state.designation,
                shortname: this.state.shortname,
                dbname: localStorage.getItem('dbname'),
                designid: this.state.desigid
            }

            console.log('llll' + editDesignation);
            this.state.getAlldesignation[this.state.editIndex].designation = this.state.designation
            this.state.getAlldesignation[this.state.editIndex].desigid = this.state.desigid
            this.state.getAlldesignation[this.state.editIndex].moduleId = this.state.moduleId
            this.state.getAlldesignation[this.state.editIndex].modulename = this.state.modulename
            this.state.getAlldesignation[this.state.editIndex].shortname = this.state.shortname

            this.props.editDesignation(editDesignation, this.props.history);
            //this.resetField();
            this.handleClose();
        }
    }

    handleDelete(e) {
        e.preventDefault();
        const designationDelete = {
            desigid: this.state.desigid
        }

        this.setState((prevState) => ({
            getAlldesignation: prevState.getAlldesignation.filter((_, i) => i !== this.state.delIndex)
        }));

        this.props.designationDelete(designationDelete, this.props.history);
        this.handleClose();
    }

    handleInputChangeSearchValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

        if (val === "") {
            console.log("Clear")
            this.state.getAlldesignationBySearch = [];
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
        this.state.getAlldesignationBySearch = [];
        let c = 0;
        console.log("Search Calling --- " + this.state.searchBy)
        for (let i = 0; i < this.state.getAlldesignation.length; i++) {
            if (this.state.searchBy === this.state.getAlldesignation[i].designation) {
                this.state.searchItemIndex = i;
                this.state.getAlldesignationBySearch.push(this.state.getAlldesignation[i])
                c = 1;
                this.forceUpdate();
                break;
            }
        }
        if (c == 0) {
            for (let i = 0; i < this.state.getAlldesignation.length; i++) {
                if (this.state.searchBy === this.state.getAlldesignation[i].shortname) {
                    this.state.searchItemIndex = i;
                    this.state.getAlldesignationBySearch.push(this.state.getAlldesignation[i])
                    c = 1;
                    this.forceUpdate();
                    break;
                }
            }
        }
        if (c == 0) {
            for (let i = 0; i < this.state.getAlldesignation.length; i++) {
                if (this.state.searchBy === this.state.getAlldesignation[i].modulename) {
                    this.state.searchItemIndex = i;
                    this.state.getAlldesignationBySearch.push(this.state.getAlldesignation[i])
                    c = 1;
                    this.forceUpdate();
                    //break;
                }
            }
        }
    }



    render() {

        const { loading } = this.state;

        const { open, open1 } = this.state;

        const formControl = {
            minWidth: 150,
        };

        const likePointer = { cursor: 'pointer', color: 'blue' };
        const delPointer = { cursor: 'pointer', color: 'red' };

        const tableHeadStyle = { fontWeight: 'bold', fontSize: '15px', color: 'black' }
        const tableBodyStyle = { fontSize: '12px' }

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

                    <Dialog
                        open={open1}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description" >
                        <DialogTitle id="alert-dialog-title">{"Are sure , want to delete subscription?"}</DialogTitle>
                        <DialogContent>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Disagree
                        </Button>
                            <Button onClick={this.handleDelete} color="primary" autoFocus>
                                Agree
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={open1}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description" >
                        <DialogTitle id="alert-dialog-title">{"Are sure , want to delete subscription?"}</DialogTitle>
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

                    <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Edit Subscription
                        </DialogContentText>
                            <form>

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
                                            <MenuItem value={module.subscriptionId + '_' + module.planName}>{module.planName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="designation"
                                    label="Designation"
                                    name="designation"
                                    value={this.state.designation}
                                    fullWidth
                                    onChange={(ev) => this.handleInputChangeValue(ev)}
                                />

                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="shortname"
                                    label="Short Name"
                                    name="shortname"
                                    value={this.state.shortname}
                                    fullWidth
                                    onChange={(ev) => this.handleInputChangeValue(ev)}
                                />

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
                    </Dialog>

                    <div align="right">
                        <TextField style={searchtextfieldHeight}
                            label="Search by Designation/Short Name/Module"
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

                    {this.state.getAlldesignationBySearch.length > 0 ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableHeadStyle}>Designation</TableCell>
                                    <TableCell style={tableHeadStyle}>Short Name</TableCell>
                                    <TableCell style={tableHeadStyle}>Module Name</TableCell>
                                    <TableCell style={tableHeadStyle}>Edit</TableCell>
                                    <TableCell style={tableHeadStyle}>Delete</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.getAlldesignationBySearch && this.state.getAlldesignationBySearch.map((designation, i) =>

                                    <TableRow>
                                        <TableCell style={tableBodyStyle}>{designation.designation}</TableCell>
                                        <TableCell style={tableBodyStyle}>{designation.shortname}</TableCell>
                                        <TableCell style={tableBodyStyle}>{designation.modulename}</TableCell>

                                        <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(designation.designation, designation.moduleId, designation.modulename, designation._id, designation.shortname, this.state.searchItemIndex)} /></TableCell>
                                        <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(designation._id, this.state.searchItemIndex)} /></TableCell>

                                    </TableRow>

                                )}
                            </TableBody></Table>
                        :
                        [(this.state.getAlldesignation.length > 0 ?
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={tableHeadStyle}>Designation</TableCell>
                                        <TableCell style={tableHeadStyle}>Short Name</TableCell>
                                        <TableCell style={tableHeadStyle}>Module Name</TableCell>
                                        <TableCell style={tableHeadStyle}>Edit</TableCell>
                                        <TableCell style={tableHeadStyle}>Delete</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.getAlldesignation && this.state.getAlldesignation.map((designation, i) =>

                                        <TableRow>
                                            <TableCell style={tableBodyStyle}>{designation.designation}</TableCell>
                                            <TableCell style={tableBodyStyle}>{designation.shortname}</TableCell>
                                            <TableCell style={tableBodyStyle}>{designation.modulename}</TableCell>

                                            <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(designation.designation, designation.moduleId, designation.modulename, designation._id, designation.shortname, i)} /></TableCell>
                                            <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(designation._id, i)} /></TableCell>

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

Designation.propTypes = {
    auth: PropTypes.object.isRequired,
    editDesignation: PropTypes.func.isRequired,
    designationDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps, { editDesignation, designationDelete })(Designation)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
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
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import base_url from '../../../common/utils/axios';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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

const searchtextfieldHeight = {
    width: 350,
};


var vendorArray = [];

class VendorList extends Component {

    constructor(props) {
        super(props);
        this.state = {

            name: '',
            address: '',
            phone: '',
            email: '',
            getAllVendor: [],
            getAllVendorBySearch: [],
            vendors: [],
            delIndex: -1,
            editIndex: -1,
            searchItemIndex: -1,
            loading: false, // will be true when ajax request is running
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
            name: e,
            address: f,
            phone: g,
            email: h,
            vendorid: i,
            editIndex: index,
        });
    };

    handleClickDelete(e, index) {
        this.setState({
            open1: true,
            vendorid: e,
            delIndex: index,
        });
    }

    handleInputChangeSearchValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

        if (val === "") {
            console.log("Clear")
            this.state.getAllVendorBySearch = [];
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
        this.state.getAllVendorBySearch = [];
        let c = 0;
        console.log("Search Calling --- " + this.state.searchBy)
        for (let i = 0; i < this.state.getAllVendor.length; i++) {
            if (this.state.searchBy === this.state.getAllVendor[i].name) {
                this.state.searchItemIndex = i;
                this.state.getAllVendorBySearch.push(this.state.getAllVendor[i])
                this.forceUpdate();
                c = 1;
                //break;
                console.log("Fine")
            }
        }

        if (c == 0) {
            for (let i = 0; i < this.state.getAllVendor.length; i++) {
                if (this.state.searchBy === this.state.getAllVendor[i].email) {
                    this.state.searchItemIndex = i;
                    this.state.getAllVendorBySearch.push(this.state.getAllVendor[i])
                    this.forceUpdate();
                    c = 1;
                    break;
                    console.log("Fine")
                }
            }
        }
    }

    fetchAllVendor() {
        console.log("Calling --- ");
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'vendor-list', {
                method: "GET",
                headers: { 'x-access-token': localStorage.getItem('token'), 'x-access-db': localStorage.getItem('dbname') }
            }).then(res => res.json())
                .then(res => {
                    console.log("Size --- " + res.Vendor.length);
                    this.setState({
                        getAllVendor: res.Vendor,
                        loading: false,
                    });
                    console.log("getAllVendor --- " + JSON.stringify(this.state.getAllVendor))
                    for (let i = 0; i < res.Vendor.length; i++) {
                        vendorArray.push(res.Vendor[i].name);
                        this.setState({ name: res.Vendor[i].name })
                        this.setState({ id: res.Vendor[i]._id })
                        this.setState({ address: res.Vendor[i].address })
                        this.setState({ email: res.Vendor[i].email })
                        this.setState({ phone: res.Vendor[i].phone })
                    }

                    this.setState({ vendors: vendorArray })
                })
        });

        this.forceUpdate();
    }
    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllVendor();
    }

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.name == '') {
            showAlert('Please fill name')
        }
        else {
            const vendorEdit = {

                name: this.state.name,
                address: this.state.address,
                phone: this.state.phone,
                email: this.state.email,
                vendorid: this.state.vendorid
            }

            this.state.getAllVendor[this.state.editIndex].name = this.state.name
            this.state.getAllVendor[this.state.editIndex].address = this.state.address
            this.state.getAllVendor[this.state.editIndex].phone = this.state.phone
            this.state.getAllVendor[this.state.editIndex].email = this.state.email
            this.state.getAllVendor[this.state.editIndex].id = this.state.vendorid

            base_url.post('vendor-update', vendorEdit, {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'x-access-db': localStorage.getItem('dbname')
                }
            })
                .then(res => {
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if (res.data.value == 1) {
                        let success = "Vendor is updates successfully"
                        this.showAlert(success);
                    }
                    else
                        this.showAlert(res.data.message);
                })
                .catch(e => console.log(e))
            this.handleClose();
        }
    }

    showAlert(text) {
        mobiscroll.alert({
            message: text,
        });
    }

    handleDelete(e) {
        e.preventDefault();
        this.setState((prevState) => ({
            fetchAllVendor: prevState.getAllVendor.filter((_, i) => i !== this.state.delIndex)
        }));

        fetch(envirionment.BASE_URL + 'vendor-delete', {
            method: 'post',
            headers: {
                'x-access-db': localStorage.getItem('dbname'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ vendorid: this.state.vendorid })
        }).then(res => res.json())
            .then(res => {
                console.log("DATA --- " + res + " --- " + res.value);
                console.log(res.message);
                if (res.value == 1)
                    showAlert("Vendor is deleted successfully");
                else
                    showAlert(res.message);
            })
            .catch(err => {
            });

        this.handleClose();
        this.fetchAllVendor();
    }

    render() {

        const { loading } = this.state;

        const { open, open1 } = this.state;
        const likePointer = { cursor: 'pointer', color: 'blue' };
        const delPointer = { cursor: 'pointer', color: 'red' };
        const formControl = {
            minWidth: 300,
        };

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
                        <DialogTitle id="alert-dialog-title">"Are sure , to delete the Stock?"
                    </DialogTitle>
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
                        <DialogTitle id="form-dialog-title">Edit
                    <IconButton style={{ float: 'right', color: 'red' }} onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Edit Vendor
                        </DialogContentText>
                            <form>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Item Name"
                                    name="name"
                                    value={this.state.name}
                                    fullWidth
                                    onChange={(ev) => this.handleInputChangeValue(ev)}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="address"
                                    value={this.state.address}
                                    label="Address"
                                    name="address"
                                    multiline={true}
                                    rows={1}
                                    rowsMax={1}
                                    fullWidth
                                    onChange={(ev) => this.handleInputChangeValue(ev)}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="phone"
                                    value={this.state.phone}
                                    label="Phone"
                                    name="phone"
                                    type="tel"
                                    fullWidth
                                    onChange={(ev) => this.handleInputChangeValue(ev)}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    value={this.state.email}
                                    label="Email"
                                    name="email"
                                    type="email"
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
                            label="Search by Name/Email"
                            id="searchBy"
                            name="searchBy"
                            value={this.state.searchBy}
                            onChange={this.handleInputChangeSearchValue.bind(this)}
                            onKeyDown={this._handleKeyDown}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon onClick={this.handleSearch.bind(this)} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    {this.state.getAllVendorBySearch.length > 0 ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableHeadStyle}>Vendor Name</TableCell>
                                    <TableCell style={tableHeadStyle}>Vendor Address</TableCell>
                                    <TableCell style={tableHeadStyle}>Phone Number</TableCell>
                                    <TableCell style={tableHeadStyle}>Email</TableCell>
                                    <TableCell style={tableHeadStyle}>Edit</TableCell>
                                    <TableCell style={tableHeadStyle}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.getAllVendorBySearch && this.state.getAllVendorBySearch.map((vendors, i) =>
                                    <TableRow>
                                        <TableCell style={tableBodyStyle}>{vendors.name}</TableCell>
                                        <TableCell style={tableBodyStyle}>{vendors.address}</TableCell>
                                        <TableCell style={tableBodyStyle}>{vendors.phone}</TableCell>
                                        <TableCell style={tableBodyStyle}>{vendors.email}</TableCell>
                                        <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(vendors.name, vendors.address, vendors.phone, vendors.email, vendors._id, this.state.searchItemIndex)} /></TableCell>
                                        <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(vendors._id, this.state.searchItemIndex)} /></TableCell>
                                    </TableRow>
                                )}
                            </TableBody></Table>
                        :
                        [(this.state.getAllVendor.length > 0 ?
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={tableHeadStyle}>Vendor Name</TableCell>
                                        <TableCell style={tableHeadStyle}>Vendor Address</TableCell>
                                        <TableCell style={tableHeadStyle}>Phone Number</TableCell>
                                        <TableCell style={tableHeadStyle}>Email</TableCell>
                                        <TableCell style={tableHeadStyle}>Edit</TableCell>
                                        <TableCell style={tableHeadStyle}>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.getAllVendor && this.state.getAllVendor.map((vendors, i) =>
                                        <TableRow>
                                            <TableCell style={tableBodyStyle}>{vendors.name}</TableCell>
                                            <TableCell style={tableBodyStyle}>{vendors.address}</TableCell>
                                            <TableCell style={tableBodyStyle}>{vendors.phone}</TableCell>
                                            <TableCell style={tableBodyStyle}>{vendors.email}</TableCell>
                                            <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(vendors.name, vendors.address, vendors.phone, vendors.email, vendors._id, i)} /></TableCell>
                                            <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(vendors._id, i)} /></TableCell>
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

VendorList.propTypes = {
    auth: PropTypes.object.isRequired,
    // planDelete: PropTypes.func.isRequired,
    // planEdit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {})(VendorList)
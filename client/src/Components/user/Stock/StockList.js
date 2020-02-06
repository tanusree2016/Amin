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
import swal from 'sweetalert';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import base_url from '../../../common/utils/axios';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ViewIcon from '@material-ui/icons/Visibility';
import Moment from 'moment';

mobiscroll.settings = {
    theme: 'ios',
}
var unitArray = [];
function showAlert(text) {
    mobiscroll.alert({
        message: text,

    });
}

var stockArray = [];

const searchtextfieldHeight = {
    width: 350,
};

class StockList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            stock: '',
            stockStore: '',
            getAllStock: [],
            getAllStockBySearch: [],
            getSKUBySearch: [],
            getGRNBySearch: [],
            searchBy: '',
            searchBySKU: '',
            getStockById: [],
            stocks: [],
            unit: '',
            stock_type: '',
            lower_limit: '',
            upper_limit: '',
            expiry_date: '',
            getAllunit: [],
            delIndex: -1,
            editIndex: -1,
            searchItemIndex: -1,
            getAllVendor: [],
            vendorname: '',
            grn: '',
            labelWidthDep: 90,
            expiry_date: new Date(),
            max_expiry_date: new Date(),
            entry_date: new Date(),
            max_entry_date: new Date(),
            grnid: '',
            vendorid: '',
            itemid: '',
            no_of_materials: '',
            unit: '',
            stock_type: '',
            vendornamebystockid: '',
            entrydatebystockid: '',
            expirydatebystockid: '',
            grnbystockid: '',
            loading: false, // will be true when ajax request is running
        };

        this.state.entry_date = new Date();
        this.state.expiry_date = new Date();
        this.state.max_entry_date = this.state.entry_date;
        this.state.min_expiry_date = this.state.expiry_date;

        this.handleSearchSKU = this.handleSearchSKU.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleProceed = this.handleProceed.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEntrydateChange = this.handleEntrydateChange.bind(this);
        this.handleExpirydateChange = this.handleExpirydateChange.bind(this);
    }

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,
            open2: false,
            open3: false,
            open4: false,
        });
    };

    handleCloseGRN = () => {
        this.setState({
            open4: false,
        });
    };

    handleClick(e, f, g, h, i, j, k, l, index) {
        this.setState({
            open: true,
            stock: e,
            stockStore: e,
            name: f,
            unit: g,
            stockid: h,
            stock_type: i,
            lower_limit: j,
            upper_limit: k,
            expiry_date: l,
            editIndex: index,
        });
        console.log("Stock Id --- " + h)
    };

    handleClickGRN(sid, index) {
        this.setState({
            open3: true,
            stockid: sid,
            editIndex: index,
        });
        console.log("sid --- " + sid)
        this.state.stockid = sid;
        this.fetchStockById();
    };

    handleClickGRNEdit(egrnid, eitemid, nom, eunit, stype, index) {
        this.setState({
            open4: true,
            grnid: egrnid,
            itemid: eitemid,
            no_of_materials: nom,
            unit: eunit,
            stock_type: stype,
            editIndex: index,
        });
        this.state.vendornamebystockid = this.state.getStockById[index].vendorid
        this.state.entrydatebystockid = Moment(this.state.getStockById[index].entry_date).format("DD/MM/YYYY")
        this.state.expirydatebystockid = Moment(this.state.getStockById[index].expiry_date).format("DD/MM/YYYY")
        this.state.grnbystockid = this.state.getStockById[index].GRN
    };

    handleClickDelete(e, index) {
        this.setState({
            open1: true,
            stockid: e,
            delIndex: index,
        });
    }

    fetchAllStock() {
        console.log("Calling --- ");
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'stock-list', {
                method: "GET",
                headers: { 'x-access-token': localStorage.getItem('token'), 'x-access-db': localStorage.getItem('dbname') }
            }).then(res => res.json())
                .then(res => {
                    console.log("Size --- " + res.Stock.length);
                    this.setState({
                        getAllStock: res.Stock,
                        loading: false,
                    });
                    console.log("Stock Item --- " + JSON.stringify(res.Stock))
                    for (let i = 0; i < res.Stock.length; i++) {
                        stockArray.push(res.Stock[i].planName);
                        this.setState({ plans: res.Stock[i].name })
                        this.setState({ id: res.Stock[i].planId })
                        this.setState({ stock: res.Stock[i].stock })
                        this.setState({ unit: res.Stock[i].unit.name })
                        this.setState({ stock_type: res.Stock[i].stock_type })
                        this.setState({ lower_limit: res.Stock[i].lower_limit })
                        this.setState({ upper_limit: res.Stock[i].upper_limit })
                        this.setState({ expiry_date: res.Stock[i].expiry_date })
                    }
                    console.log('---' + this.state.unit);
                    console.log('--test-' + this.state.stock);
                    console.log('array' + stockArray);
                    this.setState({ stocks: stockArray })
                    console.log("Plan Names --- " + JSON.stringify(this.state.getAllStock));   
                })
        });
        console.log("Calling --- End ---  ");
        this.forceUpdate();
    }

    fetchAllVendor() {
        fetch(envirionment.BASE_URL + 'vendor-list', {
            method: 'get',
            headers: {
                'x-access-db': localStorage.getItem('dbname'),
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    getAllVendor: res.Vendor,
                });
                console.log("Requisition Details --- " + JSON.stringify(res.Vendor))
            })
            .catch(error => {
                console.log("ERROR --- " + error)
            });
    }

    fetchStockById() {
        Moment.locale('en')
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'GRN-list', {
                method: 'post',
                headers: {
                    'x-access-db': localStorage.getItem('dbname'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ stockId: this.state.stockid })
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        getStockById: res.list,
                        loading: false,
                    });
                    console.log("Stock Details By Id --- " + JSON.stringify(res.list) + " --- " + this.state.stockid)
                })
                .catch(error => {
                    console.log("ERROR --- " + error)
                });
        });
    }

    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllStock();
        this.fetchUnit();
        this.fetchAllVendor();
    }

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    handleInputChangeSearchValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

        if (val === "") {
            console.log("Clear")
            this.state.getAllStockBySearch = [];
            this.forceUpdate();
        }
    }

    handleInputChangeSearchSKUValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

        if (val === "") {
            console.log("Clear")
            this.state.getSKUBySearch = [];
            this.state.getGRNBySearch = [];
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
        this.state.getAllStockBySearch = [];
        console.log("Search Calling --- " + this.state.searchBy)
        for (let i = 0; i < this.state.getAllStock.length; i++) {
            if (this.state.searchBy === this.state.getAllStock[i].name) {
                this.state.searchItemIndex = i;
                this.state.getAllStockBySearch.push(this.state.getAllStock[i])
                this.forceUpdate();
                break;
            }
        }
    }

    handleSearchSKU(e) {
        e.preventDefault();
        this.searchItemDisplaySKU();
    }

    _handleKeyDownSKU = (e) => {
        if (e.key === 'Enter') {
            this.searchItemDisplaySKU();
        }
    }

    searchItemDisplaySKU() {
        this.state.getSKUBySearch = [];

        let c = 0;
        console.log("Search Calling --- " + this.state.searchBySKU)
        for (let i = 0; i < this.state.getStockById.length; i++) {
            if (this.state.searchBySKU === this.state.getStockById[i].SKU) {
                this.state.searchItemIndex = i;
                this.state.getSKUBySearch.push(this.state.getStockById[i])
                this.forceUpdate();
                c = 1;
                break;
                console.log("Fine")
            }
        }
        if (c == 0) {
            for (let i = 0; i < this.state.getStockById.length; i++) {
                if (this.state.searchBySKU === this.state.getStockById[i].GRN_number) {
                    this.state.searchItemIndex = i;
                    this.state.getSKUBySearch.push(this.state.getStockById[i])
                    this.forceUpdate();
                    c = 1;
                    break;
                    console.log("ok")
                }
            }
        }
    }

    handleInputChangeValueQOH(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        if (parseInt(this.state.stockStore) < parseInt(val)) {
            console.log("Executing ---")
            document.getElementById("p1").style.display = "block"
            document.getElementById("s1").style.display = "none"
            this.state.stockStore = val - this.state.stockStore
        }
        else {
            console.log("Executing Else ---")
            document.getElementById("p1").style.display = "none"
            document.getElementById("s1").style.display = "block"
        }
        this.setState({ [nam]: val });
    }

    handleProceed(e) {
        this.setState({
            open2: true,
        });
    }

    handleSubmit(e, buttonClicked) {
        e.preventDefault();
        if (this.state.name == '') {
            showAlert('Please fill name')
        }
        else {
            if (buttonClicked === "edit") {
                const stockEdit = {

                    name: this.state.name,
                    stock: this.state.stock,
                    unit: this.state.unit,
                    stockid: this.state.stockid,
                    stock_type: this.state.stock_type,
                    lower_limit: this.state.lower_limit,
                    upper_limit: this.state.upper_limit,
                }

                console.log("edit --- " + JSON.stringify(stockEdit))

                base_url.post('stock-update', stockEdit, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                        'x-access-db': localStorage.getItem('dbname')
                    }
                })
                    .then(res => {
                        //this.resetField();
                        console.log(res.data.value);
                        console.log(res.data.message);
                        if (res.data.value == 1) {
                            //swal("Plan is added successfully");
                            let success = "Stock is updates successfully"
                            this.showAlert(success);
                            this.fetchAllStock();

                        }
                        else
                            //swal(res.data.message);
                            this.showAlert(res.data.message);

                        //this.resetField();
                        // this.reloadChild();
                    })
                    .catch(e => console.log(e))
                this.handleClose();
            }

            if (buttonClicked === "submit") {
                const stockEdit = {
                    name: this.state.name,
                    stock: this.state.stock,
                    unit: this.state.unit,
                    stockid: this.state.stockid,
                    stock_type: this.state.stock_type,
                    lower_limit: this.state.lower_limit,
                    upper_limit: this.state.upper_limit,
                    no_of_materials: this.state.stockStore,
                    expiry_date: this.state.expiry_date,
                    entry_date: this.state.entry_date,
                    GRN: this.state.grn,
                    vendorid: this.state.vendorname,
                }

                console.log("submit --- " + JSON.stringify(stockEdit))

                base_url.post('stock-update', stockEdit, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                        'x-access-db': localStorage.getItem('dbname')
                    }
                })
                    .then(res => {
                        //this.resetField();
                        console.log(res.data.value);
                        console.log(res.data.message);
                        if (res.data.value == 1) {
                            //swal("Plan is added successfully");
                            let success = "Stock is updates successfully"
                            this.showAlert(success);
                            this.fetchAllStock();

                        }
                        else
                            //swal(res.data.message);
                            this.showAlert(res.data.message);

                        //this.resetField();
                        // this.reloadChild();
                    })
                    .catch(e => console.log(e))
                this.handleClose();
            }

            if (buttonClicked === "skip") {
                const stockEdit = {

                    name: this.state.name,
                    stock: this.state.stock,
                    unit: this.state.unit,
                    stockid: this.state.stockid,
                    stock_type: this.state.stock_type,
                    lower_limit: this.state.lower_limit,
                    upper_limit: this.state.upper_limit,
                    no_of_materials: this.state.stockStore,
                    expiry_date: '',
                    entry_date: '',
                    GRN: 'skip',
                    vendorid: '',
                }

                console.log("Skip --- " + JSON.stringify(stockEdit))

                base_url.post('stock-update', stockEdit, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                        'x-access-db': localStorage.getItem('dbname')
                    }
                })
                    .then(res => {
                        //this.resetField();
                        console.log(res.data.value);
                        console.log(res.data.message);
                        if (res.data.value == 1) {
                            //swal("Plan is added successfully");
                            let success = "Stock is updates successfully"
                            this.showAlert(success);
                            this.fetchAllStock();

                        }
                        else
                            //swal(res.data.message);
                            this.showAlert(res.data.message);

                        //this.resetField();
                        // this.reloadChild();
                    })
                    .catch(e => console.log(e))
                this.handleClose();
            }

        }

    }

    showAlert(text) {
        mobiscroll.alert({
            message: text,
        });
    }

    handleInputChangeValueUnit(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, "::", val);
        this.setState({ [nam]: val });
    }


    fetchUnit() {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'unit-list', {
            method: "GET",
            headers: { 'x-access-token': localStorage.getItem('token'), 'x-access-db': localStorage.getItem('dbname') }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    getAllunit: res.Unit
                });
                for (let i = 0; i < res.Unit.length; i++) {
                    unitArray.push(res.Unit[i].name);
                    this.setState({ unitname: res.Unit[i].name })
                    this.setState({ shortname: res.Unit[i].shortname })
                }
                console.log('array' + unitArray);
                this.setState({ stocks: unitArray })

                console.log("Plan Names --- " + this.state.getAllunit);
            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }

    handleEntrydateChange(date) {
        this.setState({ entry_date: date })
    }

    handleExpirydateChange(date) {
        this.setState({ expiry_date: date })
    }

    handleDelete(e) {
        e.preventDefault();
        console.log("this.state.stockid --- " + this.state.stockid)

        this.setState((prevState) => ({
            getAllStock: prevState.getAllStock.filter((_, i) => i !== this.state.delIndex)
        }));

        fetch(envirionment.BASE_URL + 'stock-delete', {
            method: 'post',
            headers: {
                'x-access-db': localStorage.getItem('dbname'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ stockid: this.state.stockid })
        }).then(res => res.json())
            .then(res => {
                console.log("DATA --- " + res + " --- " + res.value);
                console.log(res.message);
                if (res.value == 1)
                    showAlert("Stock is deleted successfully");
                else
                    showAlert(res.message);
            })
            .catch(err => {
            });

        this.handleClose();
    }

    render() {
        const { open, open1, open2, open3, open4 } = this.state;

        const { loading } = this.state;

        const likePointer = { cursor: 'pointer', color: 'blue' };
        const delPointer = { cursor: 'pointer', color: 'red' };

        const tableHeadStyle = { fontWeight: 'bold', fontSize: '15px', color: 'black' }
        const tableBodyStyle = { fontSize: '12px' }
        const tableBodyStyleRed = { fontWeight: 'bold', fontSize: '12px', color: 'green' }

        const formControl = {
            minWidth: 300,
        };
        const datefieldHeight = {
            width: 135,
            height: 50,
            marginLeft: 4,
            marginRight: 4,
            marginTop: 5,
            resize: 'none',
        };
        const textfieldHeight = {
            width: 300,
            height: 50,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 2,
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
                <div>

                    <Dialog
                        open={open1}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description" >
                        <DialogTitle id="alert-dialog-title">{"Are sure , to delete the Stock?"}</DialogTitle>
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
                                Edit Plan
                        </DialogContentText>
                            <form>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Item Name"
                                    name="name"
                                    value={this.state.name}
                                    fullWidth
                                    // onChange={(ev) => this.handleInputChangeValue(ev)}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="stock"
                                    value={this.state.stock}
                                    label="QOH"
                                    name="stock"
                                    fullWidth
                                    onChange={(ev) => this.handleInputChangeValueQOH(ev)}
                                />

                                <TextField
                                    margin="dense"
                                    id="lower_limit"
                                    value={this.state.lower_limit}
                                    label="Lower Limit"
                                    name="lower_limit"
                                    fullWidth
                                    onChange={(ev) => this.handleInputChangeValue(ev)}
                                />

                                <TextField
                                    margin="dense"
                                    id="upper_limit"
                                    value={this.state.upper_limit}
                                    label="Upper Limit"
                                    name="upper_limit"
                                    fullWidth
                                    onChange={(ev) => this.handleInputChangeValue(ev)}
                                />

                                <FormControl style={formControl}>
                                    <InputLabel htmlFor="unit">Unit</InputLabel>
                                    <Select
                                        value={this.state.unit}
                                        onChange={(ev) => this.handleInputChangeValueUnit(ev, 9)}
                                        inputProps={{
                                            name: 'unit',
                                            id: 'unit',
                                        }}
                                    >
                                        {this.state.getAllunit.map(module => (
                                            <MenuItem value={module._id}>{module.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl style={formControl}>
                                    <InputLabel htmlFor="unit">Stock Type</InputLabel>
                                    <Select
                                        value={this.state.stock_type}
                                        onChange={(ev) => this.handleInputChangeValueUnit(ev, 9)}
                                        inputProps={{
                                            name: 'stock_type',
                                            id: 'stock_type',
                                        }}
                                    >

                                        <MenuItem value="RM">Raw Materials</MenuItem>
                                        <MenuItem value="FG">Finished Goods</MenuItem>

                                    </Select>
                                </FormControl>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary">
                                Cancel
                        </Button>
                            <Button id="p1" style={{ fontWeight: 'bold', display: 'none' }} onClick={this.handleProceed} color="primary">
                                Proceed
                        </Button>
                            <Button id="s1" style={{ fontWeight: 'bold', display: 'block' }} onClick={e => this.handleSubmit(e, "edit")} color="primary">
                                Submit
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={open2}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description" >
                        <DialogTitle id="alert-dialog-title">{"Edit GRN"}</DialogTitle>
                        <DialogContent>
                            <div style={{ width: 300, height: 300 }}>
                                <form>
                                    <div>
                                        <FormControl variant="outlined" margin="dense" style={formControl}>
                                            <InputLabel htmlFor="vendorname">Vendor Name</InputLabel>
                                            <Select style={{ height: "40px", minHeight: "40px", marginLeft: 4, marginRight: 4 }}
                                                value={this.state.vendorname}
                                                onChange={(ev) => this.handleInputChangeValue(ev)}
                                                labelWidth={this.state.labelWidthDep}
                                                inputProps={{
                                                    name: 'vendorname',
                                                    id: 'vendorname',
                                                }}
                                            >
                                                {this.state.getAllVendor.length > 0 && this.state.getAllVendor.map(vendor => (
                                                    <MenuItem value={vendor._id}>{vendor.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <br /><br />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker style={datefieldHeight}
                                            margin="normal"
                                            id="entry_date"
                                            label="Entry Date"
                                            name="entry_date"
                                            format="dd/MM/yyyy"
                                            maxDate={this.state.max_entry_date}
                                            value={this.state.entry_date}
                                            onChange={this.handleEntrydateChange}
                                            KeyboardButtonProps={{ 'aria-label': 'change date', }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker style={datefieldHeight}
                                            margin="normal"
                                            id="expiry_date"
                                            label="Expiry Date"
                                            name="expiry_date"
                                            format="dd/MM/yyyy"
                                            minDate={this.state.expiry_date}
                                            value={this.state.expiry_date}
                                            onChange={this.handleExpirydateChange}
                                            KeyboardButtonProps={{ 'aria-label': 'change date', }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <br /><br />
                                    <div>
                                        <TextField style={textfieldHeight}
                                            variant="outlined"
                                            margin="dense"
                                            label="GRN"
                                            required
                                            multiline={true}
                                            rows={4}
                                            rowsMax={4}
                                            id="grn"
                                            name="grn"
                                            value={this.state.grn}
                                            onChange={this.handleInputChangeValue.bind(this)}
                                        />
                                    </div>
                                </form>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button style={{ fontWeight: 'bold' }} onClick={e => this.handleSubmit(e, "submit")} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={open3}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth="false" >
                        <DialogTitle id="alert-dialog-title">{"Edit GRN"}
                            <IconButton style={{ float: 'right', color: 'red' }} onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <div style={{ width: 800, height: 700 }}>
                                <div align="right">
                                    <TextField style={searchtextfieldHeight}
                                        label="Search by SKU or GRN No."
                                        id="searchBySKU"
                                        name="searchBySKU"
                                        value={this.state.searchBySKU}
                                        onChange={this.handleInputChangeSearchSKUValue.bind(this)}
                                        onKeyDown={this._handleKeyDownSKU}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment>
                                                    <IconButton>
                                                        <SearchIcon onClick={this.handleSearchSKU} />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                                {this.state.getSKUBySearch.length > 0 ?
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={tableHeadStyle}>Item Name</TableCell>
                                                <TableCell style={tableHeadStyle}>Quantity</TableCell>
                                                <TableCell style={tableHeadStyle}>QOM</TableCell>
                                                <TableCell style={tableHeadStyle}>GRN No.</TableCell>
                                                <TableCell style={tableHeadStyle}>SKU</TableCell>
                                                <TableCell style={tableHeadStyle}>View GRN</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.getSKUBySearch && this.state.getSKUBySearch.map((stocks, i) =>
                                                <TableRow>
                                                    <TableCell style={tableBodyStyle}>{stocks.item.name}</TableCell>
                                                    <TableCell style={tableBodyStyle}>{stocks.no_of_materials}</TableCell>
                                                    <TableCell style={tableBodyStyle}>{stocks.unit.name}</TableCell>
                                                    <TableCell style={tableBodyStyle}>{stocks.GRN_number}</TableCell>
                                                    <TableCell style={tableBodyStyle}>{stocks.SKU}</TableCell>
                                                    <TableCell><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickGRNEdit(stocks._id, stocks.item._id, stocks.no_of_materials, stocks.item.unit, stocks.item.stock_type, this.state.searchItemIndex)} /></TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody></Table>
                                    :
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={tableHeadStyle}>Item Name</TableCell>
                                                <TableCell style={tableHeadStyle}>Quantity</TableCell>
                                                <TableCell style={tableHeadStyle}>QOM</TableCell>
                                                <TableCell style={tableHeadStyle}>GRN No.</TableCell>
                                                <TableCell style={tableHeadStyle}>SKU</TableCell>
                                                <TableCell style={tableHeadStyle}>View GRN</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.getStockById && this.state.getStockById.map((stocks, i) =>
                                                <TableRow>
                                                    <TableCell style={tableBodyStyle}>{stocks.item.name}</TableCell>
                                                    <TableCell style={tableBodyStyle}>{stocks.no_of_materials}</TableCell>
                                                    <TableCell style={tableBodyStyle}>{stocks.unit.name}</TableCell>
                                                    <TableCell style={tableBodyStyle}>{stocks.GRN_number}</TableCell>
                                                    <TableCell style={tableBodyStyle}>{stocks.SKU}</TableCell>
                                                    <TableCell><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickGRNEdit(stocks._id, stocks.item._id, stocks.no_of_materials, stocks.item.unit, stocks.item.stock_type, i)} /></TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody></Table>
                                }
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog
                        open={open4}
                        onClose={this.handleCloseGRN}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description" >
                        <DialogTitle id="alert-dialog-title">{"Edit GRN"}</DialogTitle>
                        <DialogContent>
                            <div style={{ width: 300, height: 300 }}>
                                <form>
                                    <div>
                                        <TextField style={textfieldHeight}
                                            variant="outlined"
                                            margin="dense"
                                            name="vendorname"
                                            label="Vendor Name"
                                            value={this.state.vendornamebystockid}
                                            InputProps={{
                                                disabled: true,
                                            }}
                                        />
                                    </div>
                                    <br /><br />

                                    <div>
                                        <TextField style={textfieldHeight}
                                            variant="outlined"
                                            margin="dense"
                                            name="entry_date"
                                            label="Entry Date"
                                            value={this.state.entrydatebystockid}
                                            InputProps={{
                                                disabled: true,
                                            }}
                                        />
                                    </div>

                                    <br /><br />

                                    <div>
                                        <TextField style={textfieldHeight}
                                            variant="outlined"
                                            margin="dense"
                                            name="expiry_date"
                                            label="Expiry Date"
                                            value={this.state.expirydatebystockid}
                                            InputProps={{
                                                disabled: true,
                                            }}
                                        />
                                    </div>

                                    <br /><br />
                                    <div>
                                        <TextField style={textfieldHeight}
                                            variant="outlined"
                                            margin="dense"
                                            label="GRN"
                                            required
                                            multiline={true}
                                            rows={4}
                                            rowsMax={4}
                                            id="grn"
                                            name="grn"
                                            value={this.state.grnbystockid}
                                            //onChange={this.handleInputChangeValue.bind(this)}
                                            InputProps={{
                                                disabled: true,
                                            }}
                                        />
                                    </div>
                                </form>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button style={{ fontWeight: 'bold' }} onClick={this.handleCloseGRN} color="primary">
                                Close
                        </Button>

                        </DialogActions>
                    </Dialog>
                    <div align="right">
                        <TextField style={searchtextfieldHeight}
                            label="Search by Item Name"
                            id="searchBy"
                            name="searchBy"
                            value={this.state.searchBy}
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

                    {this.state.getAllStockBySearch.length > 0 ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableHeadStyle}>Item Name</TableCell>
                                    <TableCell style={tableHeadStyle}>QOH</TableCell>
                                    <TableCell style={tableHeadStyle}>QOM</TableCell>
                                    <TableCell style={tableHeadStyle}>Upper Limit</TableCell>
                                    <TableCell style={tableHeadStyle}>Lower Limit</TableCell>
                                    <TableCell style={tableHeadStyle}>Edit Item</TableCell>
                                    <TableCell style={tableHeadStyle}>View GRN</TableCell>
                                    <TableCell style={tableHeadStyle}>Delete</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.getAllStockBySearch && this.state.getAllStockBySearch.map((stocks, i) =>

                                    <TableRow>
                                        <TableCell style={tableBodyStyle}>{stocks.name}</TableCell>
                                        {parseInt(stocks.upper_limit) < parseInt(stocks.stock) || parseInt(stocks.lower_limit) > parseInt(stocks.stock) ?
                                            <TableCell style={tableBodyStyleRed}>{stocks.stock}</TableCell>
                                            :
                                            <TableCell style={tableBodyStyle}>{stocks.stock}</TableCell>
                                        }
                                        <TableCell style={tableBodyStyle}>{stocks.unit.name}</TableCell>
                                        <TableCell style={tableBodyStyle}>{stocks.upper_limit}</TableCell>
                                        <TableCell style={tableBodyStyle}>{stocks.lower_limit}</TableCell>
                                        <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(stocks.stock, stocks.name, stocks.unit._id, stocks._id, stocks.stock_type, stocks.lower_limit, stocks.upper_limit, stocks.expiry_date, this.state.searchItemIndex)} /></TableCell>
                                        <TableCell><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickGRN(stocks._id, this.state.searchItemIndex)} /></TableCell>
                                        <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(stocks._id, this.state.searchItemIndex)} /></TableCell>
                                    </TableRow>

                                )}
                            </TableBody></Table>
                        :
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableHeadStyle}>Item Name</TableCell>
                                    <TableCell style={tableHeadStyle}>QOH</TableCell>
                                    <TableCell style={tableHeadStyle}>QOM</TableCell>
                                    <TableCell style={tableHeadStyle}>Upper Limit</TableCell>
                                    <TableCell style={tableHeadStyle}>Lower Limit</TableCell>
                                    <TableCell style={tableHeadStyle}>Edit Item</TableCell>
                                    <TableCell style={tableHeadStyle}>View GRN</TableCell>
                                    <TableCell style={tableHeadStyle}>Delete</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.getAllStock && this.state.getAllStock.map((stocks, i) =>

                                    <TableRow>
                                        <TableCell style={tableBodyStyle}>{stocks.name}</TableCell>
                                        {parseInt(stocks.upper_limit) < parseInt(stocks.stock) || parseInt(stocks.lower_limit) > parseInt(stocks.stock) ?
                                            <TableCell style={tableBodyStyleRed}>{stocks.stock}</TableCell>
                                            :
                                            <TableCell style={tableBodyStyle}>{stocks.stock}</TableCell>
                                        }
                                        <TableCell style={tableBodyStyle}>{stocks.unit.name}</TableCell>
                                        <TableCell style={tableBodyStyle}>{stocks.upper_limit}</TableCell>
                                        <TableCell style={tableBodyStyle}>{stocks.lower_limit}</TableCell>
                                        <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(stocks.stock, stocks.name, stocks.unit._id, stocks._id, stocks.stock_type, stocks.lower_limit, stocks.upper_limit, stocks.expiry_date, i)} /></TableCell>
                                        <TableCell><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickGRN(stocks._id, i)} /></TableCell>
                                        <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(stocks._id, i)} /></TableCell>
                                    </TableRow>

                                )}
                            </TableBody></Table>
                    }

                </div>
            )
        }
    }
}

StockList.propTypes = {
    auth: PropTypes.object.isRequired,
    // planDelete: PropTypes.func.isRequired,
    // planEdit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {})(StockList)
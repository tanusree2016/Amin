import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import base_url from '../../../common/utils/axios';
import StockList from './StockList';
import envirionment from '../../../common/utils/envirionment';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

var ignoreCase = require('ignore-case');

mobiscroll.settings = {
    theme: 'ios',
}
var unitArray = [];
class AddStock extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
            name: '',
            stock: '',
            stock_type: '',
            lower_limit: '',
            upper_limit: '',
            expiry_date: new Date(),
            max_expiry_date: new Date(),
            entry_date: new Date(),
            max_entry_date: new Date(),
            showChild: true,
            unit: '',
            getAllunit: [],
            getAllVendor: [],
            vendorname: '',
            grn: '',
            labelWidthDep: 90,
            getAllStock: [],
            stockItem: [],
            loading: false, // will be true when ajax request is running
        }

        this.state.entry_date = new Date();
        this.state.expiry_date = new Date();
        this.state.max_entry_date = this.state.entry_date;
        this.state.min_expiry_date = this.state.expiry_date;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleExpirydateChange = this.handleExpirydateChange.bind(this);
        this.handleEntrydateChange = this.handleEntrydateChange.bind(this);
        this.handleProceed = this.handleProceed.bind(this);
    }

    reloadChild = () => {
        this.setState({
            showChild: false,
        })

        setTimeout(() => {
            this.setState({
                showChild: true,
            })
        }, 100);
    }

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    handleBlur(event) {
        //this.fetchAllStock();
        for (let i = 0; i < this.state.stockItem.length; i++) {
            if (ignoreCase.equals(this.state.stockItem[i] , this.state.name)) {
                this.state.name = ""
                //this.state.loading=false
                this.showAlert("Item already exists , please edit item")
                this.forceUpdate()
                break
            }
        }
    }

    handleExpirydateChange(date) {
        this.setState({ expiry_date: date })
    }

    handleEntrydateChange(date) {
        this.setState({ entry_date: date })
    }

    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchUnit();
        this.fetchAllVendor();
        this.fetchAllStock();
    }

    showAlert(text) {
        mobiscroll.alert({
            message: text,
        });
    }

    handleProceed(e) {
        e.preventDefault();
        if (this.state.name.length <= 0 || this.state.stock.length <= 0 || this.state.unit.length <= 0 || this.state.stock_type.length <= 0 || this.state.lower_limit.length <= 0 || this.state.upper_limit.length <= 0) {
            this.showAlert('All fields are mandatory')
        }
        else {
            this.setState({ open: true, })
            this.state.open = true;
        }
    }

    handleSubmit(e, buttonClicked) {
        e.preventDefault();
        this.state.open = false;
        if (buttonClicked === "submit") {
            if (this.state.vendorname.length <= 0 || this.state.grn.length <= 0) {
                this.showAlert('All fields are mandatory')
            }
            else {
                const stockCreateApi = {
                    name: this.state.name,
                    stock: this.state.stock,
                    unit: this.state.unit,
                    stock_type: this.state.stock_type,
                    lower_limit: this.state.lower_limit,
                    upper_limit: this.state.upper_limit,
                    expiry_date: this.state.expiry_date,
                    entry_date: this.state.entry_date,
                    GRN: this.state.grn,
                    vendorid: this.state.vendorname,
                }
                this.forceUpdate();
                console.log("Stock Value : --- " + JSON.stringify(stockCreateApi))
                base_url.post('stock', stockCreateApi, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                        'x-access-db': localStorage.getItem('dbname')
                    }
                })
                    .then(res => {
                        this.resetField();
                        console.log(res.data.value);
                        console.log(res.data.message);
                        if (res.data.value == 1) {
                            //swal("Plan is added successfully");
                            let success = "Stock is added successfully"
                            this.showAlert(success);
                        }
                        else
                            //swal(res.data.message);
                            this.showAlert(res.data.message);

                        this.resetField();
                        this.reloadChild();
                    })
                    .catch(e => console.log(e))
            }
        }
        // if (buttonClicked === "skip") {
        //     if (this.state.name == '') {
        //         this.showAlert('Please fill name')
        //     }
        //     else {
        //         const stockCreateApi = {
        //             name: this.state.name,
        //             stock: this.state.stock,
        //             unit: this.state.unit,
        //             stock_type: this.state.stock_type,
        //             lower_limit: this.state.lower_limit,
        //             upper_limit: this.state.upper_limit,
        //             expiry_date: '',
        //             entry_date: '',
        //             GRN: 'skip',
        //             vendorid: '',
        //         }
        //         this.forceUpdate();
        //         console.log("Stock Value : --- " + JSON.stringify(stockCreateApi))
        //         base_url.post('stock', stockCreateApi, {
        //             headers: {
        //                 'x-access-token': localStorage.getItem('token'),
        //                 'x-access-db': localStorage.getItem('dbname')
        //             }
        //         })
        //             .then(res => {
        //                 this.resetField();
        //                 console.log(res.data.value);
        //                 console.log(res.data.message);
        //                 if (res.data.value == 1) {
        //                     //swal("Plan is added successfully");
        //                     let success = "Stock is added successfully"
        //                     this.showAlert(success);
        //                 }
        //                 else
        //                     //swal(res.data.message);
        //                     this.showAlert(res.data.message);

        //                 this.resetField();
        //                 this.reloadChild();
        //             })
        //             .catch(e => console.log(e))
        //     }
        // }

        this.handleClose();
        this.resetField();
    }

    fetchAllStock() {
        console.log("Calling --- Loader ");
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
                        this.state.stockItem.push(res.Stock[i].name);
                    }
                })
        });
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

    fetchAllVendor() {
        let id = localStorage.getItem('id');
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

    resetField = () => {
        this.setState({ name: '' });
        this.setState({ stock: '' });
        this.setState({ stock_type: '' });
        this.setState({ lower_limit: '' });
        this.setState({ upper_limit: '' });
        this.setState({ expiry_date: new Date() });
        this.setState({ min_expiry_date: this.state.entry_date })
        this.setState({ entry_date: new Date() });
        this.setState({ max_entry_date: this.state.entry_date })
        this.state.grn = ''
        this.state.vendorname = ''
    }

    handleClose = () => {
        this.setState({
            open: false,
        });
        this.state.expiry_date = new Date();
        this.state.min_expiry_date = new Date();
        this.state.entry_date = new Date();
        this.state.max_entry_date = this.state.entry_date;
    };

    render() {

        const { loading } = this.state;

        const { open } = this.state;

        const styles1 = {
            textAlign: 'center',
            paddingTop: '2',
        };

        const textfieldHeight = {
            width: 300,
            height: 50,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 2,
        };

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
                        open={open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description" >
                        <DialogTitle id="alert-dialog-title">{"Enter GRN Details"}</DialogTitle>
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
                            {/* <Button onClick={e => this.handleSubmit(e, "skip")} color="secondary">
                            Skip
                        </Button> */}
                        </DialogActions>
                    </Dialog>

                    <div style={styles1}>

                        <Typography variant="h5" gutterBottom paragraph>
                            Add Stock
                    </Typography>

                        <form className="reg">
                            <div>
                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required="true"
                                    inputProps={{ "padding-top": '0', "padding-bottom": '0' }}
                                    id="name"
                                    label="Item Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={(ev) => this.handleInputChangeValue(ev)}
                                    onBlur={(ev) => this.handleBlur(ev)}
                                />

                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required="true"
                                    inputProps={{ "padding-top": '0', "padding-bottom": '0' }}
                                    id="stock"
                                    label="QOH"
                                    name="stock"
                                    type="tel"
                                    value={this.state.stock}
                                    onChange={(ev) => this.handleInputChangeValue(ev)}
                                />
                            </div>
                            <div>
                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required="true"
                                    inputProps={{ "padding-top": '0', "padding-bottom": '0' }}
                                    id="lower_limit"
                                    label="Lower Limit"
                                    name="lower_limit"
                                    type="tel"
                                    value={this.state.lower_limit}
                                    onChange={(ev) => this.handleInputChangeValue(ev)}
                                />

                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required="true"
                                    inputProps={{ "padding-top": '0', "padding-bottom": '0' }}
                                    id="upper_limit"
                                    label="Upper Limit"
                                    name="upper_limit"
                                    type="tel"
                                    value={this.state.upper_limit}
                                    onChange={(ev) => this.handleInputChangeValue(ev)}
                                />
                            </div>

                            <div style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <FormControl style={formControl}>
                                    <InputLabel htmlFor="unit">Unit</InputLabel>
                                    <Select
                                        value={this.state.unit}
                                        onChange={(ev) => this.handleInputChangeValue(ev)}
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
                            </div>
                            <br />
                            <div style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                                <FormControl style={formControl}>
                                    <InputLabel htmlFor="unit">Stock Type</InputLabel>
                                    <Select
                                        value={this.state.stock_type}
                                        onChange={(ev) => this.handleInputChangeValue(ev)}
                                        inputProps={{
                                            name: 'stock_type',
                                            id: 'stock_type',
                                        }}
                                    >
                                        <MenuItem value="RM">Raw Materials</MenuItem>
                                        <MenuItem value="FG">Finished Goods</MenuItem>

                                    </Select>
                                </FormControl>
                            </div>

                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleProceed}
                            >
                                Proceed
                        </Button>
                        </form>
                        <br /><br />
                        {this.state.showChild ?
                            <StockList reloadChild={this.reloadChild} /> : null
                        }

                    </div>
                </div>


            )
        }

    }

}

AddStock.propTypes = {
    classes: PropTypes.object.isRequired,
    //planCreateApis: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(AddStock)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import envirionment from '../../../common/utils/envirionment';
import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
import Select from "react-select";
import InputLabel from '@material-ui/core/InputLabel';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import base_url from '../../../common/utils/axios'
import ViewIcon from '@material-ui/icons/Visibility';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Moment from 'moment';
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
var statusArray = [];
var statusCheck = '';
var itemAvailable = 0;


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
    width: 220,
    height: 50,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 5,
    resize: 'none',
};

const textfieldStyle = {
    width: 360,
    height: 50,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 5,
    resize: 'none',
};

const textareafieldHeight = {
    width: 220,
    height: 80,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    resize: 'none',
};

const formControl = {
    minWidth: 150,
};

const formControlSpinner = {
    margin: 2,
    minWidth: 200,
};

const searchtextfieldHeight = {
    width: 350,
};


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    width: 250,
};


class RequisitionListInventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lineItems: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            lineItemsRFQView: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            lineItemsView: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            getAllRequisition: [],
            getAllRequisitionBySearch: [],
            getAllRequisitionBySearchItem: [],
            getAllVendor: [],
            requisition_id: '',
            assignIndex: '',
            requisition_user_id: '',
            delIndex: -1,
            editIndex: -1,
            viewIndex: -1,
            searchItemIndex: -1,
            open: false,
            open1: false,
            dispStatus: false,
            comment: '',
            getRFQRequisition: [],
            rfqIndex: -1,
            dispStatusRFQ: false,
            amount: 0,
            RFQhead: '',
            description: '',
            venderName: '',
            venderEmail: '',
            venderAddress: '',
            location: '',
            shipByDate: new Date(),
            needByDate: new Date(),
            minshipByDate: new Date(),
            minneedByDate: new Date(),
            total: 0,
            vendor_list: '',
            vendor_name: [],
            vendor_id: [],
            selected_vendor: [],
            value: ['coconut'],
            checked: false,
            values: [],
            options: [{ label: "", value: "" }],
            items: [],
            loading: false, // will be true when ajax request is running
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNeededbydateChange = this.handleNeededbydateChange.bind(this);
        this.state.minshipByDate.setFullYear(this.state.shipByDate.getFullYear());
        this.state.minneedByDate.setFullYear(this.state.shipByDate.getFullYear());
    }

    handleChange(event) {
        this.setState({ value: Array.from(event.target.selectedOptions, (item) => item.value) });
    }

    handleClose = () => {
        this.setState({
            open2: false,
            open1: false,
            open3: false,
            comment: '',
            lineItemsView: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            lineItemsRFQView: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            selected_vendor: [],
            values: [],
        });
    };

    handleClickView(reqId, reqcom, index) {
        this.setState({
            open2: true,
            requisition_id: reqId,
            comment: reqcom,
            viewIndex: index,
        });
        for (let i = 0; i < this.state.getAllRequisition[index].children.length; i++) {
            console.log("Value Comming --- " + JSON.stringify(this.state.getAllRequisition[index].children) + " --- " + JSON.stringify(this.state.getAllRequisition[index].children[i].item_name.name))
            this.state.lineItemsView.push({ item_name: this.state.getAllRequisition[index].children[i].item_name.name, item_description: this.state.getAllRequisition[index].children[i].item_description, purpose: this.state.getAllRequisition[index].children[i].purpose, no_of_items: this.state.getAllRequisition[index].children[i].no_of_items })
        }
        const newList = this.state.lineItemsView.splice(0, 1);
    };

    handleClick(reqId, reqUserId, index) {
        this.setState({
            open: true,
            requisition_id: reqId,
            requisition_user_id: reqUserId,
            editIndex: index,
        });
        for (let i = 0; i < this.state.getAllRequisition[index].children.length; i++) {
            this.state.lineItems.push({ item_name: this.state.getAllRequisition[index].children[i].item_name.name, item_description: this.state.getAllRequisition[index].children[i].item_description, purpose: this.state.getAllRequisition[index].children[i].purpose, no_of_items: this.state.getAllRequisition[index].children[i].no_of_items })
        }
        this.state.dispStatus = true
    };

    handleInputChangeSearchValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

        if (val === "") {
            console.log("Clear")
            this.state.getAllRequisitionBySearch = [];
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
        this.state.getAllRequisitionBySearch = [];
        this.state.getAllRequisitionBySearchItem = [];
        let c = 0;
        console.log("Search Calling --- " + this.state.searchBy)
        for (let i = 0; i < this.state.getAllRequisition.length; i++) {
            if (this.state.searchBy === this.state.getAllRequisition[i].requisition_no) {
                this.state.searchItemIndex = i;
                this.state.getAllRequisitionBySearch.push(this.state.getAllRequisition[i])
                this.forceUpdate();
                c = 1;
                break;
                console.log("Fine")
            }
        }

        if (c == 0) {
            for (let i = 0; i < this.state.getAllRequisition.length; i++) {
                let sizeChildren = this.state.getAllRequisition[i].children.length;
                this.state.getAllRequisitionBySearchItem = []
                for (let j = 0; j < sizeChildren; j++) {
                    this.state.getAllRequisitionBySearchItem.push(this.state.getAllRequisition[i].children[j])
                    //console.log("this.state.getAllRequisitionBySearchItem --- " + JSON.stringify(this.state.getAllRequisitionBySearchStatus[j].status + " --- " + this.state.searchBy))
                    
                    if (this.state.getAllRequisitionBySearchItem[j].item_name.name === this.state.searchBy) {
                        console.log("True ---")
                        this.state.searchItemIndex = i;
                        this.state.getAllRequisitionBySearch.push(this.state.getAllRequisition[i])
                        this.forceUpdate();
                        c = 1;
                        //break;
                        console.log("Fine --- ")
                    }
                }
            }
        }
    }

    fetchAllRequisition() {
        let id = localStorage.getItem('id');
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'requisition-list-inventory', {
                method: 'get',
                headers: {
                    'x-access-db': localStorage.getItem('dbname'),
                }
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        getAllRequisition: res.RequisitionList,
                        getRFQRequisition: res.RequisitionList,
                        loading: false,
                    });
                    console.log("Requisition Details --- " + JSON.stringify(res.RequisitionList))
                    console.log("Value Name Item --- " + JSON.stringify(this.state.getAllRequisition[0].children[0].item_name.name))
                })
                .catch(error => {
                    console.log("ERROR --- " + error)
                });
        });
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
                for (let i = 0; i < this.state.getAllVendor.length; i++) {
                    this.state.options.push({ label: this.state.getAllVendor[i].name, value: this.state.getAllVendor[i]._id })
                }
                const newList1 = this.state.options.splice(0, 1);
            })
            .catch(error => {
                console.log("ERROR --- " + error)
            });
    }

    fetchExpireDetailsByProduct(){
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'batch', {
                method: 'post',
                headers: {
                    'x-access-db': localStorage.getItem('dbname'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ items: this.state.items })
            }).then(res => res.json())
                .then(res => {
                    console.log("DATA --- " + JSON.stringify(res) + " --- " + JSON.stringify(res.value));

                    if (res.value == 1) {
                        this.setState({
                            //getAllRequisition: res.list,
                            loading: false,
                        });
                    }
                    else
                        showAlert("Something went wrong.");
                })
                .catch(err => {
                });
        });
    }

    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllRequisition();
        this.fetchAllVendor();
    }

    assignReq(reqId, action, index, e) {
        this.state.open3=true;
        this.state.items=[];
        let childSize;
        childSize=this.state.getAllRequisition[index].children.length;
        console.log("childSize --- "+childSize)

        for(let i=0;i<childSize;i++)
        {
            this.state.items.push(this.state.getAllRequisition[index].children[i].item_name._id)
        }

        console.log("Items --- "+JSON.stringify(this.state.items))

        this.fetchExpireDetailsByProduct();

        e.preventDefault();

        // if (action === "Assign") {
        //     const requisitionAssign = {
        //         requisitionid: reqId,
        //         approval: "completed",
        //     }
        //     console.log("Request --- " + JSON.stringify(requisitionAssign))

        //     base_url.post('requisition-assign', requisitionAssign, {
        //         headers: {
        //             'x-access-db': localStorage.getItem('dbname')
        //         }
        //     })
        //         .then(res => {
        //             console.log(res.data.value);
        //             console.log(res.data.message);
        //             if (res.data.value == 1) {
        //                 let success = "Requisition is completed successfully"
        //                 showAlert(success);
        //                 this.fetchAllRequisition();
        //                 this.forceUpdate()
        //             }
        //             else {
        //                 showAlert(res.data.message);
        //             }
        //         })
        //         .catch(e => console.log(e))
        // }
        // else {

        // }
    };

    assignRFQ(reqId, action, index, e) {
        const newList = this.state.lineItemsRFQView.splice(0, 1);
        e.preventDefault();

        if (action === "RFQ") {
            this.setState({
                open1: true,
                requisition_id: reqId,
                rfqIndex: index,
            });

            console.log("Test value --- " + JSON.stringify(this.state.getRFQRequisition[index]))
            for (let i = 0; i < this.state.getRFQRequisition[index].rfq_process_data.length; i++) {
                this.state.lineItemsRFQView.push({ item_id: this.state.getRFQRequisition[index].rfq_process_data[i].item_name._id, item_name: this.state.getRFQRequisition[index].rfq_process_data[i].item_name.name, item_description: this.state.getRFQRequisition[index].rfq_process_data[i].item_description, purpose: this.state.getRFQRequisition[index].rfq_process_data[i].purpose, no_of_items: parseInt(this.state.getRFQRequisition[index].rfq_process_data[i].no_of_items) - parseInt(this.state.getRFQRequisition[index].rfq_process_data[i].item_name.stock) })
                this.forceUpdate();
            }
            this.state.dispStatusRFQ = true

        }
        else {

        }
    };

    handleInputChangeValue(i, e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            let nam = e ? e.target.name : e;
            let val = e ? e.target.value : e;
            console.log(nam, ":", val);
            this.setState({ [nam]: val });

            const { name, value } = e.target;
            let lineItemsRFQView = [...this.state.lineItemsRFQView];
            lineItemsRFQView[i] = { ...lineItemsRFQView[i], [name]: value };
            this.setState({ lineItemsRFQView });
        }
    }

    handleInputChangeValueNewField(i, e) {
        let nam = e ? e.target.name : e;
        let val = e ? e.target.value : e;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    handleInputChangeValueNewFieldMain(e) {
        let nam = e ? e.target.name : e;
        let val = e ? e.target.value : e;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    handleInputChangeValueRate(e, id) {
        let nam = e ? e.target.name : e;
        let val = e ? e.target.value : e;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

    }

    handleNeededbydateChange(date) {
        this.setState({ shipByDate: date })
        this.setState({ needByDate: date })
    }

    createUI() {
        if (this.state.lineItemsView.length > 0) {
            return this.state.lineItemsView.map((el, i) => (
                <div key={i} >
                    <div style={{ paddingLeft: '35px' }, stylesForm}>
                        <div>
                            <div>
                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    name="item_name"
                                    label="item_name"
                                    value={el.item_name}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                type="tel"
                                name="no_of_items"
                                label="No. Of Items"
                                id="no_of_items"
                                value={el.no_of_items}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </div>

                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                label="Item Description"
                                required
                                multiline={true}
                                rows={1}
                                rowsMax={1}
                                id="item_description"
                                name="item_description"
                                value={el.item_description}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </div>
                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                label="Purpose"
                                required
                                multiline={true}
                                rows={1}
                                rowsMax={1}
                                id="purpose"
                                name="purpose"
                                value={el.purpose}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))
        }
    }

    createUIRFQ() {
        console.log("lineItemsRFQView --- " + this.state.lineItemsRFQView.length + " --- " + JSON.stringify(this.state.lineItemsRFQView))
        if (this.state.lineItemsRFQView.length > 0) {
            return this.state.lineItemsRFQView.map((el, i) => (
                <div key={i} >
                    <div style={{ paddingLeft: '35px' }, stylesForm}>

                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                name="item_name"
                                label="item_name"
                                value={el.item_name}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </div>


                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                required
                                type="tel"
                                name="no_of_items"
                                label="No. Of Items"
                                id="no_of_items"
                                value={el.no_of_items}
                                onChange={this.handleInputChangeValue.bind(this, i)}
                            />
                        </div>
                    </div>
                </div>
            ))
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        for (let i = 0; i < this.state.values.length; i++) {
            this.state.selected_vendor.push(this.state.values[i].value)
        }
        const sendRFQ = {
            rfq_head: this.state.RFQhead,
            rfq_description: this.state.description,
            need_by_date: this.state.needByDate,
            purchaseid: this.state.requisition_id,
            ship_to_location: this.state.location,
            requisition: this.state.lineItemsRFQView,
            vendor: this.state.selected_vendor,
        }
        console.log("Values Send --- " + JSON.stringify(sendRFQ))
        base_url.post('rfq', sendRFQ, {
            headers: {
                'x-access-db': localStorage.getItem('dbname')
            }
        })
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    let success = "RFQ is send successfully"
                    showAlert(success);
                    this.fetchAllRequisition();
                }
                else {
                    showAlert(res.data.message);
                }
            })
            .catch(e => console.log(e))
        this.state.selected_vendor = [];
        this.handleClose();
    }

    // handleChangeMultiple = event => {
    //     const { options } = event.target;
    //     const value = [];
    //     for (let i = 0, l = options.length; i < l; i += 1) {
    //         if (options[i].selected) {
    //             value.push(options[i].value);
    //         }
    //     }
    //     this.setState({ selected_vendor: value })
    //     this.state.selected_vendor = value
    //     console.log("selected_vendor --- " + this.state.selected_vendor)
    // };

    onChangeCheckbox = e => {
        const isChecked = !this.state.checked;
        this.setState({
            checked: isChecked,
            values: isChecked ? this.state.options : this.state.values
        });
        console.log("Values --- " + JSON.stringify(this.state.values))
    };
    onChange = opt => {
        const allOptionsSelected = opt.length === this.state.options.length;
        this.setState({
            checked: allOptionsSelected ? true : false,
            values: opt
        });
    };


    render() {

        const { loading } = this.state;

        const { open, open1, open2, open3 } = this.state;

        const likePointer = { cursor: 'pointer', color: 'blue' };

        const formControl = {
            minWidth: 250,
        };

        const tableHeadStyle = { fontWeight: 'bold', fontSize: '15px', color: 'black' }
        const tableBodyStyle = { fontSize: '12px' }

        const stylesMargin = {
            marginTop: 3
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
                    <Dialog open={open1} onClose={this.handleClose} aria-labelledby="form-dialog-title1" maxWidth="false">
                        <div style={{ width: 700 }}>
                            <DialogTitle id="scroll-dialog-title">RFQ FORM
                        <IconButton style={{ float: 'right', color: 'red' }} onClick={this.handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>

                            <DialogContent>

                                <form>
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            name="RFQhead"
                                            label="Head"
                                            id="RFQhead"
                                            fullWidth
                                            value={this.state.RFQhead}
                                            onChange={this.handleInputChangeValueNewFieldMain.bind(this)}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            name="description"
                                            label="Description"
                                            id="description"
                                            multiline={true}
                                            rows={5}
                                            rowsMax={5}
                                            fullWidth
                                            value={this.state.description}
                                            onChange={this.handleInputChangeValueNewFieldMain.bind(this)}
                                        />
                                    </div>

                                    <br /><br /><br />
                                    {this.createUIRFQ()}
                                    <br /><br />
                                    <div>
                                        <TextField style={textfieldStyle}
                                            variant="outlined"
                                            margin="dense"
                                            required
                                            name="location"
                                            label="Ship To Location"
                                            id="location"
                                            value={this.state.location}
                                            onChange={this.handleInputChangeValueNewFieldMain.bind(this)}
                                        />

                                    </div>

                                    <div>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker style={textfieldHeight}
                                                margin="dense"
                                                id="needByDate"
                                                label="Need By Date"
                                                name="needByDate"
                                                format="dd/MM/yyyy"
                                                minDate={this.state.minneedByDate}
                                                value={this.state.needByDate}
                                                onChange={this.handleNeededbydateChange}
                                                KeyboardButtonProps={{ 'aria-label': 'change date', }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                    <br />
                                    <div>
                                        <FormControl style={formControl}>
                                            <div>
                                                <input
                                                    onChange={this.onChangeCheckbox}
                                                    type="checkbox"
                                                    id="selectAll"
                                                    value="selectAll"
                                                    checked={this.state.checked}
                                                />
                                                <label for="selectAll">Select all</label>


                                                <Select
                                                    menuPlacement="top"
                                                    isMulti
                                                    onChange={this.onChange}
                                                    options={this.state.options}
                                                    value={this.state.values}
                                                    placeholder="Select Vendor"
                                                />
                                            </div>
                                        </FormControl>
                                    </div>
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="secondary">
                                    Cancel
                        </Button>
                                <Button style={{ fontWeight: 'bold' }} onClick={this.handleSubmit} color="primary">
                                    Send
                        </Button>
                            </DialogActions>
                        </div>
                    </Dialog>

                    <Dialog open={open2} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="scroll-dialog-title">View Requisition Details
                        <IconButton style={{ float: 'right', color: 'red' }} onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>

                            <form className="reg" noValidate style={{ styles1 }} >
                                {this.createUI()}

                                <br />
                                <div>
                                    <TextField style={textfieldHeight}
                                        variant="outlined"
                                        margin="dense"
                                        label="Comment"
                                        multiline={true}
                                        rows={1}
                                        rowsMax={1}
                                        name="comment"
                                        value={this.state.comment}
                                        InputProps={{
                                            disabled: true,
                                        }}
                                    />
                                </div>

                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button style={{ fontWeight: 'bold' }} onClick={this.handleClose} color="primary">
                                Ok
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={open3} onClose={this.handleClose} aria-labelledby="form-dialog-title1" maxWidth="false">
                        <div style={{ width: 700 }}>
                            <DialogTitle id="scroll-dialog-title">Batch Details With Item
                        <IconButton style={{ float: 'right', color: 'red' }} onClick={this.handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>

                            <DialogContent>
                                <form>
                                    {this.createUIRFQ()}
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button style={{ fontWeight: 'bold' }} onClick={this.handleSubmit} color="primary">
                                    Assign
                                </Button>
                            </DialogActions>
                        </div>
                    </Dialog>

                    <div align="right">
                        <TextField style={searchtextfieldHeight}
                            label="Search by Requisition no./Item Name"
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

                    {this.state.getAllRequisitionBySearch.length > 0 ?
                        <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableHeadStyle}>Requisition Id</TableCell>
                                <TableCell style={tableHeadStyle}>Requisition No.</TableCell>
                                <TableCell style={tableHeadStyle}>Item name</TableCell>
                                <TableCell style={tableHeadStyle}>Requisitor Need By </TableCell>
                                <TableCell style={tableHeadStyle}>Quantity</TableCell>
                                <TableCell style={tableHeadStyle}>In Stock</TableCell>
                                <TableCell style={tableHeadStyle}>View</TableCell>
                                <TableCell style={tableHeadStyle}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {this.state.getAllRequisitionBySearch.length > 0 && this.state.getAllRequisitionBySearch.map((requisition, i) =>

                                <TableRow>
                                    <TableCell style={tableBodyStyle}>{requisition.requisitionId}</TableCell>
                                    <TableCell style={tableBodyStyle}>{requisition.requisition_no}</TableCell>
                                    <TableCell style={tableBodyStyle}>
                                        {this.state.getAllRequisitionBySearch[i].children && this.state.getAllRequisitionBySearch[i].children.map((itemname, i) =>
                                            <p> {itemname.item_name.name} </p>
                                        )}
                                    </TableCell>
                                    <TableCell style={tableBodyStyle}>{Moment(requisition.needed_by_date).format("DD/MM/YYYY")}</TableCell>
                                    <TableCell style={tableBodyStyle}>
                                        {this.state.getAllRequisitionBySearch[i].children && this.state.getAllRequisitionBySearch[i].children.map((itemnumber, i) =>
                                            <p> {itemnumber.no_of_items} </p>
                                        )}
                                    </TableCell>
                                    <TableCell style={tableBodyStyle}>
                                        {this.state.getAllRequisitionBySearch[i].children && this.state.getAllRequisitionBySearch[i].children.map((itemname, i) =>
                                            <p> {itemname.item_name.stock} </p>
                                        )}
                                    </TableCell>
                                    <TableCell><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickView(requisition._id, requisition.comment, this.state.searchItemIndex)} /></TableCell>
                                    {requisition.action != "wait" ?
                                        requisition.action === "Assign" ?
                                            <TableCell style={likePointer} onClick={e => this.assignReq(requisition.requisition_id, requisition.action, this.state.searchItemIndex, e)}>{requisition.action}</TableCell>
                                            :
                                            <TableCell style={likePointer} onClick={e => this.assignRFQ(requisition._id, requisition.action, this.state.searchItemIndex, e)}>{requisition.action}</TableCell>

                                        :
                                        <TableCell></TableCell>
                                    }
                                </TableRow>
                            )}
                        </TableBody></Table>
                        :
                        [(this.state.getAllRequisition.length > 0 ?            
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={tableHeadStyle}>Requisition Id</TableCell>
                                <TableCell style={tableHeadStyle}>Requisition No.</TableCell>
                                <TableCell style={tableHeadStyle}>Item name</TableCell>
                                <TableCell style={tableHeadStyle}>Requisitor Need By </TableCell>
                                <TableCell style={tableHeadStyle}>Quantity</TableCell>
                                <TableCell style={tableHeadStyle}>In Stock</TableCell>
                                <TableCell style={tableHeadStyle}>View</TableCell>
                                <TableCell style={tableHeadStyle}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {this.state.getAllRequisition.length > 0 && this.state.getAllRequisition.map((requisition, i) =>

                                <TableRow>
                                    <TableCell style={tableBodyStyle}>{requisition.requisitionId}</TableCell>
                                    <TableCell style={tableBodyStyle}>{requisition.requisition_no}</TableCell>
                                    <TableCell style={tableBodyStyle}>
                                        {this.state.getAllRequisition[i].children && this.state.getAllRequisition[i].children.map((itemname, i) =>
                                            <p> {itemname.item_name.name} </p>
                                        )}
                                    </TableCell>
                                    <TableCell style={tableBodyStyle}>{Moment(requisition.needed_by_date).format("DD/MM/YYYY")}</TableCell>
                                    <TableCell style={tableBodyStyle}>
                                        {this.state.getAllRequisition[i].children && this.state.getAllRequisition[i].children.map((itemnumber, i) =>
                                            <p> {itemnumber.no_of_items} </p>
                                        )}
                                    </TableCell>
                                    <TableCell style={tableBodyStyle}>
                                        {this.state.getAllRequisition[i].children && this.state.getAllRequisition[i].children.map((itemname, i) =>
                                            <p> {itemname.item_name.stock} </p>
                                        )}
                                    </TableCell>
                                    <TableCell><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickView(requisition._id, requisition.comment, i)} /></TableCell>
                                    {requisition.action != "wait" ?
                                        requisition.action === "Assign" ?
                                            <TableCell style={likePointer} onClick={e => this.assignReq(requisition.requisition_id, requisition.action, i, e)}>{requisition.action}</TableCell>
                                            :
                                            <TableCell style={likePointer} onClick={e => this.assignRFQ(requisition._id, requisition.action, i, e)}>{requisition.action}</TableCell>

                                        :
                                        <TableCell></TableCell>
                                    }
                                </TableRow>
                            )}
                        </TableBody></Table>
                        :
                        <h3>No requisition list to be displayed</h3>
                        )]
                    }
                </div>
            )
        }
    }
}

RequisitionListInventory.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(RequisitionListInventory)

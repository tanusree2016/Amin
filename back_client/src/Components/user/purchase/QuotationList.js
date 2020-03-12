import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import envirionment from '../../../common/utils/envirionment';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import Moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import base_url from '../../../common/utils/axios';
import DialogActions from '@material-ui/core/DialogActions';
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

const stylesForm = {
    display: 'flex',
    flexWrap: 'wrap',
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

const textareafieldHeight = {
    width: 220,
    height: 80,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    resize: 'none',
};

const rejectfieldHeight = {
    width: 420,
    height: 80,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    resize: 'none',
};

const formControl = {
    minWidth: 150,
};

const searchtextfieldHeight = {
    width: 350,
};

const btn_left = {
    marginLeft: "100px",
    marginRight: "50px",
    textTransform: "none"
};

class QuotationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lineItemsRFQView: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "", unit_price: "", amount: "" }],
            getAllQoutationApprovalList: [],
            getAllQoutationApprovalListBySearch: [],
            getAllQoutationApprovalListSearchItem: [],
            requisition_id: '',
            vendor_id: '',
            purchase_id: '',
            assignIndex: '',
            requisition_user_id: '',
            delIndex: -1,
            editIndex: -1,
            viewIndex: -1,
            searchItemIndex: -1,
            open: false,
            open1: false,
            open2: false,
            dispStatus: false,
            comment: '',
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
            discount: 0,
            cgst_tax: 0,
            sgst_tax: 0,
            igst_tax: 0,
            status: '',
            loading: false, // will be true when ajax request is running
            val_amount: [],
            reject_note_purchase: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.proceedReject = this.proceedReject.bind(this);
    }

    proceedReject(e) {
        console.log("Clicked");
        this.setState({
            open2: false,
            open1: true,
        })
        this.state.open2 = false;
        this.state.open1 = true;
    }

    handleReject(e) {
        e.preventDefault();
        console.log("Reject Calling --- ")
        const rejectProposal = {
            vendor_id: this.state.vendor_id,
            rfq_id: this.state.requisition_id,
            reject_note_purchase: this.state.reject_note_purchase,
        }
        console.log("Values Send --- " + JSON.stringify(rejectProposal))
        base_url.post('abc', rejectProposal, {
            headers: {
                'x-access-db': localStorage.getItem('dbname')
            }
        })
            .then(res => {
                //this.resetField();
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    showAlert(res.data.message);
                    this.handleClose();
                    this.fetchAllQoutationApprovalList();
                }
                else {
                    showAlert(res.data.message);
                    this.handleClose();
                }
            })
            .catch(e => console.log(e))

    }

    handleSubmit(e) {
        e.preventDefault();

        const sendPO = {
            total_price: this.state.total,
            rfq_id: this.state.requisition_id,
            vendor_id: this.state.vendor_id,
            purchaseid: this.state.purchase_id,
            name: localStorage.getItem('name'),
            children: this.state.lineItemsRFQView,
        }
        console.log("Values Send --- +++ " + JSON.stringify(sendPO))
        base_url.post('po-send', sendPO, {
            headers: {
                'x-access-db': localStorage.getItem('dbname')
            }
        })
            .then(res => {
                //this.resetField();
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    showAlert(res.data.message);
                    this.handleClose();
                    this.fetchAllQoutationApprovalList();
                }
                else {
                    showAlert(res.data.message);
                    this.handleClose();
                }
            })
            .catch(e => console.log(e))
    }

    handleClose = () => {
        this.setState({
            open1: false,
            open2: false,
            comment: '',
            //getAllQoutationApprovalList: [],
            lineItemsView: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            lineItemsRFQView: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "", unit_price: "", unit_price: "", amount: "" }],
        });
    };

    handleClickView(rfqId, venId, pid, index) {
        console.log("INDEX --- " + index)
        this.setState({
            open2: true,
            requisition_id: rfqId,
            vendor_id: venId,
            purchase_id: pid,
            viewIndex: index,
        });
        this.state.requisition_id = venId
        console.log("this.state.requisition_id --- " + this.state.requisition_id)
        this.fetchProposalDetailsById();
    };

    fetchProposalDetailsById() {
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'vendor-rfq-detail', {
                method: 'post',
                headers: {
                    'x-access-db': localStorage.getItem('dbname'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ rfq_id: this.state.requisition_id })
            }).then(res => res.json())
                .then(res => {
                    console.log("DATA --- " + JSON.stringify(res) + " --- " + JSON.stringify(res.value));

                    if (res.value == 1) {
                        this.setState({
                            getAllRequisition: res.list,
                            loading: false,
                        });
                        // this.state.req_id = res.requisition_value.requisition_id._id;
                        // this.state.pur_id = res.requisition_value._id;
                        // this.state.ven_id = res.vendor_details._id;
                        this.state.RFQhead = res.list.purchase_id.rfq_head;
                        console.log("this.state.RFQhead --- " + this.state.RFQhead)
                        this.state.description = res.list.purchase_id.rfq_description;
                        this.state.venderName = res.list.vendor_id.name;
                        this.state.venderEmail = res.list.vendor_id.email;
                        this.state.venderAddress = res.list.vendor_id.address;
                        this.state.location = res.list.purchase_id.ship_to_location;
                        this.state.discount = res.list.Discount;
                        this.state.cgst_tax = res.list.cgst_tax;
                        this.state.sgst_tax = res.list.sgst_tax;
                        this.state.igst_tax = res.list.igst_tax;
                        this.state.total = res.list.total_price;
                        this.state.status = res.list.status;

                        Moment.locale('en');

                        this.state.needByDate = Moment(res.list.purchase_id.need_by_date).format("DD/MM/YYYY")
                        console.log('needby' + res.list.purchase_id.need_by_date);
                        this.state.shipByDate = Moment(res.list.price_valid).format("DD/MM/YYYY")

                        for (let i = 0; i < this.state.getAllRequisition.children.length; i++) {
                            console.log("Value Comming --- " + JSON.stringify(this.state.getAllRequisition.children) + " --- " + JSON.stringify(this.state.getAllRequisition.children[i].item_name.name))
                            this.state.lineItemsRFQView.push({ item_id: this.state.getAllRequisition.children[i].item_name._id, item_name: this.state.getAllRequisition.children[i].item_name.name, item_description: this.state.getAllRequisition.children[i].item_description, purpose: this.state.getAllRequisition.children[i].purpose, no_of_items: this.state.getAllRequisition.children[i].no_of_items, unit_price: this.state.getAllRequisition.children[i].unit_price, amount: this.state.getAllRequisition.children[i].vendor_price })
                        }
                        const newList = this.state.lineItemsRFQView.splice(0, 1);
                        this.forceUpdate();
                    }
                    else
                        showAlert("Something went wrong.");
                })
                .catch(err => {
                });
        });
    }

    handleInputChangeSearchValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

        if (val === "") {
            console.log("Clear")
            this.state.getAllQoutationApprovalListBySearch = [];
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
        this.state.getAllQoutationApprovalListBySearch = [];
        this.state.getAllQoutationApprovalListBySearchItem = [];
        let c = 0;
        console.log("Search Calling --- " + this.state.searchBy)
        for (let i = 0; i < this.state.getAllQoutationApprovalList.length; i++) {
            if (this.state.searchBy === this.state.getAllQoutationApprovalList[i].purchase_id.rfq_id) {
                this.state.searchItemIndex = i;
                this.state.getAllQoutationApprovalListBySearch.push(this.state.getAllQoutationApprovalList[i])
                this.forceUpdate();
                c = 1;
                //break;
                console.log("Fine")
            }
        }

        if (c == 0) {
            for (let i = 0; i < this.state.getAllQoutationApprovalList.length; i++) {
                let sizeChildren = this.state.getAllQoutationApprovalList[i].children.length;
                this.state.getAllQoutationApprovalListBySearchItem = []
                for (let j = 0; j < sizeChildren; j++) {
                    this.state.getAllQoutationApprovalListBySearchItem.push(this.state.getAllQoutationApprovalList[i].children[j])
                    //console.log("this.state.getAllRequisitionBySearchItem --- " + JSON.stringify(this.state.getAllRequisitionBySearchStatus[j].status + " --- " + this.state.searchBy))

                    if (this.state.getAllQoutationApprovalListBySearchItem[j].item_name.name === this.state.searchBy) {
                        console.log("True ---")
                        this.state.searchItemIndex = i;
                        this.state.getAllQoutationApprovalListBySearch.push(this.state.getAllQoutationApprovalList[i])
                        this.forceUpdate();
                        c = 1;
                        //break;
                        console.log("Fine --- ")
                    }
                }
            }
        }

        if (c == 0) {
            for (let i = 0; i < this.state.getAllQoutationApprovalList.length; i++) {
                if (this.state.searchBy === this.state.getAllQoutationApprovalList[i].vendor_id.name) {
                    this.state.searchItemIndex = i;
                    this.state.getAllQoutationApprovalListBySearch.push(this.state.getAllQoutationApprovalList[i])
                    this.forceUpdate();
                    c = 1;
                    //break;
                    console.log("Fine")
                }
            }
        }
    }

    fetchAllQoutationApprovalList() {
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'qoutation-approval-list', {
                method: 'get',
                headers: {
                    'x-access-db': localStorage.getItem('dbname'),
                }
            }).then(res => res.json())
                .then(res => {
                    console.log("Test res --- " + JSON.stringify(res))
                    this.setState({
                        getAllQoutationApprovalList: res.list,
                        loading: false,
                    });
                    console.log("getAllQoutationApprovalList --- " + JSON.stringify(this.state.getAllQoutationApprovalList))
                })
                .catch(error => {
                    console.log("ERROR --- " + error)
                });
        });
    }

    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllQoutationApprovalList();
    }

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

            this.state.amount = parseFloat(lineItemsRFQView[i].unit_price) * parseFloat(val)
            console.log("Test Val --- " + this.state.amount)
            lineItemsRFQView[i] = { ...lineItemsRFQView[i], ["amount"]: this.state.amount };

            this.setState({ lineItemsRFQView });


            let val_amount = [...this.state.val_amount];
            val_amount[i] = { ...val_amount[i], ["amount"]: this.state.amount };
            this.setState({ val_amount });

            let val_amt = 0;

            for (let i = 0; i < val_amount.length; i++) {
                console.log("Price --- " + JSON.stringify(val_amount[i]))
                val_amt += parseFloat(val_amount[i].amount)
                console.log("Price Amount --- " + val_amt)
            }

            this.state.total = parseFloat(val_amt)
            if (!isNaN(parseFloat(this.state.discount))) {
                this.state.total = parseFloat(this.state.total) - (parseFloat(this.state.discount) / 100)
            }
            if (!isNaN(parseFloat(this.state.cgst_tax))) {
                this.state.total = parseFloat(this.state.total) - (parseFloat(this.state.cgst_tax) / 100)
            }
            if (!isNaN(parseFloat(this.state.sgst_tax))) {
                this.state.total = parseFloat(this.state.total) - (parseFloat(this.state.sgst_tax) / 100)
            }
            if (!isNaN(parseFloat(this.state.igst_tax))) {
                this.state.total = parseFloat(this.state.total) - (parseFloat(this.state.igst_tax) / 100)
            }
        }

        console.log("Change Calling --- ")
    }

    handleInputChangeValueReject(e) {
        let nam = e ? e.target.name : e;
        let val = e ? e.target.value : e;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
        console.log("Change Calling --- ")
    }

    createUIRFQ() {
        if (this.state.lineItemsRFQView.length > 0) {
            return this.state.lineItemsRFQView.map((el, i) => (
                <div key={i} >
                    <div style={{ paddingLeft: '35px' }, stylesForm}>

                        <div style={{ border: '2px solid blue', display: 'flex', flexWrap: 'wrap', padding: "20px" }}>
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

                            <div>
                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    type="tel"
                                    name="unit_price"
                                    label={"Price Per Unit (\u20B9)"}
                                    id="unit_price"
                                    value={el.unit_price}
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
                                    name="amount"
                                    label={"Amount (\u20B9)"}
                                    id="amount"
                                    value={el.amount}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    createUI() {
        return <div>
            <form autocomplete="off">
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
                        InputProps={{
                            disabled: true,
                        }}
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
                        InputProps={{
                            disabled: true,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        name="venderName"
                        label="Vender Name"
                        id="venderName"
                        fullWidth
                        value={this.state.venderName}
                        InputProps={{
                            disabled: true,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        name="venderEmail"
                        label="Vender Email"
                        id="venderEmail"
                        fullWidth
                        value={this.state.venderEmail}
                        InputProps={{
                            disabled: true,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        name="venderAddress"
                        label="Vender Address"
                        id="venderAddress"
                        multiline={true}
                        rows={1}
                        rowsMax={1}
                        fullWidth
                        value={this.state.venderAddress}
                        InputProps={{
                            disabled: true,
                        }}
                    />
                </div>
                <br /><br /><br />
                {this.createUIRFQ()}
                <br /><br />
                <div>
                    <TextField style={textareafieldHeight}
                        variant="outlined"
                        margin="dense"
                        required
                        name="location"
                        label="Ship To Location"
                        id="location"
                        value={this.state.location}
                        InputProps={{
                            disabled: true,
                        }}
                    />

                    <TextField style={textareafieldHeight}
                        variant="outlined"
                        margin="dense"
                        required
                        type="tel"
                        name="cgst_tax"
                        label="CGST (%)"
                        id="cgst_tax"
                        value={this.state.cgst_tax}
                        InputProps={{
                            disabled: true,
                        }}
                    />

                    <TextField style={textareafieldHeight}
                        variant="outlined"
                        margin="dense"
                        required
                        type="tel"
                        name="sgst_tax"
                        label="SGST (%)"
                        id="sgst_tax"
                        value={this.state.sgst_tax}
                        InputProps={{
                            disabled: true,
                        }}
                    />

                    <TextField style={textareafieldHeight}
                        variant="outlined"
                        margin="dense"
                        required
                        type="tel"
                        name="igst_tax"
                        label="IGST (%)"
                        id="igst_tax"
                        value={this.state.igst_tax}
                        InputProps={{
                            disabled: true,
                        }}
                    />

                    <TextField style={textareafieldHeight}
                        variant="outlined"
                        margin="dense"
                        required
                        type="tel"
                        name="discount"
                        label="Discount (%)"
                        id="discount"
                        value={this.state.discount}
                        InputProps={{
                            disabled: true,
                        }}
                    />

                    <TextField style={textareafieldHeight}
                        variant="outlined"
                        margin="dense"
                        required
                        type="tel"
                        name="total"
                        label={"Total Amount (\u20B9)"}
                        id="total"
                        value={this.state.total}
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
                        name="needByDate"
                        label="Need By Date"
                        id="needByDate"
                        value={this.state.needByDate}
                        InputProps={{
                            disabled: true,
                        }}
                    />

                    <TextField style={textfieldHeight}
                        variant="outlined"
                        margin="dense"
                        required
                        name="shipByDate"
                        label="Ship By Date"
                        id="shipByDate"
                        value={this.state.shipByDate}
                        InputProps={{
                            disabled: true,
                        }}
                    />
                </div>
                <br /><br /><br />
                <div id='btn'>
                    <Button style={{ marginLeft: '50px', marginRight: '50px', textTransform: "none" }}
                        id="btnSub"
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit} >
                        Approve Create & Send PO
                    </Button>

                    <Button style={{ textTransform: "none" }}
                        id="btnRej"
                        variant="contained"
                        color="secondary"
                        onClick={this.proceedReject} >
                        Reject Quotation
                    </Button>
                </div>
            </form>
        </div>
    }

    render() {
        const { open1, open2 } = this.state;

        const likePointer = { cursor: 'pointer', color: 'blue' };

        const formControl = {
            minWidth: 150,
        };

        const tableHeadStyle = { fontWeight: 'bold', fontSize: '15px', color: 'black' }
        const tableHeadStyleQuantity = { fontWeight: 'bold', fontSize: '15px', color: 'black', textAlign: 'center' }
        const tableBodyStyle = { fontSize: '12px' }

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
                    <Dialog open={open2} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth="false">
                        <div style={{ width: 800 }}>
                            <DialogTitle id="scroll-dialog-title">View Quotation Details
                        <IconButton style={{ float: 'right', color: 'red' }} onClick={this.handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <form autocomplete="off" className="reg" noValidate style={{ styles1 }} >
                                    {this.createUI()}
                                </form>
                            </DialogContent>
                        </div>
                    </Dialog>

                    <Dialog open={open1} onClose={this.handleClose} aria-labelledby="form-dialog-title-text">
                        <DialogTitle id="form-dialog-title-text">Note </DialogTitle>
                        <DialogContent>
                            <div>
                                <TextField style={rejectfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    label="Reject Note"
                                    multiline={true}
                                    rows={3}
                                    rowsMax={3}
                                    name="reject_note_purchase"
                                    value={this.state.reject_note_purchase}
                                    onChange={this.handleInputChangeValueReject.bind(this)}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button style={{ fontWeight: 'bold' }} onClick={e => this.handleReject(e)} color="primary">
                                Ok
                            </Button>

                        </DialogActions>
                    </Dialog>

                    <div align="right">
                        <TextField style={searchtextfieldHeight}
                            label="Search by RFQ/Item/Vendor"
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

                    {this.state.getAllQoutationApprovalListBySearch.length > 0 ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableHeadStyle}>RFQ No.</TableCell>
                                    <TableCell style={tableHeadStyle}>Item name</TableCell>
                                    <TableCell style={tableHeadStyleQuantity}>Quantity</TableCell>
                                    {/* <TableCell>Status</TableCell> */}
                                    <TableCell style={tableHeadStyle}>Vendor Response</TableCell>
                                    {/* <TableCell>View</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.getAllQoutationApprovalListBySearch.length > 0 && this.state.getAllQoutationApprovalListBySearch.map((quotation, i) =>
                                    <TableRow>
                                        <TableCell style={tableBodyStyle}>{quotation.purchase_id.rfq_id}</TableCell>
                                        <TableCell style={tableBodyStyle}>
                                            {this.state.getAllQoutationApprovalListBySearch[i].children && this.state.getAllQoutationApprovalListBySearch[i].children.map((itemname, i) =>
                                                <p> {itemname.item_name.name} </p>
                                            )}
                                        </TableCell>
                                        <TableCell style={tableBodyStyle, { textAlign: "center" }}>
                                            {this.state.getAllQoutationApprovalListBySearch[i].children && this.state.getAllQoutationApprovalListBySearch[i].children.map((itemnumber, i) =>
                                                <p> {itemnumber.no_of_items} </p>
                                            )}
                                        </TableCell>
                                        {/* <TableCell>{requisition.status}</TableCell> */}
                                        <TableCell style={tableBodyStyle, likePointer}>
                                            <p onClick={(e) => this.handleClickView(quotation._id, quotation.vendor_id._id, quotation.purchase_id._id, this.state.searchItemIndex)}>{quotation.vendor_id.name} </p>
                                        </TableCell>
                                        {/* <TableCell><ViewIcon style={likePointer} onClick={(e) => this.handleClickView(requisition._id,requisition.comment, i)} /></TableCell> */}
                                    </TableRow>
                                )}
                            </TableBody></Table>
                        :
                        [(this.state.getAllQoutationApprovalList.length > 0 ?

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={tableHeadStyle}>RFQ No.</TableCell>
                                        <TableCell style={tableHeadStyle}>Item name</TableCell>
                                        <TableCell style={tableHeadStyleQuantity}>Quantity</TableCell>
                                        {/* <TableCell>Status</TableCell> */}
                                        <TableCell style={tableHeadStyle}>Vendor Response</TableCell>
                                        {/* <TableCell>View</TableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.getAllQoutationApprovalList.length > 0 && this.state.getAllQoutationApprovalList.map((quotation, i) =>
                                        <TableRow>
                                            <TableCell style={tableBodyStyle}>{quotation.purchase_id.rfq_id}</TableCell>
                                            <TableCell style={tableBodyStyle}>
                                                {this.state.getAllQoutationApprovalList[i].children && this.state.getAllQoutationApprovalList[i].children.map((itemname, i) =>
                                                    <p> {itemname.item_name.name} </p>
                                                )}
                                            </TableCell>
                                            <TableCell style={tableBodyStyle, { textAlign: "center" }}>
                                                {this.state.getAllQoutationApprovalList[i].children && this.state.getAllQoutationApprovalList[i].children.map((itemnumber, i) =>
                                                    <p> {itemnumber.no_of_items} </p>
                                                )}
                                            </TableCell>
                                            {/* <TableCell>{requisition.status}</TableCell> */}
                                            <TableCell style={tableBodyStyle, likePointer}>
                                                <p onClick={(e) => this.handleClickView(quotation._id, quotation.vendor_id._id, quotation.purchase_id._id, i)}>{quotation.vendor_id.name} </p>
                                            </TableCell>
                                            {/* <TableCell><ViewIcon style={likePointer} onClick={(e) => this.handleClickView(requisition._id,requisition.comment, i)} /></TableCell> */}
                                        </TableRow>
                                    )}
                                </TableBody></Table>
                            :
                            <h3>No pending quotation list to be displayed</h3>
                        )]
                    }
                </div>
            )
        }
    }
}

QuotationList.propTypes = {
    auth: PropTypes.object.isRequired,
    //editDesignation: PropTypes.func.isRequired,
    //requisitionDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(QuotationList)

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
import { editDesignation, requisitionDelete } from '../../admin/authentication';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import Moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
import base_url from '../../../common/utils/axios'
import { blue } from '@material-ui/core/colors';
import ViewIcon from '@material-ui/icons/Visibility';
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

const searchtextfieldHeight = {
    width: 350,
};

const btn_left = {
    marginLeft: "200px",
    marginRight: "50px",
    textTransform: "none"
};

class POList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lineItemsRFQView: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "", unit_price: "", amount: "" }],
            getAllPOSendList: [],
            getAllPOSendListBySearch: [],
            getAllPOSendListSearchItem: [],
            requisition_id: '',
            vendor_id: '',
            assignIndex: '',
            requisition_user_id: '',
            delIndex: -1,
            editIndex: -1,
            viewIndex: -1,
            searchItemIndex: -1,
            open: false,
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
        };
    }

    handleClose = () => {
        this.setState({
            open2: false,
            comment: '',
            lineItemsView: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            lineItemsRFQView: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "", unit_price: "", unit_price: "", amount: "" }],
        });
    };

    handleClickView(rfqId, venId, index) {
        console.log("INDEX --- " + index)
        this.setState({
            open2: true,
            requisition_id: rfqId,
            vendor_id: venId,
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

                        this.state.needByDate = Moment(res.list.requisition_id.needed_by_date).format("DD/MM/YYYY")

                        this.state.shipByDate = Moment(res.list.price_valid).format("DD/MM/YYYY")

                        for (let i = 0; i < this.state.getAllRequisition.children.length; i++) {
                            console.log("Value Comming --- " + JSON.stringify(this.state.getAllRequisition.children) + " --- " + JSON.stringify(this.state.getAllRequisition.children[i].item_name.name))
                            this.state.lineItemsRFQView.push({ item_id: this.state.getAllRequisition.children[i]._id, item_name: this.state.getAllRequisition.children[i].item_name.name, item_description: this.state.getAllRequisition.children[i].item_description, purpose: this.state.getAllRequisition.children[i].purpose, no_of_items: this.state.getAllRequisition.children[i].no_of_items, unit_price: this.state.getAllRequisition.children[i].unit_price, amount: this.state.getAllRequisition.children[i].vendor_price })
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
            this.state.getAllPOSendListBySearch = [];
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
        this.state.getAllPOSendListBySearch = [];
        this.state.getAllPOSendListBySearchItem = [];
        let c = 0;
        console.log("Search Calling --- " + this.state.searchBy)
        for (let i = 0; i < this.state.getAllPOSendList.length; i++) {
            if (this.state.searchBy === this.state.getAllPOSendList[i].purchase_id.rfq_id) {
                this.state.searchItemIndex = i;
                this.state.getAllPOSendListBySearch.push(this.state.getAllPOSendList[i])
                this.forceUpdate();
                c = 1;
                //break;
                console.log("Fine")
            }
        }

        if (c == 0) {
            for (let i = 0; i < this.state.getAllPOSendList.length; i++) {
                let sizeChildren = this.state.getAllPOSendList[i].children.length;
                this.state.getAllPOSendListBySearchItem = []
                for (let j = 0; j < sizeChildren; j++) {
                    this.state.getAllPOSendListBySearchItem.push(this.state.getAllPOSendList[i].children[j])
                    //console.log("this.state.getAllRequisitionBySearchItem --- " + JSON.stringify(this.state.getAllRequisitionBySearchStatus[j].status + " --- " + this.state.searchBy))

                    if (this.state.getAllPOSendListBySearchItem[j].item_name.name === this.state.searchBy) {
                        console.log("True ---")
                        this.state.searchItemIndex = i;
                        this.state.getAllPOSendListBySearch.push(this.state.getAllPOSendList[i])
                        this.forceUpdate();
                        c = 1;
                        //break;
                        console.log("Fine --- ")
                    }
                }
            }
        }

        if (c == 0) {
            for (let i = 0; i < this.state.getAllPOSendList.length; i++) {
                if (this.state.searchBy === this.state.getAllPOSendList[i].vendor_id.name) {
                    this.state.searchItemIndex = i;
                    this.state.getAllPOSendListBySearch.push(this.state.getAllPOSendList[i])
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
            fetch(envirionment.BASE_URL + 'po-send-list', {
                method: 'get',
                headers: {
                    'x-access-db': localStorage.getItem('dbname'),
                }
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        getAllPOSendList: res.list,
                        loading: false,
                    });
                    console.log("getAllPOSendList --- " + JSON.stringify(this.state.getAllPOSendList))

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
                                    required
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
                <br /><br />
                <div>

                    <Button style={btn_left}
                        id="btnClose"
                        variant="contained"
                        color="primary"
                        onClick={this.handleClose} >
                        Close
                    </Button>

                </div>
            </form>
        </div>
    }

    render() {

        const { open2 } = this.state;

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
                                <form className="reg" noValidate style={{ styles1 }} >
                                    {this.createUI()}
                                </form>
                            </DialogContent>
                        </div>
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

                    {this.state.getAllPOSendListBySearch.length > 0 ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableHeadStyle}>RFQ No.</TableCell>
                                    <TableCell style={tableHeadStyle}>Item name</TableCell>
                                    <TableCell style={tableHeadStyleQuantity}>Quantity</TableCell>
                                    <TableCell style={tableHeadStyle}>Vendor Response</TableCell>
                                    <TableCell style={tableHeadStyle}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {this.state.getAllPOSendListBySearch.length > 0 && this.state.getAllPOSendListBySearch.map((po, i) =>
                                    <TableRow>
                                        <TableCell style={tableBodyStyle}>{po.purchase_id.rfq_id}</TableCell>
                                        <TableCell style={tableBodyStyle}>
                                            {this.state.getAllPOSendListBySearch[i].children && this.state.getAllPOSendListBySearch[i].children.map((itemname, i) =>
                                                <p> {itemname.item_name.name} </p>
                                            )}
                                        </TableCell>
                                        <TableCell style={tableBodyStyle, { textAlign: "center" }}>
                                            {this.state.getAllPOSendListBySearch[i].children && this.state.getAllPOSendListBySearch[i].children.map((itemnumber, i) =>
                                                <p> {itemnumber.no_of_items} </p>
                                            )}
                                        </TableCell>
                                        <TableCell style={tableBodyStyle, likePointer}>
                                            <p onClick={(e) => this.handleClickView(po._id, po.vendor_id._id, this.state.searchItemIndex)}>{po.vendor_id.name} </p>
                                        </TableCell>
                                        {po.status === "qoutation_approved" ?
                                            <TableCell style={tableBodyStyle}>Approved</TableCell>
                                            :
                                            <TableCell style={tableBodyStyle}>Rejected</TableCell>
                                        }
                                    </TableRow>
                                )}
                            </TableBody></Table>
                        :
                        [(this.state.getAllPOSendList.length > 0 ?

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={tableHeadStyle}>RFQ No.</TableCell>
                                        <TableCell style={tableHeadStyle}>Item name</TableCell>
                                        <TableCell style={tableHeadStyleQuantity}>Quantity</TableCell>
                                        <TableCell style={tableHeadStyle}>Vendor Response</TableCell>
                                        <TableCell style={tableHeadStyle}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {this.state.getAllPOSendList.length > 0 && this.state.getAllPOSendList.map((po, i) =>
                                        <TableRow>
                                            <TableCell style={tableBodyStyle}>{po.purchase_id.rfq_id}</TableCell>
                                            <TableCell style={tableBodyStyle}>
                                                {this.state.getAllPOSendList[i].children && this.state.getAllPOSendList[i].children.map((itemname, i) =>
                                                    <p> {itemname.item_name.name} </p>
                                                )}
                                            </TableCell>
                                            <TableCell style={tableBodyStyle, { textAlign: "center" }}>
                                                {this.state.getAllPOSendList[i].children && this.state.getAllPOSendList[i].children.map((itemnumber, i) =>
                                                    <p> {itemnumber.no_of_items} </p>
                                                )}
                                            </TableCell>
                                            <TableCell style={tableBodyStyle, likePointer}>
                                                <p onClick={(e) => this.handleClickView(po._id, po.vendor_id._id, i)}>{po.vendor_id.name} </p>
                                            </TableCell>
                                            {po.status === "qoutation_approved" ?
                                                <TableCell style={tableBodyStyle}>Approved</TableCell>
                                                :
                                                <TableCell style={tableBodyStyle}>Rejected</TableCell>
                                            }
                                        </TableRow>
                                    )}
                                </TableBody></Table>
                            :
                            <h3>No pending PO list to be displayed</h3>
                        )]
                    }
                </div>
            )
        }
    }

}

POList.propTypes = {
    auth: PropTypes.object.isRequired,
    //editDesignation: PropTypes.func.isRequired,
    //requisitionDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(POList)

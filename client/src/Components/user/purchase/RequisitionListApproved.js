import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import envirionment from '../../../common/utils/envirionment';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import base_url from '../../../common/utils/axios'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
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
var status = '';

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

class RequisitionListApproved extends Component {

    constructor() {
        super();
        this.state = {
            lineItems: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            getAllRequisition: [],
            getAllRequisitionBySearch: [],
            getAllRequisitionBySearchItem: [],
            requisition_id: '',
            requisition_user_id: '',
            delIndex: -1,
            editIndex: -1,
            searchItemIndex: -1,
            open: false,
            dispStatus: false,
            comment: '',
            pref_req: '',
            fn_req: '',
            ln_req: '',
            date_req: '',
            pref_appr: '',
            fn_appr: '',
            ln_appr: '',
            date_appr: '',
            loading: false, // will be true when ajax request is running
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleClose = () => {
        this.setState({
            open: false,
            comment: '',
            lineItems: [{ item_id: "", item_name: "", item_description: "", purpose: "", no_of_items: "" }],
        });
    };

    handleClick(reqId, reqUserId, reqcom, req_pref, req_fn, req_ln, req_date, appr_pref, appr_fn, appr_ln, appr_date, index) {

        Moment.locale('en');
        req_date = Moment(req_date).format("DD/MM/YYYY");
        appr_date = Moment(appr_date).format("DD/MM/YYYY");

        this.setState({
            open: true,
            requisition_id: reqId,
            requisition_user_id: reqUserId,
            comment: reqcom,
            editIndex: index,
            pref_req: req_pref,
            fn_req: req_fn,
            ln_req: req_ln,
            date_req: req_date,
            pref_appr: appr_pref,
            fn_appr: appr_fn,
            ln_appr: appr_ln,
            date_appr: appr_date,
        });
        for (let i = 0; i < this.state.getAllRequisition[index].children.length; i++) {
            this.state.lineItems.push({ item_id: this.state.getAllRequisition[index].children[i].item_name._id, item_name: this.state.getAllRequisition[index].children[i].item_name.name, item_description: this.state.getAllRequisition[index].children[i].item_description, purpose: this.state.getAllRequisition[index].children[i].purpose, no_of_items: this.state.getAllRequisition[index].children[i].no_of_items })
        }
        this.state.dispStatus = true
    };

    handleInputChangeValue(i, e) {
        let nam = e ? e.target.name : e;
        let val = e ? e.target.value : e;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

        const { name, value } = e.target;
        let lineItems = [...this.state.lineItems];
        lineItems[i] = { ...lineItems[i], [name]: value };
        this.setState({ lineItems });
        console.log("Value to send --- " + this.state.lineItems)
    }

    handleInputChangeNumber(i, e) {

        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            const { name, value } = e.target;
            console.log("Testing ---" + name + ":" + value)
            let lineItems = [...this.state.lineItems];
            lineItems[i] = { ...lineItems[i], [name]: value };
            this.setState({ lineItems });
            console.log("Value to send --- " + this.state.lineItems)
        }
    }

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
                if (this.state.getAllRequisition[i].status === "forwarded")
                    this.state.getAllRequisition[i].status = "In-Progress"
                if (this.state.searchBy === this.state.getAllRequisition[i].status) {
                    this.state.searchItemIndex = i;
                    this.state.getAllRequisitionBySearch.push(this.state.getAllRequisition[i])
                    this.forceUpdate();
                    c = 1;
                    //break;
                    console.log("Fine")
                }
            }
        }
        if (c == 0) {
            for (let i = 0; i < this.state.getAllRequisition.length; i++) {
                let sizeChildren = this.state.getAllRequisition[i].children.length;
                this.state.getAllRequisitionBySearchItem = []
                for (let j = 0; j < sizeChildren; j++) {
                    this.state.getAllRequisitionBySearchItem.push(this.state.getAllRequisition[i].children[j])
                    console.log("this.state.getAllRequisitionBySearchItem --- " + JSON.stringify(this.state.getAllRequisitionBySearchItem[j].item_name.name + " --- " + this.state.searchBy))
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
        //console.log("requisitor_id --- "+requisitor_id);
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'requisition-purchasehead-list', {
                method: 'get',
                headers: {
                    'x-access-db': localStorage.getItem('dbname'),
                }
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        getAllRequisition: res.RequisitionList,
                        loading: false,
                    });
                    console.log("Value Name Item --- " + JSON.stringify(this.state.getAllRequisition))
                })
                .catch(error => {
                    console.log("ERROR --- " + error)
                });
        });
    }

    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllRequisition();
    }

    handleSubmit(e) {
        e.preventDefault();
        let c = 0;
        const newList = this.state.lineItems.splice(0, 1);
        //this.state.lineItems.pop(this.state.lineItems.length-1);
        console.log("Line Items --- " + JSON.stringify(newList))
        const requisitionForwarded = {
            approval: "forwarded",
            requisitionid: this.state.requisition_id,
            requisition: this.state.lineItems,
            requisitor_id: this.state.requisition_user_id,
        }
        console.log("Request --- " + JSON.stringify(requisitionForwarded))

        for (let i = 0; i < this.state.lineItems.length; i++) {
            if (this.state.lineItems[i].item_name.length == 0 || this.state.lineItems[i].item_description.length == 0 || this.state.lineItems[i].purpose.length == 0 || this.state.lineItems[i].no_of_items.length == 0) {
                c = 1;
                showAlert("All fields are mandatory");
                break;
            }
            if(parseInt(this.state.lineItems[i].no_of_items) <= 0)
            {
                c=1;
                showAlert("Item number must be greaterthan 0");
                break;
            }
        }

        if (c == 0) {
            base_url.post('requisition-forward', requisitionForwarded, {
                headers: {
                    'x-access-db': localStorage.getItem('dbname')
                }
            })
                .then(res => {
                    //this.resetField();
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if (res.data.value == 1) {
                        let success = "Requisition forwarded to  inventory"
                        showAlert(success);
                        this.state.getAllRequisition[this.state.editIndex].status = "forwarded"
                        //this.state.getAllRequisition[this.state.editIndex].no_of_items = this.state.no_of_items
                        this.forceUpdate()
                    }
                    else {
                        //swal(res.data.message);
                        showAlert(res.data.message);
                    }
                })
                .catch(e => console.log(e))
        }
        this.handleClose();
    }

    createUI() {
        //if(this.state.lineItems.length>1){
        return this.state.lineItems.map((item, i) => (
            <div key={i} >
                {this.state.dispStatus && i > 0 ?
                    <div style={{ paddingLeft: '35px' }, stylesForm}>

                        <div style={{ display: "none" }}>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                name="item_id"
                                label="item_id"
                                value={item.item_id}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>

                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                name="item_name"
                                label="item_name"
                                value={item.item_name}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </div>
                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                type="tel"
                                name="no_of_items"
                                label="No. Of Items"
                                value={item.no_of_items}
                                onChange={this.handleInputChangeNumber.bind(this, i)}
                            />
                        </div>
                        <br /><br />
                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                label="Item Description"
                                multiline={true}
                                rows={1}
                                rowsMax={1}
                                name="item_description"
                                value={item.item_description}
                                onChange={this.handleInputChangeValue.bind(this, i)}
                            />
                        </div>
                        <div>
                            <TextField style={textfieldHeight}
                                variant="outlined"
                                margin="dense"
                                label="Purpose"
                                multiline={true}
                                rows={1}
                                rowsMax={1}
                                name="purpose"
                                value={item.purpose}
                                onChange={this.handleInputChangeValue.bind(this, i)}
                            />
                        </div>
                    </div>
                    :
                    ''
                }
            </div>
        ))

    }

    render() {

        const { loading } = this.state;

        const { open, open1 } = this.state;

        const likePointer = { cursor: 'pointer', color: 'blue' };

        const formControl = {
            minWidth: 150,
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

                    <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Approved Requisition Details
                    <IconButton style={{ float: 'right', color: 'red' }} onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>

                        <DialogContent>
                            <form>
                                {this.createUI()}
                                {/* <br />
                            <div>
                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    label="Comment"
                                    multiline={true}
                                    rows={2}
                                    rowsMax={3}
                                    name="comment"
                                    value={this.state.comment}
                                    InputProps={{
                                        disabled: true,
                                    }}
                                />
                            </div> */}
                                <br /><br />
                                <div>
                                    <TextField style={textfieldHeight}
                                        variant="outlined"
                                        margin="dense"
                                        name="requisitorname"
                                        label="Requisitor Name"
                                        value={this.state.pref_req + ' ' + this.state.fn_req + ' ' + this.state.ln_req}
                                        InputProps={{
                                            disabled: true,
                                        }}
                                    />
                                    <TextField style={textfieldHeight}
                                        variant="outlined"
                                        margin="dense"
                                        name="requisitiondate"
                                        label="Requisition Date"
                                        value={this.state.date_req}
                                        InputProps={{
                                            disabled: true,
                                        }}
                                    />
                                </div>
                                <div>
                                    <TextField style={textfieldHeight}
                                        variant="outlined"
                                        margin="dense"
                                        name="approvedby"
                                        label="Approved By"
                                        value={this.state.pref_appr + ' ' + this.state.fn_appr + ' ' + this.state.ln_appr}
                                        InputProps={{
                                            disabled: true,
                                        }}
                                    />
                                    <TextField style={textfieldHeight}
                                        variant="outlined"
                                        margin="dense"
                                        name="approveddate"
                                        label="Approved Date"
                                        value={this.state.date_appr}
                                        InputProps={{
                                            disabled: true,
                                        }}
                                    />
                                </div>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary">
                                Cancel
                        </Button>
                            <Button style={{ fontWeight: 'bold' }} onClick={this.handleSubmit} color="primary">
                                Forward
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <div align="right">
                        <TextField style={searchtextfieldHeight}
                            label="Search by Requisition no./Item/Status"
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
                                    <TableCell style={tableHeadStyle}>Requisition No.</TableCell>
                                    <TableCell style={tableHeadStyle}>Item name</TableCell>
                                    <TableCell style={tableHeadStyle}>Quantity</TableCell>
                                    <TableCell style={tableHeadStyle}>Status</TableCell>
                                    <TableCell style={tableHeadStyle}>Edit</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.getAllRequisitionBySearch.length > 0 && this.state.getAllRequisitionBySearch.map((requisition, i) =>
                                    <TableRow>
                                        <TableCell style={tableBodyStyle}>{requisition.requisition_no}</TableCell>
                                        <TableCell style={tableBodyStyle}>
                                            {this.state.getAllRequisitionBySearch[i].children && this.state.getAllRequisitionBySearch[i].children.map((itemname, i) =>
                                                <p> {itemname.item_name.name} </p>
                                            )}
                                        </TableCell>
                                        <TableCell style={tableBodyStyle}>
                                            {this.state.getAllRequisitionBySearch[i].children && this.state.getAllRequisitionBySearch[i].children.map((itemnumber, i) =>
                                                <p> {itemnumber.no_of_items} </p>
                                            )}
                                        </TableCell>
                                        <TableCell style={tableBodyStyle}>
                                            {
                                                status = requisition.status.replace(/"/g, ''),
                                                status = requisition.status.replace(/"/g, ''),
                                                status === "forwarded" ?
                                                    ("In-Progress")
                                                    :
                                                    (requisition.status)
                                            }
                                        </TableCell>
                                        <TableCell style={tableBodyStyle}>
                                            {
                                                statusCheck = requisition.status.replace(/"/g, ''),
                                                statusCheck = requisition.status.replace(/"/g, ''),
                                                statusCheck === "approved" ?
                                                    (<EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(requisition._id, requisition.requisitor, requisition.comment, requisition.requisitor.prefix, requisition.requisitor.firstname, requisition.requisitor.lastname, requisition.createdAt, requisition.approved_by.prefix, requisition.approved_by.firstname, requisition.approved_by.lastname, requisition.approved_date, this.state.searchItemIndex)} />)
                                                    :
                                                    ('')
                                            }
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        :
                        [(this.state.getAllRequisition.length > 0 ?
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={tableHeadStyle}>Requisition No.</TableCell>
                                        <TableCell style={tableHeadStyle}>Item name</TableCell>
                                        <TableCell style={tableHeadStyle}>Quantity</TableCell>
                                        <TableCell style={tableHeadStyle}>Status</TableCell>
                                        <TableCell style={tableHeadStyle}>Edit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.getAllRequisition.length > 0 && this.state.getAllRequisition.map((requisition, i) =>
                                        <TableRow>
                                            <TableCell style={tableBodyStyle}>{requisition.requisition_no}</TableCell>
                                            <TableCell style={tableBodyStyle}>
                                                {this.state.getAllRequisition[i].children && this.state.getAllRequisition[i].children.map((itemname, i) =>
                                                    <p> {itemname.item_name.name} </p>
                                                )}
                                            </TableCell>
                                            <TableCell style={tableBodyStyle}>
                                                {this.state.getAllRequisition[i].children && this.state.getAllRequisition[i].children.map((itemnumber, i) =>
                                                    <p> {itemnumber.no_of_items} </p>
                                                )}
                                            </TableCell>
                                            <TableCell style={tableBodyStyle}>
                                                {
                                                    status = requisition.status.replace(/"/g, ''),
                                                    status = requisition.status.replace(/"/g, ''),
                                                    status === "forwarded" ?
                                                        ("In-Progress")
                                                        :
                                                        (requisition.status)
                                                }
                                            </TableCell>
                                            <TableCell style={tableBodyStyle}>
                                                {
                                                    statusCheck = requisition.status.replace(/"/g, ''),
                                                    statusCheck = requisition.status.replace(/"/g, ''),
                                                    statusCheck === "approved" ?
                                                        (<EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(requisition._id, requisition.requisitor, requisition.comment, requisition.requisitor.prefix, requisition.requisitor.firstname, requisition.requisitor.lastname, requisition.createdAt, requisition.approved_by.prefix, requisition.approved_by.firstname, requisition.approved_by.lastname, requisition.approved_date, i)} />)
                                                        :
                                                        ('')
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody></Table>
                            :
                            ''
                        )]
                    }

                </div>
            )
        }
    }

}

RequisitionListApproved.propTypes = {
    auth: PropTypes.object.isRequired,
    //editDesignation: PropTypes.func.isRequired,
    //requisitionDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(RequisitionListApproved)

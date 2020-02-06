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
import base_url from '../../../common/utils/axios'
import passvalue from '../../../common/utils/passvalue';
import EditRequisition from './EditRequisition'
import ViewIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
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

class RequisitionReceived extends Component {

    constructor() {
        super();
        this.state = {
            //lineItems: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            getAllRequisition: [],
            getAllRequisitionBySearch: [],
            getAllRequisitionBySearchReqNo: [],
            getAllRequisitionBySearchStatus: [],
            getAllRequisitionData: [],
            getRequisitionStatus: [],
            requisition_id: '',
            viewIndex: -1,
            searchItemIndex: -1,
            subId: '',
            open: false,
            open1: false,
            dispStatus: false,
            lineItems: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            comment: '',
            clickStatus: '',
            loading: false, // will be true when ajax request is running
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.proceedAccept = this.proceedAccept.bind(this);
        this.proceedReject = this.proceedReject.bind(this);
    }

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,
            lineItems: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            comment: '',
        });
    };

    handleClick(reqId, index) {
        console.log("INDEX --- " + index)
        this.setState({
            open: true,
            requisition_id: reqId,
            viewIndex: index,
        });

        this.fetchRequisitionDetails(reqId);
    };

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
        this.state.getAllRequisitionBySearchReqNo = [];
        this.state.getAllRequisitionBySearchStatus = [];
        let c = 0;
        console.log("Search Calling --- " + this.state.searchBy)
        for (let i = 0; i < this.state.getAllRequisition.length; i++) {
            if (this.state.searchBy === this.state.getAllRequisition[i].user_name) {
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
                let sizeChildren = this.state.getAllRequisition[i].requisition_datas.length;
                this.state.getAllRequisitionBySearchReqNo = []
                for (let j = 0; j < sizeChildren; j++) {
                    this.state.getAllRequisitionBySearchReqNo.push(this.state.getAllRequisition[i].requisition_datas[j])
                    console.log("this.state.getAllRequisitionBySearchItem --- " + JSON.stringify(this.state.getAllRequisitionBySearchReqNo[j].requisition_no + " --- " + this.state.searchBy))
                    if (this.state.getAllRequisitionBySearchReqNo[j].requisition_no === this.state.searchBy) {
                        console.log("True ---")
                        this.state.searchItemIndex = i;
                        this.state.getAllRequisitionBySearch.push(this.state.getAllRequisition[i])
                        this.forceUpdate();
                        c = 1;
                        break;
                        console.log("Fine --- ")
                    }
                }
            }
        }
        if (c == 0) {
            for (let i = 0; i < this.state.getAllRequisition.length; i++) {
                let sizeChildren = this.state.getAllRequisition[i].requisition_datas.length;
                this.state.getAllRequisitionBySearchStatus = []
                for (let j = 0; j < sizeChildren; j++) {
                    this.state.getAllRequisitionBySearchStatus.push(this.state.getAllRequisition[i].requisition_datas[j])
                    console.log("this.state.getAllRequisitionBySearchItem --- " + JSON.stringify(this.state.getAllRequisitionBySearchStatus[j].status + " --- " + this.state.searchBy))
                    if(this.state.getAllRequisitionBySearchStatus[j].status==="forwarded")
                        this.state.getAllRequisitionBySearchStatus[j].status="In-Progress"
                    if (this.state.getAllRequisitionBySearchStatus[j].status === this.state.searchBy) {
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
            fetch(envirionment.BASE_URL + 'subordinatewise-requisition-list', {
                method: 'post',
                headers: {
                    'x-access-db': localStorage.getItem('dbname'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ myId: id })
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        getAllRequisition: res.list,
                        loading: false,
                    });
                    console.log("getAllRequisition --- " + JSON.stringify(res.list))
                })
                .catch(error => {
                    console.log("ERROR --- " + error)
                });

        });
    }

    fetchRequisitionDetails(reqID) {
        const newList = this.state.lineItems.splice(0, 1);
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'requisitionByid', {
                method: 'post',
                headers: {
                    'x-access-db': localStorage.getItem('dbname'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ requisitionId: reqID })
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        getAllRequisitionData: res.data.children,
                        getRequisitionStatus: res.data,
                        loading: false,
                    });
                    console.log("getAllRequisition --- " + JSON.stringify(res.data.children))
                    for (let i = 0; i < this.state.getAllRequisitionData.length; i++) {
                        this.state.lineItems.push({ item_name: this.state.getAllRequisitionData[i].item_name.name, item_description: this.state.getAllRequisitionData[i].item_description, purpose: this.state.getAllRequisitionData[i].purpose, no_of_items: this.state.getAllRequisitionData[i].no_of_items })
                        console.log("LineItems --- " + JSON.stringify(this.state.lineItems))
                        this.forceUpdate();
                    }

                    this.state.dispStatus = true
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

    proceedAccept(e, itemClicked) {
        console.log("Clicked");
        //e.preventDefault();
        this.state.clickStatus = itemClicked;
        console.log("this.state.clickStatus --- " + this.state.clickStatus)

        this.setState({
            open: false,
        })
        this.state.open = false;

        e.preventDefault();
        const requisitionApproval = {
            requisitionid: this.state.requisition_id,
            approval: this.state.clickStatus,
            //reject_note: this.state.reject_note,
            comment: "",
            approved_by: localStorage.getItem('id'),
        }
        console.log("Request --- " + JSON.stringify(requisitionApproval))

        base_url.post('requsition-approval', requisitionApproval, {
            headers: {
                'x-access-db': localStorage.getItem('dbname')
            }
        })
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {

                    let success = "Requisition is approved"
                    showAlert(success);
                    this.fetchAllRequisition();
                    this.state.getRequisitionStatus.status = "approved"

                    this.forceUpdate()
                }
                else {
                    showAlert(res.data.message);
                }
            })
            .catch(e => console.log(e))
        this.handleClose();
    }

    proceedReject(e, itemClicked) {
        console.log("Clicked");
        //e.preventDefault();
        this.state.clickStatus = itemClicked;
        console.log("this.state.clickStatus --- " + this.state.clickStatus)

        this.setState({
            open: false,
            open1: true,
        })
        this.state.open = false;
        this.state.open1 = true;
    }

    handleSubmit(e, itemClicked) {
        console.log("Clicked Button --- " + itemClicked)
        e.preventDefault();
        const requisitionApproval = {
            requisitionid: this.state.requisition_id,
            approval: this.state.clickStatus,
            //reject_note: this.state.reject_note,
            comment: this.state.comment,
            approved_by: localStorage.getItem('id'),
        }
        console.log("Request --- " + JSON.stringify(requisitionApproval))

        base_url.post('requsition-approval', requisitionApproval, {
            headers: {
                'x-access-db': localStorage.getItem('dbname')
            }
        })
            .then(res => {
                //this.resetField();
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    if (this.state.clickStatus === "approved") {
                        let success = "Requisition is approved"
                        showAlert(success);
                        this.fetchAllRequisition();
                        this.state.getRequisitionStatus.status = "approved"
                    }
                    if (this.state.clickStatus === "rejected") {
                        let success = "Requisition is rejected"
                        showAlert(success);
                        this.fetchAllRequisition();
                        this.state.getRequisitionStatus.status = "rejected"

                    }
                    this.forceUpdate()
                }
                else {
                    //swal(res.data.message);
                    showAlert(res.data.message);
                }
            })
            .catch(e => console.log(e))
        this.handleClose();
    }


    createUI() {
        console.log("Executing")
        if (this.state.lineItems.length > 0) {
            console.log("Executing if --- " + this.state.lineItems.length)
            return this.state.lineItems.map((item, i) => (
                <div key={i} >
                    {/* {this.state.dispStatus && i > 0 ? */}
                    <div style={{ paddingLeft: '35px' }, stylesForm}>
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
                                multiline={true}
                                rows={1}
                                rowsMax={1}
                                name="item_description"
                                value={item.item_description}
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
                                multiline={true}
                                rows={1}
                                rowsMax={1}
                                name="purpose"
                                value={item.purpose}
                                InputProps={{
                                    disabled: true,
                                }}
                            />
                        </div>
                    </div>
                    {/* :
                    ''
                } */}
                </div>
            ))
        }

    }

    render() {

        const { loading } = this.state;

        const { open, open1 } = this.state;

        const likePointer = { cursor: 'pointer', color: 'blue' };

        const formControl = {
            minWidth: 150,
        };

        const tableHeadStyle = { fontWeight: 'bold', fontSize: '15px', color: 'black' }
        const tableBodyStyle = { fontSize: '12px', verticalAlign: 'top' }

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

                    <Dialog open={open} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Requisition Details
                    <IconButton style={{ float: 'right', color: 'red' }} onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <form>
                                {this.createUI()}
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary">
                                Cancel
                        </Button>
                            {this.state.viewIndex >= 0 && this.state.getRequisitionStatus.status === "submitted" ?
                                <div>
                                    <Button style={{ fontWeight: 'bold' }} onClick={e => this.proceedAccept(e, "approved")} color="primary">
                                        Accept
                        </Button>
                                    <Button onClick={e => this.proceedReject(e, "rejected")} color="primary">
                                        Reject
                        </Button>
                                </div>
                                :
                                ''
                            }
                        </DialogActions>
                    </Dialog>

                    <Dialog open={open1} aria-labelledby="form-dialog-title-text">
                        <DialogTitle id="form-dialog-title-text">Note </DialogTitle>
                        <DialogContent>
                            <div>
                                <textarea style={textfieldHeight}
                                    variant="outlined"
                                    margin="normal"
                                    placeholder="Comment"
                                    multiline
                                    name="comment"
                                    value={this.state.comment}
                                    onChange={this.handleInputChangeValue.bind(this)}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary">
                                Cancel
                        </Button>
                            <Button style={{ fontWeight: 'bold' }} onClick={e => this.handleSubmit(e, "ok")} color="primary">
                                Ok
                        </Button>

                        </DialogActions>
                    </Dialog>
                    <div align="right">
                        <TextField style={searchtextfieldHeight}
                            label="Search by Requisitor/Requisition no./Status"
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
                                    <TableCell style={tableHeadStyle}>Name</TableCell>
                                    <TableCell style={tableHeadStyle}>Email</TableCell>
                                    <TableCell style={tableHeadStyle}>Requisition No.</TableCell>
                                    <TableCell style={tableHeadStyle}>Status</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {this.state.getAllRequisitionBySearch.length > 0 && this.state.getAllRequisitionBySearch.map((requisition, i) =>
                                    (this.state.getAllRequisitionBySearch[i].requisition_datas.length > 0 ?
                                        <TableRow>
                                            <TableCell style={tableBodyStyle}>{requisition.user_name}</TableCell>
                                            <TableCell style={tableBodyStyle}>{requisition.user_email}</TableCell>
                                            <TableCell style={tableBodyStyle}>
                                                {this.state.getAllRequisitionBySearch[i].requisition_datas && this.state.getAllRequisitionBySearch[i].requisition_datas.map((requisitionNo, i) =>
                                                    <p style={likePointer} onClick={(e) => this.handleClick(requisitionNo.requesitionid, this.state.searchItemIndex)}> {requisitionNo.requisition_no} </p>
                                                )}
                                            </TableCell>
                                            <TableCell style={tableBodyStyle}>
                                                {this.state.getAllRequisitionBySearch[i].requisition_datas && this.state.getAllRequisitionBySearch[i].requisition_datas.map((requisitionNoStatus, i) =>
                                                    <p> {requisitionNoStatus.status === "forwarded" ? "In-Progress" : requisitionNoStatus.status} </p>
                                                )}
                                            </TableCell>

                                        </TableRow>
                                        :
                                        ''
                                    )

                                )}
                            </TableBody></Table>
                        :
                        [(this.state.getAllRequisition.length > 0 ?
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={tableHeadStyle}>Name</TableCell>
                                        <TableCell style={tableHeadStyle}>Email</TableCell>
                                        <TableCell style={tableHeadStyle}>Requisition No.</TableCell>
                                        <TableCell style={tableHeadStyle}>Status</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {this.state.getAllRequisition.length > 0 && this.state.getAllRequisition.map((requisition, i) =>
                                        (this.state.getAllRequisition[i].requisition_datas.length > 0 ?
                                            <TableRow>
                                                <TableCell style={tableBodyStyle}>{requisition.user_name}</TableCell>
                                                <TableCell style={tableBodyStyle}>{requisition.user_email}</TableCell>
                                                <TableCell style={tableBodyStyle}>
                                                    {this.state.getAllRequisition[i].requisition_datas && this.state.getAllRequisition[i].requisition_datas.map((requisitionNo, i) =>
                                                        <p style={likePointer} onClick={(e) => this.handleClick(requisitionNo.requesitionid, i)}> {requisitionNo.requisition_no} </p>
                                                    )}
                                                </TableCell>
                                                <TableCell style={tableBodyStyle}>
                                                    {this.state.getAllRequisition[i].requisition_datas && this.state.getAllRequisition[i].requisition_datas.map((requisitionNoStatus, i) =>
                                                        <p> {requisitionNoStatus.status === "forwarded" ? "In-Progress" : requisitionNoStatus.status} </p>
                                                    )}
                                                </TableCell>

                                            </TableRow>
                                            :
                                            ''
                                        )

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

RequisitionReceived.propTypes = {
    auth: PropTypes.object.isRequired,
    //editDesignation: PropTypes.func.isRequired,
    //requisitionDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(RequisitionReceived)

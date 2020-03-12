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
import base_url from '../../../common/utils/axios'
import passvalue from '../../../common/utils/passvalue';
import EditRequisition from './EditRequisition'
import ViewIcon from '@material-ui/icons/Visibility';
import IconButton from "@material-ui/core/IconButton";
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

const searchtextfieldHeight = {
    width: 350,
};

const stylesForm = {
    display: 'flex',
    flexWrap: 'wrap',
};

var desigNameArray = [];
var desigIdArray = [];
var statusArray = [];
var statusCheck = '';
var status = '';


class RequisitionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lineItems: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            lineItemsView: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            getAllRequisition: [],
            getAllRequisitionBySearch: [],
            getAllRequisitionBySearchItem: [],
            requisition_id: '',
            getAllItem: [],
            itemName: [],
            itemId: [],
            dispStatus: false,
            delIndex: -1,
            editIndex: -1,
            viewIndex: -1,
            searchBy: '',
            searchItemIndex: -1,
            loading: false, // will be true when ajax request is running
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handlerfordata = (data) => {
        console.log('Inside handlerfordata data is');
        this.state.lineItems = data
        console.log("My Data --- " + this.state.lineItems);
        //this.props.handlerfordata(this.state.lineItems);
    }

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,
            open2: false,
            lineItemsView: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
        });
    };

    handleClickView(reqId, index) {
        console.log("INDEX --- " + index + " --- +++ " + reqId)
        this.setState({
            open2: true,
            requisition_id: reqId,
            viewIndex: index,
        });
        if (this.state.getAllRequisitionBySearch.length > 0) {
            for (let i = 0; i < this.state.getAllRequisition.length; i++) {
                if (this.state.getAllRequisition[i]._id === reqId) {
                    index = i;
                    //this.state.getAllRequisitionBySearch=[];
                    break;
                }
            }
            for (let i = 0; i < this.state.getAllRequisition[index].children.length; i++) {
                console.log("Value Comming --- " + JSON.stringify(this.state.getAllRequisition[index].children) + " --- " + JSON.stringify(this.state.getAllRequisition[index].children[i].item_name.name))
                this.state.lineItemsView.push({ item_name: this.state.getAllRequisition[index].children[i].item_name.name, item_description: this.state.getAllRequisition[index].children[i].item_description, purpose: this.state.getAllRequisition[index].children[i].purpose, no_of_items: this.state.getAllRequisition[index].children[i].no_of_items })
            }
        }
        else {
            for (let i = 0; i < this.state.getAllRequisition[index].children.length; i++) {
                console.log("Value Comming --- " + JSON.stringify(this.state.getAllRequisition[index].children) + " --- " + JSON.stringify(this.state.getAllRequisition[index].children[i].item_name.name))
                this.state.lineItemsView.push({ item_name: this.state.getAllRequisition[index].children[i].item_name.name, item_description: this.state.getAllRequisition[index].children[i].item_description, purpose: this.state.getAllRequisition[index].children[i].purpose, no_of_items: this.state.getAllRequisition[index].children[i].no_of_items })
            }
        }
        const newList = this.state.lineItemsView.splice(0, 1);
        this.state.dispStatus = true
    };

    handleClick(reqId, index) {
        console.log("INDEX --- " + index)
        this.setState({
            open: true,
            requisition_id: reqId,
            editIndex: index,
        });

        if (this.state.getAllRequisitionBySearch.length > 0) {
            for (let i = 0; i < this.state.getAllRequisition.length; i++) {
                if (this.state.getAllRequisition[i]._id === reqId) {
                    passvalue.requisitionIndex = i;
                    //this.state.getAllRequisitionBySearch=[];
                    break;
                }
            }
        }
        else {
            passvalue.requisitionIndex = index;
        }
    };

    handleClickDelete(reqId, index) {
        console.log("requisition_id --- " + reqId)
        this.setState({
            open1: true,
            delIndex: index,
        });
        this.state.requisition_id = reqId
        console.log("requisition_id --- " + this.state.requisition_id)
    }

    handleInputChangeValue(event) {
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

    fetchAllRequisition() {
        let id = localStorage.getItem('id');
        //console.log("requisitor_id --- "+requisitor_id);
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'requisition-list', {
                method: 'post',
                headers: {
                    'x-access-db': localStorage.getItem('dbname'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ requisitor_id: id })
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        getAllRequisition: res.RequisitionList,
                        loading: false,
                    });

                    for (let i = 0; i < res.RequisitionList.length; i++) {
                        statusArray.push(JSON.stringify(res.RequisitionList[i].status));
                    }
                    console.log("Requisition List --- " + JSON.stringify(res.RequisitionList[0].status.length))
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

    handleSubmit(id, e) {
        e.preventDefault();
        let c = 0;
        const newList = this.state.lineItems.splice(0, 1);
        //this.state.lineItems.pop(this.state.lineItems.length-1);
        console.log("Line Items --- " + JSON.stringify(newList))
        let itemStatus;
        if (id === "301")
            itemStatus = "pending"
        if (id === "302")
            itemStatus = "submitted"
        const requisitionEdit = {
            requisitionid: this.state.requisition_id,
            requisition: this.state.lineItems,
            status: itemStatus,
        }

        console.log("Request --- " + JSON.stringify(requisitionEdit))
        //this.state.getAllRequisition[this.state.editIndex].menuName = this.state.menuName
        //this.props.menuEdit(menuEdit, this.props.history);
        for (let i = 0; i < this.state.lineItems.length; i++) {
            if (this.state.lineItems[i].item_name.length == 0 || this.state.lineItems[i].item_description.length == 0 || this.state.lineItems[i].purpose.length == 0 || this.state.lineItems[i].no_of_items.length == 0) {
                c = 1;
                showAlert("All fields are mandatory");
                break;
            }
            if (this.state.lineItems[i].no_of_items == 0) {
                c = 1;
                showAlert("No of items must be greater than 0");
                break;
            }
        }
        if (c == 0) {
            base_url.post('requisition-update', requisitionEdit, {
                headers: {
                    'x-access-db': localStorage.getItem('dbname')
                }
            })
                .then(res => {
                    //this.resetField();
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if (res.data.value == 1) {
                        let success = "Requisition is updated successfully"
                        showAlert(success);
                        this.props.handlerfordata(this.state.lineItems);
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

    handleDelete(e) {
        e.preventDefault();
        console.log("this.state.requisition_id --- " + this.state.requisition_id)

        this.setState((prevState) => ({
            getAllRequisition: prevState.getAllRequisition.filter((_, i) => i !== this.state.delIndex)
        }));

        fetch(envirionment.BASE_URL + 'requisition-delete', {
            method: 'post',
            headers: {
                'x-access-db': localStorage.getItem('dbname'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ requesitionid: this.state.requisition_id })
        }).then(res => res.json())
            .then(res => {
                console.log("DATA --- " + res + " --- " + res.value);
                console.log(res.message);
                if (res.value == 1)
                    showAlert("Requisition is deleted successfully");
                else
                    showAlert(res.message);
            })
            .catch(err => {
            });

        this.handleClose();
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
                    console.log("this.state.getAllRequisitionBySearchItem --- " + JSON.stringify(this.state.getAllRequisitionBySearchItem[j].item_name.name + " --- " + this.state.searchBy))
                    if (this.state.getAllRequisitionBySearchItem[j].item_name.name === this.state.searchBy) {
                        console.log("True ---")
                        this.state.searchItemIndex = i;
                        this.state.getAllRequisitionBySearch.push(this.state.getAllRequisition[i])
                        this.forceUpdate();
                        //break;
                        console.log("Fine --- ")
                    }
                }
            }
        }
    }


    render() {

        const { loading } = this.state;

        const { open, open1, open2 } = this.state;

        const likePointer = { cursor: 'pointer', color: 'blue' };
        const delPointer = { cursor: 'pointer', color: 'red' };

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

                    <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth="false">

                        <DialogContent>

                            <div style={{ width: 1000 }}>
                                <EditRequisition handlerfordata={this.handlerfordata} />
                            </div><br /><br />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="secondary">
                                Cancel
                        </Button>
                            <Button onClick={e => this.handleSubmit("301", e)} color="primary">
                                Save and Exit
                        </Button>
                            <Button style={{ fontWeight: 'bold' }} onClick={e => this.handleSubmit("302", e)} color="primary">
                                Submit
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={open2} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <DialogContentText>
                                View Requisition Details
                        </DialogContentText>
                            <form className="reg" noValidate style={{ styles1 }} >
                                {this.createUI()}
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button style={{ fontWeight: 'bold' }} onClick={this.handleClose} color="primary">
                                Ok
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <div align="right">
                        <TextField style={searchtextfieldHeight}
                            label="Search by Requisition No. or Item Name"
                            id="searchBy"
                            name="searchBy"
                            value={this.state.searchBy}
                            onChange={this.handleInputChangeValue.bind(this)}
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

                    {this.state.getAllRequisitionBySearch.length > 0 ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableHeadStyle}>Requisition No.</TableCell>
                                    <TableCell style={tableHeadStyle}>Item name</TableCell>
                                    <TableCell style={tableHeadStyle}>Quantity</TableCell>
                                    <TableCell style={tableHeadStyle}>Status</TableCell>
                                    <TableCell style={tableHeadStyle}>View</TableCell>
                                    <TableCell style={tableHeadStyle}>Edit</TableCell>
                                    <TableCell style={tableHeadStyle}>Delete</TableCell>

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
                                        <TableCell><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickView(requisition._id, this.state.searchItemIndex)} /></TableCell>
                                        <TableCell style={tableBodyStyle}>
                                            {
                                                statusCheck = requisition.status.replace(/"/g, ''),
                                                statusCheck = requisition.status.replace(/"/g, ''),
                                                statusCheck === "pending" || statusCheck === "rejected" ?
                                                    (<EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(requisition._id, this.state.searchItemIndex)} />)
                                                    :
                                                    ('')
                                            }
                                        </TableCell>
                                        <TableCell style={tableBodyStyle}>
                                            {
                                                statusCheck = requisition.status.replace(/"/g, ''),
                                                statusCheck = requisition.status.replace(/"/g, ''),
                                                statusCheck === "pending" || statusCheck === "rejected" ?
                                                    (<DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(requisition._id, this.state.searchItemIndex)} />)
                                                    :
                                                    ('')
                                            }
                                        </TableCell>

                                    </TableRow>

                                )}
                            </TableBody></Table>
                        :
                        [(this.state.getAllRequisition.length > 0 ?

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={tableHeadStyle}>Requisition No.</TableCell>
                                        <TableCell style={tableHeadStyle}>Item name</TableCell>
                                        <TableCell style={tableHeadStyle}>Quantity</TableCell>
                                        <TableCell style={tableHeadStyle}>Status</TableCell>
                                        <TableCell style={tableHeadStyle}>View</TableCell>
                                        <TableCell style={tableHeadStyle}>Edit</TableCell>
                                        <TableCell style={tableHeadStyle}>Delete</TableCell>

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
                                            <TableCell><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickView(requisition._id, i)} /></TableCell>
                                            <TableCell style={tableBodyStyle}>
                                                {
                                                    statusCheck = requisition.status.replace(/"/g, ''),
                                                    statusCheck = requisition.status.replace(/"/g, ''),
                                                    statusCheck === "pending" || statusCheck === "rejected" ?
                                                        (<EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(requisition._id, i)} />)
                                                        :
                                                        ('')
                                                }
                                            </TableCell>
                                            <TableCell style={tableBodyStyle}>
                                                {
                                                    statusCheck = requisition.status.replace(/"/g, ''),
                                                    statusCheck = requisition.status.replace(/"/g, ''),
                                                    statusCheck === "pending" || statusCheck === "rejected" ?
                                                        (<DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(requisition._id, i)} />)
                                                        :
                                                        ('')
                                                }
                                            </TableCell>

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

RequisitionList.propTypes = {
    auth: PropTypes.object.isRequired,
    //editDesignation: PropTypes.func.isRequired,
    //requisitionDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(RequisitionList)

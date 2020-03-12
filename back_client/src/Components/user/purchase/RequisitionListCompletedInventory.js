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
import { blue } from '@material-ui/core/colors';
import ViewIcon from '@material-ui/icons/Visibility';
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

const searchtextfieldHeight = {
    width: 350,
};

const formControl = {
    minWidth: 150,
};

class RequisitionListCompletedInventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lineItems: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            lineItemsView: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
            getAllRequisition: [],
            getAllRequisitionBySearch: [],
            getAllRequisitionBySearchItem: [],
            requisition_id: '',
            assignIndex: '',
            requisition_user_id: '',
            delIndex: -1,
            editIndex: -1,
            viewIndex: -1,
            searchItemIndex: -1,
            open: false,
            dispStatus: false,
            comment: '',
            loading: false, // will be true when ajax request is running
        };

    }

    handleClose = () => {
        this.setState({
            open2: false,
            comment: '',
            lineItemsView: [{ item_name: "", item_description: "", purpose: "", no_of_items: "" }],
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
            fetch(envirionment.BASE_URL + 'completed-requisition-list', {
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
                    console.log("Requisition Details --- " + JSON.stringify(res.RequisitionList))
                    console.log("Value Name Item --- " + JSON.stringify(this.state.getAllRequisition[0].children[0].item_name.name))
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

    render() {

        const { loading } = this.state;

        const { open2 } = this.state;

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
                            <Button onClick={this.handleClose} color="primary">
                                Ok
                        </Button>
                        </DialogActions>
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
                                    <TableCell style={tableHeadStyle}>Requisition No.</TableCell>
                                    <TableCell style={tableHeadStyle}>Item name</TableCell>
                                    <TableCell style={tableHeadStyle}>Quantity</TableCell>
                                    <TableCell style={tableHeadStyle}>Status</TableCell>
                                    <TableCell style={tableHeadStyle}>In Stock</TableCell>
                                    <TableCell style={tableHeadStyle}>View</TableCell>
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
                                        <TableCell style={tableBodyStyle}>{requisition.status}</TableCell>
                                        <TableCell>
                                            {this.state.getAllRequisitionBySearch[i].children && this.state.getAllRequisitionBySearch[i].children.map((itemname, i) =>
                                                <p> {itemname.item_name.stock} </p>
                                            )}
                                        </TableCell>
                                        <TableCell><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickView(requisition._id, requisition.comment, this.state.searchItemIndex)} /></TableCell>
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
                                        <TableCell style={tableHeadStyle}>In Stock</TableCell>
                                        <TableCell style={tableHeadStyle}>View</TableCell>
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
                                            <TableCell style={tableBodyStyle}>{requisition.status}</TableCell>
                                            <TableCell>
                                                {this.state.getAllRequisition[i].children && this.state.getAllRequisition[i].children.map((itemname, i) =>
                                                    <p> {itemname.item_name.stock} </p>
                                                )}
                                            </TableCell>
                                            <TableCell><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClickView(requisition._id, requisition.comment, i)} /></TableCell>
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

RequisitionListCompletedInventory.propTypes = {
    auth: PropTypes.object.isRequired,
    //editDesignation: PropTypes.func.isRequired,
    //requisitionDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(RequisitionListCompletedInventory)

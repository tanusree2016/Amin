import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import axios from '../../../common/utils/axios';
import ViewIcon from '@material-ui/icons/Visibility';
import envirionment from '../../../common/utils/envirionment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { flexbox } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { ticketUpdate } from '../authentication';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'

import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";


var formData = null;

const searchtextfieldHeight = {
    width: 350,
};
class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getAlltickets: [],
            getAllticketsBySearch: [],
            issue_object: [],
            issue: [],
            newissue: '',
            selectedFile: null,
            delIndex: -1,
            editIndex: -1,
            searchItemIndex: -1,
            ext: '',
            loading: false, // will be true when ajax request is running
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchTicket() {
        console.log("Calling --- ");
        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'ticket', {
                method: "GET",
                headers: { 'x-access-token': localStorage.getItem('token'), 'x-access-db': localStorage.getItem('dbname') }
            }).then(res => res.json())
                .then(res => {
                    console.log("hello ticket--- " + res.Tickets);
                    this.setState({
                        getAlltickets: res.Tickets,
                        loading: false,
                    });
                    console.log("Details : " + JSON.stringify(res.Tickets))
                })
        })
        console.log("Calling --- End ---  ");
        //this.forceUpdate();
    }



    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchTicket();
    }

    handleInputChangeValue(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

    }

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,

        });
    };


    handleClick(e, f, g, h, i, index) {
        //console.log('handle click---'+ JSON.stringify(f.children[0].issue) +'response'+ g);
        this.setState({
            open: true,
            ticketid: e,
            issue: f.children,
            response: f.children[0].response,
            ticket_primary: h,
            ticketUnique: i,
            editIndex: index,
            issue_object: f.children

        });
    };

    onChangeHandler = event => {
        let files = event.target.files;
        let extension;
        extension = event.target.files[0].name.slice((event.target.files[0].name.lastIndexOf(".") - 1 >>> 0) + 2);
        this.setState({
            ext: extension,
        })
        console.log("File Name : " + event.target.files[0].name + " " + extension)
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            console.log("Files --- " + e.target.result.split(',').pop())
            formData = { file: e.target.result.split(',').pop() }
        }

        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        const ticketUpdate = {
            issue: this.state.newissue,
            dbname: localStorage.getItem('dbname'),
            customer_id: localStorage.getItem('companyid'),
            file: formData,
            ticketUnique: this.state.ticketUnique,
            ticket_primary: this.state.ticket_primary,
            extension: this.state.ext,
        }
        console.log("Data --- " + data);
        this.forceUpdate();
        this.props.ticketUpdate(ticketUpdate, this.props.history);
        this.resetField();

    }

    resetField = () => {
        this.setState({ newissue: '' });
    }

    handleInputChangeSearchValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });

        if (val === "") {
            console.log("Clear")
            this.state.getAllticketsBySearch = [];
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
        this.state.getAllticketsBySearch = [];
        let c = 0;
        console.log("Search Calling --- " + this.state.searchBy)
        for (let i = 0; i < this.state.getAlltickets.length; i++) {
            if (this.state.searchBy === this.state.getAlltickets[i].status) {
                this.state.searchItemIndex = i;
                this.state.getAllticketsBySearch.push(this.state.getAlltickets[i])
                c = 1;
                this.forceUpdate();
            }
        }
        if (c == 0) {
            for (let i = 0; i < this.state.getAlltickets.length; i++) {
                let sizeChild = this.state.getAlltickets[i].children.length
                for (let j = 0; j < sizeChild; j++) {
                    if (this.state.searchBy === this.state.getAlltickets[i].children[j].issue) {
                        this.state.searchItemIndex = i;
                        this.state.getAllticketsBySearch.push(this.state.getAlltickets[i])
                        c = 1;
                        this.forceUpdate();
                    }
                }
            }
        }
    }

    render() {

        const { loading } = this.state;

        const { open, open1, setOpen } = this.state;

        const likePointer = { cursor: 'pointer', color: 'blue' };
        const delPointer = { cursor: 'pointer', color: 'red' };

        const tableHeadStyle = { fontWeight: 'bold', fontSize: '15px', color: 'black' }
        const tableBodyStyle = { fontSize: '12px' }

        const [scroll, setScroll] = '';

        const formControl = {
            minWidth: 150,
        };

        const dividerInset = {
            margin: 5,
        };

        const styles1 = {
            textAlign: 'right',

            //paddingTop: '2',
        };

        const styles = {
            textAlign: 'left',

            //paddingTop: '2',
        };

        const avatar1 = {
            margin: 10,
            color: '#fff',
            align: 'left',
            backgroundColor: deepPurple[500],
        }

        const avatar2 = {
            margin: 10,
            color: '#fff',

            backgroundColor: deepOrange[500],

        }

        const textfieldHeight = {
            width: 280,
            height: 50,
            marginLeft: 4,
            marginRight: 4,
            marginTop: 5,
        };

        const stylesBotton = {
            marginTop: 20
        };

        const closeImg = {
            cursor: 'pointer',
            float: 'right',
            marginTop: '5px',
            width: '20px'
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
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title" >
                        {/* <button type="button" aria-label="Close" onClick={this.handleClose}>
                        <img src={require('../../../resources/modal-close-icon.png')} width="17" height="17" alt="" />
                    </button> */}
                        <DialogTitle id="scroll-dialog-title" >Ticket Detail
                        <IconButton style={{ float: 'right' }} onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>

                        <DialogContent dividers={scroll === 'paper'}>
                            {this.state.issue && this.state.issue.map((tickets, i) =>
                                <div>
                                    <DialogContentText>
                                        {tickets.issue.length > 0 ?
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Avatar style={avatar2} >I</Avatar>
                                                </div>
                                                <Box display="flex" justifyContent="flex-end">

                                                    <div style={styles}>
                                                        {tickets.issue}
                                                        {tickets.filename.length > 0 ?
                                                            <div style={{ "color": "blue" }}>
                                                                <a href={envirionment.BASE_URL + 'uploads/' + tickets.filename}>file</a>
                                                            </div>
                                                            :
                                                            ''
                                                        }
                                                    </div>

                                                </Box>
                                            </div>
                                            :
                                            ''
                                        }

                                    </DialogContentText>
                                    <Divider variant="fullWidth" />
                                    <DialogContentText>
                                        {tickets.response.length > 0 ?
                                            <div>
                                                <Avatar style={avatar1} >S.A</Avatar>
                                                <Box display="flex" justifyContent="flex-start">

                                                    <div style={styles1}>
                                                        {tickets.response}
                                                        {tickets.responsefile.length > 0 ?
                                                            <div style={{ "color": "blue" }}>
                                                                <a href={envirionment.BASE_URL + 'uploads/' + tickets.responsefile}>file</a>
                                                            </div>
                                                            :
                                                            ''
                                                        }
                                                    </div>
                                                </Box>
                                            </div>
                                            :
                                            ''
                                        }
                                    </DialogContentText>
                                    <Divider variant="fullWidth" />
                                </div>
                            )}

                            <br />
                            <br />



                            <form className="reg" noValidate encType="multipart/form-data">
                                <TextField style={textfieldHeight}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    id="issue"
                                    label="issue"
                                    name="newissue"
                                    value={this.state.newissue}
                                    autoFocus
                                    onChange={(ev) => this.handleInputChangeValue(ev, 1)}
                                />

                                <input type="file" name="file" onChange={this.onChangeHandler} />

                                <Button style={stylesBotton}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    //className={classes.submit}
                                    onClick={this.handleSubmit}
                                >
                                    Submit
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <div align="right">
                        <TextField style={searchtextfieldHeight}
                            label="Search by Issue/Status"
                            id="searchBy"
                            name="searchBy"
                            value={this.state.searchBy}
                            autoComplete='off'
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

                    {this.state.getAllticketsBySearch.length > 0 ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={tableHeadStyle}>Issue</TableCell>
                                    <TableCell style={tableHeadStyle}>Details</TableCell>
                                    <TableCell style={tableHeadStyle}>status</TableCell>
                                    <TableCell style={tableHeadStyle}>View</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.getAllticketsBySearch && this.state.getAllticketsBySearch.map((tickets, i) =>
                                    <TableRow>
                                        <TableCell style={tableBodyStyle}>{tickets.children[0].issue}</TableCell>

                                        <TableCell style={tableBodyStyle}>{tickets.children[0].details}</TableCell>

                                        <TableCell style={tableBodyStyle}>{tickets.status}</TableCell>

                                        <TableCell style={tableBodyStyle}><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(tickets.ticketId, tickets, tickets.children.response, tickets._id, tickets.ticketUnique, this.state.searchItemIndex)} /></TableCell>

                                    </TableRow>

                                )}
                            </TableBody></Table>
                        :
                        [(this.state.getAlltickets.length > 0 ?
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={tableHeadStyle}>Issue</TableCell>
                                        <TableCell style={tableHeadStyle}>Details</TableCell>
                                        <TableCell style={tableHeadStyle}>status</TableCell>
                                        <TableCell style={tableHeadStyle}>View</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.getAlltickets && this.state.getAlltickets.map((tickets, i) =>
                                        <TableRow>
                                            <TableCell style={tableBodyStyle}>{tickets.children[0].issue}</TableCell>

                                            <TableCell style={tableBodyStyle}>{tickets.children[0].details}</TableCell>

                                            <TableCell style={tableBodyStyle}>{tickets.status}</TableCell>

                                            <TableCell style={tableBodyStyle}><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(tickets.ticketId, tickets, tickets.children.response, tickets._id, tickets.ticketUnique, i)} /></TableCell>

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

Ticket.propTypes = {
    auth: PropTypes.object.isRequired,
    ticketUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps, { ticketUpdate })(Ticket)
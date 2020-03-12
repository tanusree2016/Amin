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
import DownloadIcon from '@material-ui/icons/CloudDownload';
import BASE_URL from '../../../common/utils/envirionment'
import download from 'js-file-download';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'

var formData = null;
class Ticket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getAlltickets: [],
            childrenData: [],
            issue_object: [],
            //issue: '',
            issue: [],
            newissue: '',
            selectedFile: null,
            delIndex: -1,
            editIndex: -1,
            id: '',
            responseData: '',
            ext: '',
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fetchTicket() {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'ticket', {
            method: "GET",
            headers: { 'x-access-token': localStorage.getItem('token'), 'x-access-db': localStorage.getItem('dbname') }
        }).then(res => res.json())
            .then(res => {
                console.log("hello ticket--- " + res.Tickets);
                this.setState({
                    getAlltickets: res.Tickets
                });
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
        console.log("Tickets --- " + f.children);

        this.state.childrenData = f.children
        console.log("Tickets size --- " + this.state.childrenData.length);
        this.setState({
            open: true,
            ticketid: e,
            issue: f.children,
            response: f.children.response,
            ticket_primary: h,
            id: f.children[this.state.childrenData.length - 1]._id,
            responseData: f.children[this.state.childrenData.length - 1].response,
            ticketUnique: i,
            editIndex: index,
            issue_object: f.children

        });
    };

    onChangeHandler = event => {

        console.log(event.target.files)
        let files = event.target.files;
        let extension;
            extension=event.target.files[0].name.slice((event.target.files[0].name.lastIndexOf(".") - 1 >>> 0) + 2);
            this.setState({
                ext: extension,
            })
            console.log("File Name : "+event.target.files[0].name+" "+extension)
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            console.log("Files --- "+e.target.result.split(',').pop())
            formData={file:e.target.result.split(',').pop()}
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
            _id: this.state.id,
            ticketid: this.state.ticket_primary,
            sresponse: this.state.newissue,
            responseData: this.state.responseData,
            file: formData,
            extension: this.state.ext,
        }
        this.state.open = false;
        this.state.getAlltickets = ''
        this.fetchTicket();
        console.log("this.state.response --- " + this.state.id);
        this.forceUpdate();
        this.props.ticketUpdate(ticketUpdate, this.props.history);
        this.resetField();
    }

    resetField = () => {
        this.setState({ newissue: '' });
    }

    // handleDownload(blob) {
    //     console.log("File name : "+blob)
    //     let url = window.URL.createObjectURL(BASE_URL+'uploads/'+blob);
    //     let a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'blob';
    //     a.click();
    // }

    // downloadFile(file) {
    //     download(BASE_URL+'uploads/'+file);
    //     console.log("PATH --- "+envirionment.BASE_URL+'uploads/'+'Bug_List.docx');
    // }

    render() {

        const { open, open1, setOpen } = this.state;

        const likePointer = { cursor: 'pointer' , color: 'blue' };
        const delPointer = { cursor: 'pointer' , color: 'red' };

        const tableHeadStyle= { fontWeight: 'bold' , fontSize: '15px' , color: 'black' }
        const tableBodyStyle= { fontSize: '12px' }

        const likePointer1 = { cursor: 'pointer', marginTop: 20, marginLeft: 10 };

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
            backgroundColor: deepPurple[500],
            width: 35,
            height: 35,
        }

        const avatar2 = {
            margin: 10,
            color: '#fff',
            backgroundColor: deepOrange[500],
            width: 35,
            height: 35,
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

        return (
            <div>

                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title" >
                    <DialogTitle id="scroll-dialog-title">Ticket Detail
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
                                            <Avatar style={avatar2} >I</Avatar>

                                            <Box display="flex" justifyContent="flex-start">

                                                <div style={styles}>
                                                    {tickets.issue}
                                                    { tickets.filename.length>0 ?
                                                    <div style={{ "color": "blue" }}>
                                                       <a href={envirionment.BASE_URL+'uploads/'+tickets.filename}>file</a>
                                                    </div>
                                                    :
                                                    ''
                                                    }

                                                </div>
                                                {/* <div>
                                                    <DownloadIcon style={likePointer1} onClick={(e) => this.downloadFile(tickets.filename)} />
                                                </div> */}


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
                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Avatar style={avatar1} >S.A</Avatar>
                                            </div>
                                            <Box display="flex" justifyContent="flex-end">

                                                <div style={styles1}>
                                                    {tickets.response}
                                                    { tickets.responsefile.length>0 ?
                                                    <div style={{ "color": "blue" }}>
                                                       <a href={envirionment.BASE_URL+'uploads/'+tickets.responsefile}>file</a>
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
                                id="newissue"
                                label="response"
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
                                onClick={this.handleSubmit} >
                                Submit
                            </Button>
                        </form>

                    </DialogContent>


                </Dialog>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={ tableHeadStyle }>Issue</TableCell>
                            <TableCell style={ tableHeadStyle }>Details</TableCell>
                            <TableCell style={ tableHeadStyle }>status</TableCell>
                            <TableCell style={ tableHeadStyle }>View</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAlltickets && this.state.getAlltickets.map((tickets, i) =>


                            <TableRow>
                                <TableCell style={ tableBodyStyle }>{tickets.children[0].issue}</TableCell>

                                <TableCell style={ tableBodyStyle }>{tickets.children[0].details}</TableCell>

                                <TableCell style={ tableBodyStyle }>{tickets.status}</TableCell>

                                <TableCell><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(tickets.ticketId, tickets, tickets.children.response, tickets._id, tickets.ticketUnique, i)} /></TableCell>


                            </TableRow>

                        )}
                    </TableBody></Table>
            </div>
        )
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { leadAdd } from './authentication';
import envirionment from '../../common/utils/envirionment';
import ViewIcon from '@material-ui/icons/Visibility';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

var PrintTemplate = require ('react-print');

var leadArray = [];
class LeadManagementView extends Component {
    constructor() {
        super();

        this.state = {
            lead_name: [],
            lead_company_name: [],
            lead_introducer: [],
            lead_address: [],
            lead_price: [],
            lead_contact_person: [],
            lead_contact_email: [],
            lead_contact_ph: [],
            next_appoint_date: [],
            appoint_date: [],
            piority: [],
            last_meeting_date: [],
            meeting_date: [],
            last_meeting_conclusion: [],
            special_note: [],
            next_followup_date: [],
            followup_date: [],
            next_followup_time: [],
            followup_time: [],
            Leads: [],
            getAllLead: [],
            open: false,
            open1: false,
        }
    }

    fetchAllLeads() {
        fetch(envirionment.BASE_URL + 'lead', {
            method: "GET",
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => res.json())
            .then(res => {
                console.log("Size --- " + res.Leads.length);
                this.setState({
                    getAllLead: res.Leads
                });
                for (let i = 0; i < res.Leads.length; i++) {
                    leadArray.push(res.Leads[i].lead_name);
                }
                console.log('array' + leadArray);
                this.setState({ Leads: leadArray })

                console.log("Plan Names --- " + this.state.getAllLead);
            })
    }
    componentDidMount() {
        this.fetchAllLeads();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleClick(leadname, leadcompanyname, leadintroducer,leadaddress,leadprice,leadcontactperson,leadcontactemail,leadcontactph,nextappointdate,piority,lastmeetingdate,lastmeetingconclusion,specialnote,nextfollowupdate,nextfollowuptime) {
        this.setState({
            open: true,
            lead_name: leadname, 
            lead_company_name: leadcompanyname, 
            lead_introducer: leadintroducer,
            lead_address: leadaddress,
            lead_price: leadprice,
            lead_contact_person: leadcontactperson,
            lead_contact_email: leadcontactemail,
            lead_contact_ph: leadcontactph,
            next_appoint_date: nextappointdate.slice(0,10),
            piority: piority,
            last_meeting_date: lastmeetingdate.slice(0,10),
            last_meeting_conclusion: lastmeetingconclusion,
            special_note: specialnote,
            next_followup_date: nextfollowupdate.slice(0,10),
            next_followup_time: nextfollowuptime.slice(11,19),
        });
        console.log("Meeting date --- "+this.state.leadname+" "+this.state.next_appoint_date);
    };

    handleDownload(leadname, leadcompanyname, leadintroducer,leadaddress,leadprice,leadcontactperson,leadcontactemail,leadcontactph,nextappointdate,piority,lastmeetingdate,lastmeetingconclusion,specialnote,nextfollowupdate,nextfollowuptime) {
        this.setState({
            open1: true,
            lead_name: leadname, 
            lead_company_name: leadcompanyname, 
            lead_introducer: leadintroducer,
            lead_address: leadaddress,
            lead_price: leadprice,
            lead_contact_person: leadcontactperson,
            lead_contact_email: leadcontactemail,
            lead_contact_ph: leadcontactph,
            next_appoint_date: nextappointdate.slice(0,10),
            piority: piority,
            last_meeting_date: lastmeetingdate.slice(0,10),
            last_meeting_conclusion: lastmeetingconclusion,
            special_note: specialnote,
            next_followup_date: nextfollowupdate.slice(0,10),
            next_followup_time: nextfollowuptime.slice(11,19),
        });
        console.log("Meeting date --- "+this.state.leadname+" "+this.state.next_appoint_date);
    };

    handlePrint = () =>
    {
        if(document.getElementById("hidebtn").style.display=='block'){
            document.getElementById("hidebtn").style.display='none'
            console.log("Block")
        }
        else{
            document.getElementById("hidebtn").style.display='block'
            console.log("Hide")
        }
        this.setState({
            open1: false,
        });
        window.print()
        
    }

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,
        });
    };

    
    render() {
        const { open,open1 } = this.state;

        const likePointer = { cursor: 'pointer' , color: 'blue' };
        const delPointer = { cursor: 'pointer' , color: 'red' };

        const tableHeadStyle= { fontWeight: 'bold' , fontSize: '15px' , color: 'black' }
        const tableBodyStyle= { fontSize: '12px' }

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
            width: 300,
            height: 50,
            marginLeft: 4,
            marginRight: 4,
            marginTop: 5,
        };

        const textfieldAmount = {
            width: 100,
            height: 40,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 2,
            marginBottom: 15,
        };


        return (
            <div>
                
                <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Lead Details</DialogTitle>
                    <DialogContent>
                        
                        <form>
                            <TextField
                                margin="dense"
                                id="lead_name"
                                label="Name"
                                name="lead_name"
                                value={this.state.lead_name}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                id="lead_company_name"
                                label="Company Name"
                                name="lead_company_name"
                                value={this.state.lead_company_name}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="lead_introducer"
                                label="Introducer"
                                id="lead_introducer"
                                value={this.state.lead_introducer}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="lead_address"
                                label="Address"
                                id="lead_address"
                                value={this.state.lead_address}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="lead_price"
                                label="Price"
                                id="lead_price"
                                value={this.state.lead_price}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="lead_contact_person"
                                label="Contact Person"
                                id="lead_contact_person"
                                value={this.state.lead_contact_person}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="lead_contact_email"
                                label="Email"
                                id="lead_contact_email"
                                value={this.state.lead_contact_email}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="lead_contact_ph"
                                label="Contact Number"
                                id="lead_contact_ph"
                                value={this.state.lead_contact_ph}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                id="next_appoint_date"
                                label="Next Appoint Date"
                                name="next_appoint_date"
                                format="dd/MM/yyyy"
                                value={this.state.next_appoint_date}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="piority"
                                label="Piority"
                                id="piority"
                                value={this.state.piority}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                label="Last Meeting Date"
                                name="last_meeting_date"
                                format="dd/MM/yyyy"
                                value={this.state.last_meeting_date}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="last_meeting_conclusion"
                                label="Last Meeting Conclusion"
                                id="last_meeting_conclusion"
                                value={this.state.last_meeting_conclusion}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="special_note"
                                label="Special Note"
                                id="special_note"
                                value={this.state.special_note}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                id="next_followup_date"
                                label="Next Followup Date"
                                name="next_followup_date"
                                format="dd/MM/yyyy"
                                value={this.state.next_followup_date}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                id="next_followup_time"
                                name="next_followup_time"
                                label="Next Followup Time"
                                value={this.state.next_followup_time}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </form>
                    </DialogContent>  
                    
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={open1} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <PrintTemplate>
                    <DialogTitle id="form-dialog-title">Lead Details</DialogTitle>
                    <DialogContent>
                        
                        <form>
                            <TextField
                                margin="dense"
                                id="lead_name"
                                label="Name"
                                name="lead_name"
                                value={this.state.lead_name}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                id="lead_company_name"
                                label="Company Name"
                                name="lead_company_name"
                                value={this.state.lead_company_name}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="lead_introducer"
                                label="Introducer"
                                id="lead_introducer"
                                value={this.state.lead_introducer}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="lead_address"
                                label="Address"
                                id="lead_address"
                                value={this.state.lead_address}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="lead_price"
                                label="Price"
                                id="lead_price"
                                value={this.state.lead_price}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="lead_contact_person"
                                label="Contact Person"
                                id="lead_contact_person"
                                value={this.state.lead_contact_person}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="lead_contact_email"
                                label="Email"
                                id="lead_contact_email"
                                value={this.state.lead_contact_email}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="lead_contact_ph"
                                label="Contact Number"
                                id="lead_contact_ph"
                                value={this.state.lead_contact_ph}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                id="next_appoint_date"
                                label="Next Appoint Date"
                                name="next_appoint_date"
                                format="dd/MM/yyyy"
                                value={this.state.next_appoint_date}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="piority"
                                label="Piority"
                                id="piority"
                                value={this.state.piority}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                label="Last Meeting Date"
                                name="last_meeting_date"
                                format="dd/MM/yyyy"
                                value={this.state.last_meeting_date}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="last_meeting_conclusion"
                                label="Last Meeting Conclusion"
                                id="last_meeting_conclusion"
                                value={this.state.last_meeting_conclusion}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                name="special_note"
                                label="Special Note"
                                id="special_note"
                                value={this.state.special_note}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                id="next_followup_date"
                                label="Next Followup Date"
                                name="next_followup_date"
                                format="dd/MM/yyyy"
                                value={this.state.next_followup_date}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                margin="dense"
                                id="next_followup_time"
                                name="next_followup_time"
                                label="Next Followup Time"
                                value={this.state.next_followup_time}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </form>
                    </DialogContent> 
                    </PrintTemplate>
                    <DialogActions>
                    <div id="hidebtn" style={{display: 'block'}}>
                    <Button style={{ fontWeight: 'bold' }} onClick={this.handlePrint} color="primary">
                            Print
                    </Button>
                    </div>
                    </DialogActions> 
                </Dialog>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={ tableHeadStyle }>Company Name</TableCell>
                            <TableCell style={ tableHeadStyle }>Introducer Name</TableCell>
                            <TableCell style={ tableHeadStyle }>Price</TableCell>
                            <TableCell style={ tableHeadStyle }>View</TableCell>
                            <TableCell style={ tableHeadStyle }>Download</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAllLead && this.state.getAllLead.map((Leads, i) =>


                            <TableRow>
                                <TableCell style={ tableBodyStyle }>{Leads.lead_company_name}</TableCell>
                                <TableCell style={ tableBodyStyle }>{Leads.lead_introducer}</TableCell>
                                <TableCell style={ tableBodyStyle }>{Leads.lead_price}</TableCell>
                                <TableCell><ViewIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(Leads.lead_name, Leads.lead_company_name, Leads.lead_introducer,Leads.lead_address,Leads.lead_price,Leads.lead_contact_person,Leads.lead_contact_email,Leads.lead_contact_ph,Leads.next_appoint_date,Leads.piority,Leads.last_meeting_date,Leads.last_meeting_conclusion,Leads.special_note,Leads.next_followup_date,Leads.next_followup_time)} /></TableCell>
                                <TableCell><DownloadIcon fontSize="small" style={likePointer} onClick={(e) => this.handleDownload(Leads.lead_name, Leads.lead_company_name, Leads.lead_introducer,Leads.lead_address,Leads.lead_price,Leads.lead_contact_person,Leads.lead_contact_email,Leads.lead_contact_ph,Leads.next_appoint_date,Leads.piority,Leads.last_meeting_date,Leads.last_meeting_conclusion,Leads.special_note,Leads.next_followup_date,Leads.next_followup_time)} /></TableCell>
                            </TableRow>

                        )}
                    </TableBody></Table>

            </div>
        )
    }
}

export default LeadManagementView

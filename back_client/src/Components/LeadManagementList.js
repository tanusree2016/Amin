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

import envirionment from '../common/utils/envirionment';
import ViewIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import 'date-fns';
import {leadDelete} from '../Components/superadmin/authentication';
import {leadEdit} from '../Components/superadmin/authentication';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

var leadArray = [];
class LeadManagementList extends Component {
    constructor(props) {
        super(props);

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
            delIndex: -1,
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAppointDateChange = this.handleAppointDateChange.bind(this);
        this.handleMeetingDateChange = this.handleMeetingDateChange.bind(this);
        this.handleFollowupDateChange = this.handleFollowupDateChange.bind(this);
        this.handleFollowupTimeChange = this.handleFollowupTimeChange.bind(this);
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

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,
            open2: false,
        });
    };

    handleClickEdit(leadname, leadcompanyname, leadintroducer,leadaddress,leadprice,leadcontactperson,leadcontactemail,leadcontactph,nextappointdate,piority,lastmeetingdate,lastmeetingconclusion,specialnote,nextfollowupdate,nextfollowuptime,lead_id,index) {
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
            next_followup_time: nextfollowuptime,
            leadId: lead_id,
            editIndex: index,
        });
    };

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    handleAppointDateChange(date) {
        this.setState({ appoint_date: date })
      }
    
      handleMeetingDateChange(date) {
        this.setState({ meeting_date: date })
      }
    
      handleFollowupDateChange(date) {
        this.setState({ followup_date: date })
      }
    
      handleFollowupTimeChange(time) {
        this.setState({ followup_time: time })
      }

    handleSubmit(e) {
        e.preventDefault();
        console.log('hghd' + this.state.price);
        const leadEdit = {

            lead_name: this.state.lead_name,
            lead_company_name: this.state.lead_company_name,
            lead_introducer: this.state.lead_introducer,
            lead_address: this.state.lead_address,
            lead_price: this.state.lead_price,
            lead_contact_person: this.state.lead_contact_person,
            lead_contact_email: this.state.lead_contact_email,
            lead_contact_ph: this.state.lead_contact_ph,
            next_appoint_date: this.state.appoint_date,
            piority: this.state.piority,
            last_meeting_date: this.state.meeting_date,
            last_meeting_conclusion: this.state.last_meeting_conclusion,
            special_note: this.state.special_note,
            next_followup_date: this.state.followup_date,
            next_followup_time: this.state.followup_time,
            leadid: this.state.leadId
        }

        this.state.getAllLead[this.state.editIndex].lead_name= this.state.lead_name
        this.state.getAllLead[this.state.editIndex].lead_company_name= this.state.lead_company_name
        this.state.getAllLead[this.state.editIndex].lead_introducer= this.state.lead_introducer
        this.state.getAllLead[this.state.editIndex].lead_address= this.state.lead_address
        this.state.getAllLead[this.state.editIndex].lead_price= this.state.lead_price
        this.state.getAllLead[this.state.editIndex].lead_contact_person= this.state.lead_contact_person
        this.state.getAllLead[this.state.editIndex].lead_contact_email= this.state.lead_contact_email
        this.state.getAllLead[this.state.editIndex].lead_contact_ph= this.state.lead_contact_ph
        this.state.getAllLead[this.state.editIndex].next_appoint_date= this.state.next_appoint_date
        this.state.getAllLead[this.state.editIndex].piority= this.state.piority
        this.state.getAllLead[this.state.editIndex].last_meeting_date= this.state.last_meeting_date
        this.state.getAllLead[this.state.editIndex].last_meeting_conclusion= this.state.last_meeting_conclusion
        this.state.getAllLead[this.state.editIndex].special_note= this.state.special_note
        this.state.getAllLead[this.state.editIndex].next_followup_date= this.state.next_followup_date
        this.state.getAllLead[this.state.editIndex].next_followup_time= this.state.next_followup_time
        this.state.getAllLead[this.state.editIndex].leadid= this.state.leadid

        this.props.leadEdit(leadEdit, this.props.history);
        //this.resetField();
        this.handleClose();
    }

    handleClickDelete(e,index) {
        this.setState({
            open2: true,
            leadid: e,
            delIndex: index,
        });
    }

    handleDelete(e){
        e.preventDefault();
        const leadDelete = {
            leadid: this.state.leadid
        }
        
        this.setState((prevState) => ({
            getAllLead: prevState.getAllLead.filter((_, i) => i !== this.state.delIndex)
          }));
 
        this.props.leadDelete(leadDelete, this.props.history);
        this.handleClose();
    }

    
    render() {
        const { open } = this.state;
        const { open1, open2 } = this.state;

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

                <Dialog
                    open={open2}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">{"Are sure , want to delete lead?"}</DialogTitle>
                    <DialogContent>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleDelete}  color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

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
                    <DialogTitle id="form-dialog-title">Edit Lead</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            
                        </DialogContentText>
                        <form>
                            <TextField
                                margin="dense"
                                id="lead_name"
                                label="Name"
                                name="lead_name"
                                value={this.state.lead_name}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <TextField
                                margin="dense"
                                id="lead_company_name"
                                label="Company Name"
                                name="lead_company_name"
                                value={this.state.lead_company_name}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <TextField
                                margin="dense"
                                name="lead_introducer"
                                label="Introducer"
                                id="lead_introducer"
                                value={this.state.lead_introducer}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <TextField
                                margin="dense"
                                name="lead_address"
                                label="Address"
                                id="lead_address"
                                value={this.state.lead_address}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <TextField
                                margin="dense"
                                name="lead_price"
                                label="Price"
                                id="lead_price"
                                value={this.state.lead_price}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <TextField
                                margin="dense"
                                name="lead_contact_person"
                                label="Contact Person"
                                id="lead_contact_person"
                                value={this.state.lead_contact_person}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <TextField
                                margin="dense"
                                name="lead_contact_email"
                                label="Email"
                                id="lead_contact_email"
                                value={this.state.lead_contact_email}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <TextField
                                margin="dense"
                                name="lead_contact_ph"
                                label="Contact Number"
                                id="lead_contact_ph"
                                value={this.state.lead_contact_ph}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker style={textfieldHeight}
                                    margin="normal"
                                    id="next_appoint_date"
                                    label="Next Appoint Date"
                                    name="next_appoint_date"
                                    format="dd/MM/yyyy"
                                    value={this.state.next_appoint_date}
                                    onChange={this.handleAppointDateChange}
                                    KeyboardButtonProps={{ 'aria-label': 'change date',}}
                                />
                            </MuiPickersUtilsProvider>
                            <TextField
                                margin="dense"
                                name="piority"
                                label="Piority"
                                id="piority"
                                value={this.state.piority}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker style={textfieldHeight}
                                    margin="normal"
                                    id="last_meeting_date"
                                    label="Last Meeting Date"
                                    name="last_meeting_date"
                                    format="dd/MM/yyyy"
                                    value={this.state.last_meeting_date}
                                    onChange={this.handleMeetingDateChange}
                                    KeyboardButtonProps={{ 'aria-label': 'change date',}}
                                />
                            </MuiPickersUtilsProvider>
                            <TextField
                                margin="dense"
                                name="last_meeting_conclusion"
                                label="Last Meeting Conclusion"
                                id="last_meeting_conclusion"
                                value={this.state.last_meeting_conclusion}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <TextField
                                margin="dense"
                                name="special_note"
                                label="Special Note"
                                id="special_note"
                                value={this.state.special_note}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker style={textfieldHeight}
                                    margin="normal"
                                    id="next_followup_date"
                                    label="Next Followup Date"
                                    name="next_followup_date"
                                    format="dd/MM/yyyy"
                                    value={this.state.next_followup_date}
                                    onChange={this.handleFollowupDateChange}
                                    KeyboardButtonProps={{ 'aria-label': 'change date',}}
                                />
                            </MuiPickersUtilsProvider>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker style={textfieldHeight}
                                    margin="normal"
                                    id="next_followup_time"
                                    label="Next Followup Time"
                                    value={this.state.next_followup_time}
                                    onChange={this.handleFollowupTimeChange}
                                    KeyboardButtonProps={{ 'aria-label': 'change time', }}
                                />
                            </MuiPickersUtilsProvider>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Introducer Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>View</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAllLead && this.state.getAllLead.map((Leads, i) =>


                            <TableRow>
                                <TableCell>{Leads.lead_company_name}</TableCell>
                                <TableCell>{Leads.lead_introducer}</TableCell>
                                <TableCell>{Leads.lead_price}</TableCell>
                                <TableCell><ViewIcon onClick={(e) => this.handleClick(Leads.lead_name, Leads.lead_company_name, Leads.lead_introducer,Leads.lead_address,Leads.lead_price,Leads.lead_contact_person,Leads.lead_contact_email,Leads.lead_contact_ph,Leads.next_appoint_date,Leads.piority,Leads.last_meeting_date,Leads.last_meeting_conclusion,Leads.special_note,Leads.next_followup_date,Leads.next_followup_time)} /></TableCell>
                                <TableCell><EditIcon onClick={(e) => this.handleClickEdit(Leads.lead_name, Leads.lead_company_name, Leads.lead_introducer,Leads.lead_address,Leads.lead_price,Leads.lead_contact_person,Leads.lead_contact_email,Leads.lead_contact_ph,Leads.next_appoint_date,Leads.piority,Leads.last_meeting_date,Leads.last_meeting_conclusion,Leads.special_note,Leads.next_followup_date,Leads.next_followup_time,Leads._id,i)} /></TableCell>
                                <TableCell><DeleteIcon onClick={(e) => this.handleClickDelete(Leads._id,i)} /></TableCell>
                            </TableRow>

                        )}
                    </TableBody></Table>

            </div>
        )
    }
}

// export default LeadManagementList

LeadManagementList.propTypes = {
    auth: PropTypes.object.isRequired,
    leadEdit: PropTypes.func.isRequired,
    leadDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { leadEdit,leadDelete })(LeadManagementList)

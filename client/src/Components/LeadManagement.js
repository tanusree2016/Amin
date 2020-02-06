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
import { leadAdd } from '../Components/superadmin/authentication';
import envirionment from '../common/utils/envirionment';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import LeadManagementList from './LeadManagementList';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


class LeadManagement extends Component {
  constructor() {
    super();

    this.state = {
        lead_name: '',
        lead_company_name: '',
        lead_introducer: '',
        lead_address: '',
        lead_price: '',
        lead_contact_person: '',
        lead_contact_email: '',
        lead_contact_ph : '',
        next_appoint_date: '',
        appoint_date: new Date(),
        piority: '',
        last_meeting_date: '',
        meeting_date: new Date(),
        last_meeting_conclusion: '',
        special_note: '',
        next_followup_date: '',
        followup_date: new Date(),
        next_followup_time: '',
        followup_time: new Date(),
        showChild : true,
    }
    this.handleAppointDateChange = this.handleAppointDateChange.bind(this);
    this.handleMeetingDateChange = this.handleMeetingDateChange.bind(this);
    this.handleFollowupDateChange = this.handleFollowupDateChange.bind(this);
    this.handleFollowupTimeChange = this.handleFollowupTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  reloadChild = () => {
    this.setState({
      showChild : false
    })
  
    setTimeout(() => {
      this.setState({
        showChild : true
      })
    },100);

    console.log("Reload Child Invoked")
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

  handleInputChangeValue(event) {
    let nam = event ? event.target.name : event;
    let val = event ? event.target.value : event;
    console.log(nam, ":", val);
    this.setState({ [nam]: val });
    }

    handleSubmit(e) {
      e.preventDefault();
      const leadAdd = {
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
      }
        
      this.props.leadAdd(leadAdd, this.props.history);
      this.resetField();
      this.reloadChild();
    }

    resetField = () => {  
      this.setState({ lead_name: ''}); 
      this.setState({ lead_company_name: ''}); 
      this.setState({ lead_introducer: ''}); 
      this.setState({ lead_address: ''}); 
      this.setState({ lead_price: ''}); 
      this.setState({ lead_contact_person: ''}); 
      this.setState({ lead_contact_email: ''}); 
      this.setState({ next_appoint_date: ''}); 
      this.setState({ appoint_date: new Date()}); 
      this.setState({ piority: ''}); 
      this.setState({ last_meeting_date: ''}); 
      this.setState({ meeting_date: new Date()}); 
      this.setState({ last_meeting_conclusion: ''}); 
      this.setState({ special_note: ''});
      this.setState({ next_followup_date: ''}); 
      this.setState({ followup_date: new Date()}); 
      this.setState({ next_followup_time: ''}); 
      this.setState({ followup_time: new Date()});
    }

            
  render() {
    const { open } = this.state;

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
      <div style={styles1}>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Modal Pop-up</DialogTitle>
          <DialogContent>
            <DialogContentText>This is an example of modal pop-up</DialogContentText>
          </DialogContent>
          
        </Dialog>
        <Typography variant="h5" gutterBottom paragraph>
          Lead Management
        </Typography>
        
        <form className="reg" noValidate>
          <div style={stylesForm}>
          <div>
          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required
            
            id="lead_name"
            label="Name"
            name="lead_name"
            value={this.state.lead_name}
            onChange={(ev) => this.handleInputChangeValue(ev)}
          />
          </div>
          <div>
          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required
            id="lead_company_name"
            label="Company Name"
            name="lead_company_name"
            value={this.state.lead_company_name}
            onChange={(ev) => this.handleInputChangeValue(ev)}
          />
          </div>
          <div>
          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required
            
            name="lead_introducer"
            label="Introducer"
            id="lead_introducer"
            value={this.state.lead_introducer}
            onChange={(ev) => this.handleInputChangeValue(ev)}
          />
          </div>
          <div>
          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required
            
            name="lead_address"
            label="Address"
            id="lead_address"
            value={this.state.lead_address}
            onChange={(ev) => this.handleInputChangeValue(ev)}
          />
          </div>
          <div>
          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required
            
            name="lead_price"
            label="Price"
            id="lead_price"
            value={this.state.lead_price}
            onChange={(ev) => this.handleInputChangeValue(ev)}
          />
          </div>
          <div>
          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required
            
            name="lead_contact_person"
            label="Contact Person"
            id="lead_contact_person"
            value={this.state.leadlead_contact_person}
            onChange={(ev) => this.handleInputChangeValue(ev)}
          />
          </div>
          <div>
          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required
            
            name="lead_contact_email"
            label="Email"
            type="email"
            id="lead_contact_email"
            value={this.state.lead_contact_email}
            onChange={(ev) => this.handleInputChangeValue(ev)}
          />
          </div>
          <div>
          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required
            
            name="lead_contact_ph"
            label="Contact Number"
            id="lead_contact_ph"
            value={this.state.lead_contact_ph}
            onChange={(ev) => this.handleInputChangeValue(ev)}
          />
          </div>
          <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker style={textfieldHeight}
              margin="normal"
              id="next_appoint_date"
              label="Next Appoint Date"
              name="next_appoint_date"
              format="dd/MM/yyyy"
              value={this.state.appoint_date}
              onChange={this.handleAppointDateChange}
             KeyboardButtonProps={{ 'aria-label': 'change date',}}
            />
          </MuiPickersUtilsProvider>
          </div>
          <div>
          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required
            
            name="piority"
            label="Piority"
            id="piority"
            value={this.state.piority}
            onChange={(ev) => this.handleInputChangeValue(ev)}
          />
          </div>
          <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker style={textfieldHeight}
              margin="normal"
              id="last_meeting_date"
              label="Last Meeting Date"
              name="last_meeting_date"
              format="dd/MM/yyyy"
              value={this.state.meeting_date}
              onChange={this.handleMeetingDateChange}
             KeyboardButtonProps={{ 'aria-label': 'change date',}}
            />
          </MuiPickersUtilsProvider>
          </div>
          <div>
          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required
            
            name="last_meeting_conclusion"
            label="Last Meeting Conclusion"
            id="last_meeting_conclusion"
            value={this.state.last_meeting_conclusion}
            onChange={(ev) => this.handleInputChangeValue(ev)}
          />
          </div>
          <div>
          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required
            
            name="special_note"
            label="Special Note"
            id="special_note"
            value={this.state.special_note}
            onChange={(ev) => this.handleInputChangeValue(ev)}
          />
          </div> 
          <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker style={textfieldHeight}
              margin="normal"
              id="next_followup_date"
              label="Next Followup Date"
              name="next_followup_date"
              format="dd/MM/yyyy"
              value={this.state.followup_date}
              onChange={this.handleFollowupDateChange}
             KeyboardButtonProps={{ 'aria-label': 'change date',}}
            />
          </MuiPickersUtilsProvider>
          </div>
          <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker style={textfieldHeight}
              margin="normal"
              id="next_followup_time"
              label="Next Followup Time"
              value={this.state.followup_time}
              onChange={this.handleFollowupTimeChange}
              KeyboardButtonProps={{ 'aria-label': 'change time', }}
            />
          </MuiPickersUtilsProvider>
          </div>
        </div>
          <Button style={stylesBotton}
            type="submit"
            variant="contained"
            color="primary"
            //className={classes.submit}
            onClick={this.handleSubmit}>
            Submit
          </Button>
        </form>
        <br/><br/>
        {this.state.showChild?
        <LeadManagementList reloadChild={this.reloadChild}/> : null 
        }
      </div>
    );
  }
}
 
LeadManagement.propTypes = {
  classes: PropTypes.object.isRequired,
  leadAdd: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
 
//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { leadAdd })(LeadManagement)

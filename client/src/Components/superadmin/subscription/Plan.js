import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { planCreateApis } from './subscriptionApi';
import DateFnsUtils from "@date-io/date-fns"; // import
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import PlanList from './PlanList';
import base_url from '../../../common/utils/axios';
import swal from 'sweetalert';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


mobiscroll.settings = {
  theme: 'ios',
}


class Plan extends Component {

  constructor() {
    super();
    this.state = {
      open: false,
      plan_name: '',
      discount: '',
      showChild: true,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  reloadChild = () => {
    this.setState({
      showChild: false
    })

    setTimeout(() => {
      this.setState({
        showChild: true
      })
    }, 100);
    console.log("Reload Child Invoked")
  }

  handleInputChangeValue(event) {
    let nam = event ? event.target.name : event;
    let val = event ? event.target.value : event;
    console.log(nam, ":", val);
    this.setState({ [nam]: val });
  }

  showAlert(text) {
    mobiscroll.alert({
      message: text,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.name == '') {
      this.showAlert('Please fill name')
    }
    else {
      const planCreateApi = {
        name: this.state.plan_name,
        discount: this.state.discount,
      }
      this.forceUpdate();

      base_url.post('plan-create', planCreateApi, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
        .then(res => {
          this.resetField();
          console.log(res.data.value);
          console.log(res.data.message);
          if (res.data.value == 1) {
            //swal("Plan is added successfully");
            let success = "Plan is added successfully"
            this.showAlert(success);
          }
          else
            //swal(res.data.message);
            this.showAlert(res.data.message);

          this.resetField();
          this.reloadChild();
        })
        .catch(e => console.log(e))
    }
  }

  resetField = () => {
    this.setState({ plan_name: '' });
    this.setState({ discount: '' });
  }

  render() {
    const { open } = this.state;

    const styles1 = {
      textAlign: 'center',
      paddingTop: '2',
    };

    const textfieldHeight = {
      width: 300,
      height: 50,
      marginLeft: 2,
      marginRight: 2,
      marginTop: 2,
    };

    const formControl = {
      minWidth: 300,
    };

    return (
      <div style={styles1}>

        <Typography variant="h5" gutterBottom paragraph>
          Add Plan
            </Typography>
        <form className="reg" onSubmit={this.handleSubmit}>

          <div style={{ paddingLeft: '5px', paddingRight: '5px', marginBottom: '10px' }}>
            <FormControl style={formControl}>
              <InputLabel htmlFor="plan_name">Plan Name</InputLabel>                               <Select
                value={this.state.plan_name}
                onChange={(ev) => this.handleInputChangeValue(ev)}
                inputProps={{
                  name: 'plan_name',
                  id: 'plan_name',
                }}
              >
                <MenuItem value={"Monthly"}>Monthly</MenuItem>
                <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
                <MenuItem value={"HalfYearly"}>Half Yearly</MenuItem>
                <MenuItem value={"Yearly"}>Yearly</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <TextField style={textfieldHeight}
              variant="outlined"
              margin="dense"
              required="true"
              inputProps={{ "padding-top": '0', "padding-bottom": '0' }}
              id="discount"
              label="Discount"
              name="discount"
              type="number"
              value={this.state.discount}
              onChange={(ev) => this.handleInputChangeValue(ev)}
            />
          </div>


          <Button
            type="submit"
            variant="contained"
            color="primary"
          //className={classes.submit}
          // onClick={this.handleSubmit}
          >
            Submit
              </Button>
        </form>
        <br />
        {this.state.showChild ?
          <PlanList reloadChild={this.reloadChild} /> : null
        }
      </div>
    )
  }
}


Plan.propTypes = {
  classes: PropTypes.object.isRequired,
  //planCreateApis: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Plan)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { subscriptionApis } from './subscriptionApi';
import DateFnsUtils from "@date-io/date-fns"; // import
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import SubscriptionList from './SubscriptionLIst';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import swal from 'sweetalert';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import base_url from '../../../common/utils/axios';

mobiscroll.settings = {
  theme: 'ios',
}

function showAlert(text) {
  mobiscroll.alert({
    message: text,

  });
}
var formData = null;
class Subscription extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      planName: '',
      price: '',
      duedate: new Date(),
      showChild: true,
      selectedFile: null,
      ext: '',

    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  handleChange(e) {
    console.log('hiii')
    console.log(e);
    this.setState({
      duedate: e
    });
  };


  handleSubmit(e) {
    e.preventDefault();

    if (this.state.planName == '') {
      showAlert('Please fill all required feilds')
    }
    else {
      const subscriptionApi = {
        planName: this.state.planName,
        price: this.state.price,
        file: formData,
        extension: this.state.ext,
        //duedate: this.state.duedate,
      }
      this.forceUpdate();
      //this.props.subscriptionApis(subscriptionApi, this.props.history);

      base_url.post('subscription', subscriptionApi, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
        .then(res => {
          console.log(res.data.value);
          console.log(res.data.message);
          if (res.data.value == 1){
            showAlert("Module is added successfully");
            this.reloadChild();
          }
          else
            showAlert(res.data.message);
        })
        .catch(err => {
          
        });

      this.resetField();
    }



  }

  resetField = () => {
    this.setState({ planName: '' });
    this.setState({ price: '' });
    this.setState({ duedate: new Date() });
    this.setState({ file: new Date() });
    this.fileInput.value = "";
  }



  render() {

    const { open } = this.state;

    const styles1 = {
      textAlign: 'center',
      paddingTop: '2',
    };

    const styles2 = {
      marginLeft: 454,
      paddingTop: '2',
    };

    const textfieldHeight = {
      width: 300,
      height: 50,
      marginLeft: 2,
      marginRight: 2,
      marginTop: 2,
    };

    return (
      <div>

        <Typography variant="h5" gutterBottom paragraph style={styles2}>
          Add New Module Details
        </Typography>


        <form className="reg" onSubmit={this.handleSubmit} encType="multipart/form-data">
          <div style={styles2}>
            <TextField style={textfieldHeight}
              variant="outlined"
              margin="dense"
              id="companyname"
              required="true"
              label="Name"
              name="planName"
              value={this.state.planName}
              onChange={(ev) => this.handleInputChangeValue(ev)}
              autoFocus
            />
          </div>
          <div style={styles2}>
            <TextField style={textfieldHeight}
              variant="outlined"
              margin="dense"
              required
              type="number"
              inputProps={{ "padding-top": '0', "padding-bottom": '0' }}
              id="price"
              label="Price"
              name="price"
              value={this.state.price}
              onChange={(ev) => this.handleInputChangeValue(ev)}
            /><label style={{ marginTop: "500px" }}>(Monthly &nbsp;{"\u20B9"})</label>

          </div>

          <div style={styles2} id='2'>

            <input type="file" name="file" onChange={this.onChangeHandler} ref={ref=> this.fileInput = ref} />


          </div>
          <br />
          <br />



          {/* <div>

            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <DatePicker style={textfieldHeight}
              variant="outlined" 
              margin="dense"
              value={this.state.duedate}
              dateFormat="Y-m-d"
              selected={this.state.duedate}
             // onChange={this.handleChange}
              onChange={(ev) => this.handleChange(ev)}
              required
              />
            </MuiPickersUtilsProvider>

          </div> */}
          <div style={styles2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            //className={classes.submit}
            // onClick={this.handleSubmit} 
            >
              Submit
          </Button>
          </div>
        </form>
        <br />

        {this.state.showChild ?
          <SubscriptionList reloadChild={this.reloadChild} /> : null
        }
      </div>

    )

  }

}

Subscription.propTypes = {
  classes: PropTypes.object.isRequired,
  subscriptionApis: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { subscriptionApis })(Subscription)
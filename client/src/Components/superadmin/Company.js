import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { companyReg } from './authentication';
import envirionment from '../../common/utils/envirionment';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import swal from 'sweetalert';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import base_url from '../../common/utils/axios';
import CompanyList from './CompanyList'

mobiscroll.settings = {
  theme: 'ios',
}

function showAlert(text) {
  mobiscroll.alert({
    message: text,

  });
}

var planArray = [];
class Company extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      companyname: '',
      email: '',
      password: '',
      subscription: '',
      subscriptionDetail: '',
      getAllPlan: [],
      getAllDiscount: [],
      options: [],
      primaryId: [],
      amount: 0,
      discountedamount: 0,
      discount: 0,
      selectedPackage: '',
      packageDiscount: 0,
      showChild: true,
      plan_duration: 0,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectSubId = this.selectSubId.bind(this);
  }

  fetchAllPlans() {
    fetch(envirionment.BASE_URL + 'subscription', {
      data: 'planName',
      data: 'price',
      data: 'subscriptionId',
      method: "GET",
      headers: { 'x-access-token': localStorage.getItem('token') }
    }).then(res => res.json())
      .then(res => {
        console.log("Size --- " + JSON.stringify(res));
        this.setState({
          getAllPlan: res.subscription
        });
      })

    this.forceUpdate();
  }

  fetchAllDiscount() {
    fetch(envirionment.BASE_URL + 'plan', {
      data: 'name',
      data: 'discount',
      method: "GET",
      headers: { 'x-access-token': localStorage.getItem('token') }
    }).then(res => res.json())
      .then(res => {
        console.log("Size ---Discount " + res.plans.length);
        this.setState({
          getAllDiscount: res.plans
        });
      })

    console.log("Discount --- " + this.state.getAllDiscount)
    this.forceUpdate();
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/');
    // }
    this.fetchAllPlans();
    this.fetchAllDiscount();
  }


  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };


  handleInputChangeValue(event) {
    let nam = event ? event.target.name : event;
    let val = event ? event.target.value : event;
    console.log(nam, ":", val);
    this.setState({ [nam]: val });
  }

  checkEmail(event) {
    const validEmail = {
      email: this.state.email,
    }
    base_url.post('user-check', validEmail, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
      .then(res => {
        console.log(res.data.value);
        console.log(res.data.message);
        if (res.data.value == 1) {
          //swal("Plan is added successfully");
          // let success = "Plan is added successfully"
          // this.showAlert(success);
        }
        else{
          showAlert(res.data.message);
          this.setState({ email: '' });
        }
      })
      .catch(e => console.log(e))
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


handleSubmit(e) {
  e.preventDefault();
  if (this.state.companyname == '' || this.state.email == '' || this.state.password == '') {
    showAlert('Please Fill required feilds')
  }
  else if (this.state.options == '') {
    showAlert('Please select options')
  }
  else if (this.state.packageDiscount == '') {
    showAlert('Please select plan')
  }
  else {

    let totpay;
    totpay = (this.state.discountedamount).toFixed();
    let subid;
    let subdet;
    subid = this.state.options
    subdet = this.state.primaryId
    const companyReg = {

      companyname: this.state.companyname,
      email: this.state.email,
      password: this.state.password,
      subscription: subid,
      subscriptionDetail: subdet,
      totpay: totpay,
      plan_duration: this.state.plan_duration,

    }
    console.log("Total Pay --- " + totpay)
    //this.props.companyReg(companyReg, this.props.history);

    base_url.post('company', companyReg, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
      .then(res => {
        this.resetField();
        console.log(res.data.value);
        console.log(res.data.message);
        if (res.data.value == 1){
          //swal("Plan is added successfully");
          let success="Company registraion is successfull"
          showAlert(success);
        }
        else
          //swal(res.data.message);
          showAlert(res.data.message);

        this.resetField();
        this.reloadChild();
      })
      .catch(e => console.log(e))
  }
}

resetField = () => {
  this.setState({ companyname: '' });
  this.setState({ email: '' });
  this.setState({ password: '' });
  this.setState({ subscription: '' });
  this.setState({ discountedamount: 0 });
}

selectPackId(pakname, discount, e) {
  this.state.selectedPackage = pakname;
  this.state.packageDiscount = discount;

  console.log("Length --- " + this.state.selectedPackage.length);
  if (e.target.checked) {
    if (this.state.selectedPackage === "Quarterly"){
      this.setState({ discountedamount: (this.state.amount * 3) - ((parseInt(this.state.amount * 3) * parseInt(discount)) / 100) });
      this.setState({ plan_duration: 90 });
    }
    else if (this.state.selectedPackage === "Yearly"){
      this.setState({ discountedamount: (this.state.amount * 12) - (parseInt(this.state.amount * 12) * parseInt(discount)) / 100 });
      this.setState({ plan_duration: 365 });
    }
    else if (this.state.selectedPackage === "Monthly"){
      this.setState({ discountedamount: this.state.amount - (parseInt(this.state.amount) * parseInt(discount)) / 100 });
      this.setState({ plan_duration: 30 });
    }
    else if (this.state.selectedPackage === "HalfYearly"){
      this.setState({ discountedamount: (this.state.amount * 6) - (parseInt(this.state.amount * 6) * parseInt(discount)) / 100 });
      this.setState({ plan_duration: 180 });
    }

  } else {

    this.setState({ discountedamount: this.state.amount });
  }

  console.log("Selected value : " + this.state.options + " " + this.state.discountedamount);
}

selectSubId(subid , price , pid , e) {
  let index,indexid

  // check if the check box is checked or unchecked
  if (e.target.checked) {
    // add the numerical value of the checkbox to options array
    this.state.options.push(+e.target.value)
    this.state.primaryId.push(pid)
    console.log("Primary ID --- "+this.state.primaryId)
    this.state.amount = parseInt(this.state.amount) + parseInt(price);
  } else {
    // or remove the value from the unchecked checkbox from the array
    index = this.state.options.indexOf(+e.target.value)
    indexid = this.state.primaryId.indexOf(pid)
    this.state.options.splice(index, 1)
    this.state.primaryId.splice(indexid, 1)
    this.state.amount = parseInt(this.state.amount) - parseInt(price);
  }
  // update the state with the new array of options
  this.setState({ options: this.state.options })
  this.setState({ primaryId: this.state.primaryId })

  console.log("Selected value : " + this.state.options + " " + this.state.amount);

  console.log("Selected Package Name : " + this.state.selectedPackage);
  if (this.state.selectedPackage === "Quarterly") {
    this.state.discountedamount = (this.state.amount * 3) - (parseInt(this.state.amount * 3) * parseInt(this.state.packageDiscount)) / 100;
    //this.setState({ discountedamount: (this.state.amount*3)-(parseInt(this.state.amount*3)*parseInt(this.state.packageDiscount))/100 });
    this.setState({ plan_duration: 90 });
  }
  else if (this.state.selectedPackage === "Yearly") {
    this.state.discountedamount = (this.state.amount * 12) - (parseInt(this.state.amount * 12) * parseInt(this.state.packageDiscount)) / 100;
    //this.setState({ discountedamount: (this.state.amount*12)-(parseInt(this.state.amount*12)*parseInt(this.state.packageDiscount))/100 });
    this.setState({ plan_duration: 365 });
  }
  else if (this.state.selectedPackage === "Monthly") {
    this.state.discountedamount = this.state.amount - (parseInt(this.state.amount) * parseInt(this.state.packageDiscount)) / 100;
    //this.setState({ discountedamount: this.state.amount-(parseInt(this.state.amount)*parseInt(this.state.packageDiscount))/100 });       
    this.setState({ plan_duration: 30 });
  }
  else if (this.state.selectedPackage === "HalfYearly") {
    this.state.discountedamount = (this.state.amount * 6) - (parseInt(this.state.amount * 6) * parseInt(this.state.packageDiscount)) / 100;
    //this.setState({ discountedamount: (this.state.amount*3)-(parseInt(this.state.amount*3)*parseInt(this.state.packageDiscount))/100 });
    this.setState({ plan_duration: 180 });
  }
  console.log("this.state.discountedamount : " + this.state.discountedamount);
}

render() {
  const { open } = this.state;

  const styles1 = {
    textAlign: 'center',
    paddingTop: '2',
  };

  const stylesMargin = {
    marginTop: 3
  };

  const textfieldHeight = {
    width: 300,
    height: 50,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
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
        Company Registration
        </Typography>

      <form className="reg" onSubmit={this.handleSubmit}>
        <div>

          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required

            id="companyname"
            label="Name"
            name="companyname"
            value={this.state.companyname}
            onChange={(ev) => this.handleInputChangeValue(ev)}
          />
        
          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required
            inputProps={{ "padding-top": '0', "padding-bottom": '0' }}
            id="email"
            type="email"
            label="Email Address"
            name="email"
            value={this.state.email}
            onChange={(ev) => this.handleInputChangeValue(ev)}
            onBlur={(ev) => this.checkEmail(ev)}
          />
        
          <TextField style={textfieldHeight}
            variant="outlined"
            margin="dense"
            required

            name="password"
            value={this.state.password}
            label="Password"
            type="password"
            id="password"
            onChange={(ev) => this.handleInputChangeValue(ev)}
          />
        </div>
        <div>

        </div>
        <div style={{ border: '2px solid blue', display: 'flex', flexWrap: 'wrap', padding: "2px" }}>
          {this.state.getAllPlan.map((plan, i) =>
            <FormControlLabel style={stylesMargin}
              control={
                <Checkbox
                  value={plan.subscriptionId}
                  color="primary"
                  onChange={(e) => this.selectSubId(plan.subscriptionId, plan.price, plan._id, e)}
                />
              }
              label={plan.planName + "(Monthly : \u20B9" + plan.price + " )"}
            />
          )}

        </div>

        <div style={{ border: '2px solid blue', display: 'flex', flexWrap: 'wrap', padding: "2px" , marginTop: "5px"}}>

          <FormControl component="fieldset" style={stylesMargin}>

            <RadioGroup aria-label="plan" name="plan" row>
              {this.state.getAllDiscount.map((plan, i) =>
                <FormControlLabel
                  control={
                    <Radio color="primary"
                      value={plan.name}
                      onChange={(e) => this.selectPackId(plan.name, plan.discount, e)}
                    />
                  }
                  label={plan.name + " ( " + plan.discount + "% Discount)"} />
              )}
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <TextField style={textfieldAmount}
            label="Amount:"
            value={"\u20B9" + (this.state.discountedamount).toFixed()}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>

        <Button style={stylesMargin}
          type="submit"
          variant="contained"
          color="primary"
        //className={classes.submit}
        //onClick={this.handleSubmit} 
        >
          Submit
          </Button>
      </form>
      <br />
      {this.state.showChild ?
          <CompanyList reloadChild={this.reloadChild} /> : null
        }
    </div>
  );
}
}

Company.propTypes = {
  classes: PropTypes.object.isRequired,
  companyReg: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { companyReg })(Company)

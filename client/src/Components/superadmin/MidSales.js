import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import envirionment from '../../common/utils/envirionment';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import MidSaleList from './MidSaleList';
import base_url from '../../common/utils/axios';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';


var compNameArray = [];
var compIdArray = [];

mobiscroll.settings = {
  theme: 'ios',
}

class MidSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // menuName: '',
      // subMenu: '',
      showChild: true,
      // moduleId: '',
      // getAllModule: [],
      customer: '',
      description: '',
      companyid: '',
      companyName: '',
      getAllCompany: []

    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchCompany() {
    fetch(envirionment.BASE_URL + 'company', {
      method: "GET",
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then(res => res.json())
      .then(res => {
        this.setState({
          getAllCompany: res.company
        });

        for (let i = 0; i < res.company.length; i++) {
          compNameArray.push(res.company[i].companyName);
          compIdArray.push(res.company[i].companyId);
        }
      })
  }

  componentDidMount() {
    console.log("Child calling ------ ");
    this.fetchCompany();
  }

  reloadChild = () => {
    console.log("Child call --- ");
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

  showAlert (text) {
    mobiscroll.alert({
        message: text,
        
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.state.companyName == '' || this.state.companyName == null ){
      this.showAlert('Please select company')
    }
    else{

    const addMidSale = {

      customer: this.state.companyName,
      description: this.state.description,
    }
    console.log("Customer --- " + this.state.customer)
    this.forceUpdate();

    base_url.post('midsale-add', addMidSale, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
      .then(res => {
        this.resetField();
        console.log(res.data.value);
        console.log(res.data.message);
        if (res.data.value == 1){
          //swal("MidSale is added successfully");
          let success="MidSale is added successfully"
          this.showAlert(success);
        }
          
        else
          //swal(res.data.message);
          this.showAlert(res.data.message);
        this.reloadChild();
      })
      .catch(e => console.log(e))
  }
  }

  resetField = () => {
    this.setState({ companyName: '' });
    this.setState({ description: '' });
  }


  //   handlerfordata=(data)=>{
  //     console.log('Inside handlerfordata data is');
  //     this.state.subMenu=data
  //     console.log("My Data --- "+this.state.subMenu);
  // }

  handleInputChangeValueDept(event) {
    let nam = event ? event.target.name : event;
    let val = event ? event.target.value : event;
    console.log(nam, "::", val);
    this.setState({ [nam]: val });
  }

  render() {
    const styles1 = {
      textAlign: 'center',
      paddingTop: '2',
    };

    const textfieldHeight = {
      width: 500,
      height: 150,
      marginLeft: 2,
      marginRight: 2,
      marginTop: 2,
      resize: 'none',
    };

    const formControl = {
      minWidth: 300,
    };

    return (
      <div style={styles1}>


        <form className="reg" onSubmit={this.handleSubmit}>
          <div style={{ paddingBottom: '20px' }}>
            <FormControl style={formControl}>
              <InputLabel htmlFor="companyName">Company Name</InputLabel>
              <Select
              required="true"
                value={this.state.companyName}
                onChange={(ev) => this.handleInputChangeValueDept(ev)}
                inputProps={{
                  name: 'companyName',
                  id: 'companyName',
                }}
              >
                {this.state.getAllCompany.map(module => (
                  <MenuItem value={module._id}>{module.companyName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div >
            <textarea style={textfieldHeight}
              variant="outlined"
              margin="normal"
              required="true"
              id="description"
              placeholder="Discription"
              multiline
              name="description"
              value={this.state.description}
              onChange={(ev) => this.handleInputChangeValue(ev)}
            />

            {/* <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
         
          margin="normal"
          variant="outlined"
          name="textarea"
          onChange={(ev) => this.handleInputChangeValue(ev)}
        /> */}

          </div>
          <br />


          <Button
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
          <MidSaleList reloadChild={this.reloadChild} /> : null
        }
      </div>
    )
  }
}

MidSales.propTypes = {
  classes: PropTypes.object.isRequired,
  //addMidSale: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(MidSales)
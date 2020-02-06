import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuList from './MenuList';
import { addMenu } from '../authentication';
import AddSubMenu1 from './AddSubMenu1'
import Checkbox from '@material-ui/core/Checkbox';
import envirionment from '../../../common/utils/envirionment';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import swal from 'sweetalert';

var desigNameArray = [];
var desigIdArray = [];
class MenuAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuName: '',
      subMenu: '',
      showChild: true,
      moduleId: '',
      checked: false,
      getAllModule: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchmodule() {
    fetch(envirionment.BASE_URL + 'subscription', {
      method: "GET",
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then(res => res.json())
      .then(res => {
        this.setState({
          getAllModule: res.subscription
        });

        for (let i = 0; i < res.subscription.length; i++) {
          desigNameArray.push(res.subscription[i].planName);
          desigIdArray.push(res.subscription[i].subscriptionId);
        }
      })
  }

  componentDidMount() {
    console.log("Child calling ------ ");
    this.fetchmodule();
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

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.moduleId == '') {
      swal('Please select module')
    }
    else if (this.state.menuName == '') {
      swal('Please Enter menuname.')
    }
    else {
      const addMenu = {
        moduleId: this.state.moduleId,
        menuName: this.state.menuName,
        subMenu: this.state.subMenu,
      }
      console.log("Dep Id --- " + JSON.stringify(this.state.subMenu))
      this.forceUpdate();
      this.props.addMenu(addMenu, this.props.history);
      this.resetField();
      document.getElementById('11112').style.display = "none"
      this.child.method()
      this.reloadChild();
    }
  }

  resetField = () => {
    if (this.state.checked)
      this.setState({ checked: !this.state.checked })
    this.setState({ menuName: '' });
    this.setState({ subMenu: '' });
    this.setState({ moduleId: '' })
  }

  handleChange = (e, id) => {
    this.setState({ checked: !this.state.checked })
    id = id + 1
    if (document.getElementById(id).style.display == "none") {
      document.getElementById(id).style.display = "block";
    }
    else {
      document.getElementById(id).style.display = "none";
    }

  }

  handlerfordata = (data) => {
    console.log('Inside handlerfordata data is'+data);
    this.state.subMenu = data
    console.log("My Data --- " + JSON.stringify(this.state.subMenu));
  }

  handleInputChangeValueDept(event) {
    let nam = event ? event.target.name : event;
    let val = event ? event.target.value : event;
    console.log(nam, "::", val);
    this.setState({ [nam]: val });
    for (let i = 0; i < this.state.getAllModule.length; i++) {
      console.log("JSON.stringify(desigNameArray.pop(i) --- " + i + " " + JSON.stringify(desigNameArray.pop(i)) + " " + val)
    }
  }

  render() {
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
        <div id="11111"></div>
        <Typography variant="h5" gutterBottom paragraph>
          Add Menu
            </Typography>
        <form className="reg" onSubmit={this.handleSubmit}>
          <div style={{ paddingBottom: '20px' }}>
            <FormControl style={formControl}>
              <InputLabel htmlFor="moduleId">Deparment</InputLabel>
              <Select
                value={this.state.moduleId}
                onChange={(ev) => this.handleInputChangeValueDept(ev)}
                inputProps={{
                  name: 'moduleId',
                  id: 'moduleId',
                }}
              >
                {this.state.getAllModule.map(module => (
                  <MenuItem value={module.subscriptionId}>{module.planName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div style={{ paddingLeft: '35px' }}>
            <TextField style={textfieldHeight}
              variant="outlined"
              margin="dense"
              required
              id="menuName"
              label="Menu Name"
              name="menuName"
              value={this.state.menuName}
              onChange={(ev) => this.handleInputChangeValue(ev)}
            />
            <Checkbox
              checked={this.state.checked}
              onChange={(e) => this.handleChange(e, 11111)}
              value="checkedB"
              color="primary"
              inputProps={{
                'aria-label': 'secondary checkbox',
              }}
            />
          </div>
          <br />
          <div id="11112" style={{ display: "none" }}>
            <AddSubMenu1 handlerfordata={this.handlerfordata} onRef={ref => (this.child = ref)} />
          </div><br /><br />

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
          <MenuList reloadChild={this.reloadChild} /> : null
        }
      </div>
    )
  }
}

MenuAdd.propTypes = {
  classes: PropTypes.object.isRequired,
  addMenu: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addMenu })(MenuAdd)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { addMenu } from '../authentication';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import envirionment from '../../../common/utils/envirionment';
import passvalue from '../../../common/utils/passvalue';


var planArray = [];

class AddSubMenu2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submenu: [],
      showChild: true,
      submenus: [{ menuname: "" }],
      inputValues: {},
      dispStatus: false,
    }
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("Child calling ------ ");
    this.fetchAllMenu();
  }

  fetchAllMenu() {
    console.log("Calling --- ");
    fetch(envirionment.BASE_URL + 'menu-list', {
        method: "GET",
        headers: { 'x-access-token': localStorage.getItem('token') }
    }).then(res => res.json())
        .then(res => {
            console.log("Size --- " + res.MenuList.length);
            this.setState({
                getAllPlan: res.MenuList[passvalue.menuIndex].children
            });
            console.log("All Menus --- "+JSON.stringify(res.MenuList[0].children))
            console.log("Menu Index --- "+passvalue.menuIndex)
            for (let i = 0; i < res.MenuList[passvalue.menuIndex].children.length; i++) {
                planArray.push(res.MenuList[passvalue.menuIndex].children[i].label);
                this.state.submenus.push({ menuname: res.MenuList[passvalue.menuIndex].children[i].label }) 
            }
            this.state.dispStatus=true
            console.log('array' + planArray);
            this.setState({ plans: planArray })

            console.log("Plan Names --- " + this.state.getAllPlan);
        })
    console.log("Calling --- End ---  ");
    this.forceUpdate();
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


  addClick() {
    this.setState(prevState => ({
      submenus: [...prevState.submenus, { menuname: "" }]
    }))
  }

  createUI() {
    return this.state.submenus.map((el, i) => (
      <div key={i} >
        { this.state.dispStatus && i>0 ?
        <div style={{ paddingLeft: '35px' }}>
          <TextField
            variant="outlined"
            margin="dense"
            required
            name="menuname"
            value={el.menuname || ''}
            label="Sub Menu Name"

            onChange={this.handleInputChangeValue.bind(this, i)}
            onBlur={(ev) => this.handleAddValue(ev)}
            autoFocus />
          
          <IconButton aria-label="delete" color="secondary" onClick={this.removeClick.bind(this, i)}>
            <DeleteIcon />
          </IconButton>
        </div>
         :
         ''
         }
      </div>
    ))
  }

  removeClick(i) {
    let values = [...this.state.submenus];
    values.splice(i, 1);
    console.log("Del Menu Before --- "+i+" --- "+JSON.stringify(values))
    this.setState({ submenus: values });
    this.state.submenus=values
    console.log("Del Menu --- "+i+" --- "+JSON.stringify(this.state.submenus))
    this.props.handlerfordata(this.state.submenus);
  }


  handleInputChangeValue(i,e) {
    const { name, value } = e.target;
     let submenus = [...this.state.submenus];
     submenus[i] = {...submenus[i], [name]: value};
     this.setState({ submenus });
  }


  handleAddValue(event) {

    // this.state.inputValues = event.target.value;
    // if(!this.state.inputValues=="")
    //   this.state.submenu.push(this.state.inputValues)

    this.props.handlerfordata(this.state.submenus);
  }


  resetField = () => {
    this.setState({ subMenu: '' });
  }


  render() {
    const { name, onChange } = this.props;
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
    return (
      <form className="reg" noValidate style={{ styles1 }}>
        <Typography variant="h5" gutterBottom paragraph>
          Submenu &nbsp;
          <Fab color="primary" size="small" aria-label="add" onClick={this.addClick.bind(this)} >
            <AddIcon />
          </Fab>
        </Typography>
        {/* {this.existingMenuUI()} */}
        {this.createUI()}
      </form>
    )
  }
}

AddSubMenu2.propTypes = {
  classes: PropTypes.object.isRequired,
  addMenu: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addMenu })(AddSubMenu2)

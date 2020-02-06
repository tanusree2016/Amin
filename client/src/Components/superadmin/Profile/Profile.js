import React, { Component } from 'react'
import './Profile.css'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { profileUpdate } from '../authentication';
import base_url from '../../../common/utils/axios'
import EditIcon from '@material-ui/icons/Edit';
import swal from 'sweetalert';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';



mobiscroll.settings = {
  theme: 'ios',
}

var formData = null;
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      // imagePreviewUrl: localStorage.getItem('profilepic'),
      username: localStorage.getItem('userName'),
      contact: localStorage.getItem('contact'),
      ext: '',
      showChild: true,
      disabled: true,
      disabled1: true
    };

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

  showAlert (text) {
    mobiscroll.alert({
        message: text,
        
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData()
    data.append('file', this.state.file)

    const profileApi = {
      username: this.state.username,
      contact: this.state.contact,
      file: formData,
      extension: this.state.ext,
      superid: localStorage.getItem('id'),
      profImg: localStorage.getItem('profilepic'),
    }
    console.log('handle uploading-', profileApi);

    base_url.post('superadmin/account/', profileApi, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })
      .then(res => {
        console.log('sa--' + res.data.value);
        console.log('me---' + JSON.stringify(res.data.superadmins));
        if (res.data.value == 1) {
          localStorage.setItem('userName', res.data.superadmins.userName);
          localStorage.setItem('contact', res.data.superadmins.contact);
          localStorage.setItem('profilepic', res.data.superadmins.profile);
          this.resetField();
          let success="Profile is updated successfully"
          this.showAlert(success);
          //swal("Profile is updated successfully");
          this.forceUpdate();
          this.setState({ disabled: true })
          this.setState({ disabled1: true })
        }
        else {
          //swal(res.data.message);
          this.showAlert(res.data.message);
        }
        this.reloadChild();
      })
      .catch(e => console.log(e))
  }

  handleInputChangeValue(event) {
    let nam = event ? event.target.name : event;
    let val = event ? event.target.value : event;
    console.log(nam, ":", val);
    this.setState({ [nam]: val });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    let extension;
    extension = e.target.files[0].name.slice((e.target.files[0].name.lastIndexOf(".") - 1 >>> 0) + 2);
    this.setState({
      ext: extension,
    })

    reader.onloadend = (e) => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });

      console.log("Files --- " + e.target.result)
      formData={file:e.target.result.split(',').pop()}
    }

    reader.readAsDataURL(file)

  }
  handleGameClik() {
    this.setState({ disabled: !this.state.disabled })
  }

  handleGameClik1() {
    this.setState({ disabled1: !this.state.disabled1 })
  }
  resetField = () => {
    this.setState({ username: localStorage.getItem('userName') });
    this.setState({ contact: localStorage.getItem('contact') });
  }

  render() {

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    //let $urlimg ='http://localhost:5000/uploads/profile/'+localStorage.getItem('profilepic');
    if (localStorage.getItem('profilepic') != null) {
      console.log('ur here');
      let img = 'http://localhost:5000/uploads/profile/' + localStorage.getItem('profilepic');
      $imagePreview = (<img src={img} style={{ width: "190px", height: "190px", borderRadius: "100px" }} />);
      if (imagePreviewUrl) {
        console.log('ur here if else');
        $imagePreview = (<img src={imagePreviewUrl} style={{ width: "190px", height: "190px", borderRadius: "100px" }} />);
      }
    }
    else if (imagePreviewUrl) {
      console.log('ur here if else');
      $imagePreview = (<img src={imagePreviewUrl} style={{ width: "190px", height: "190px", borderRadius: "100px" }} />);
    } else {
      console.log('ur here else');
      $imagePreview = (<div className="previewText" style={{ width: "190px", height: "190px", borderRadius: "100px", padding: "20px" }}>Please select an Image for Preview</div>);
    }

    // let imagePreviewUrl  = this.state;
    // let $imagePreview = null;
    // let $urlimg ='http://localhost:5000/uploads/profile/'+localStorage.getItem('profilepic');


    // console.log('image priview'+$urlimg);
    // if (imagePreviewUrl) {
    //     $imagePreview = (<img src= {$urlimg}   style={{ width: "170px", height: "190px", borderRadius: "100px" }} />);
    // } else {
    //     $imagePreview = (<div className="previewText" style={{ width: "190px", height: "190px", borderRadius: "100px", padding: "20px" }}>Please select an Image for Preview</div>);
    // }

    const textfieldHeight = {
      width: 300,
      height: 50,
      marginLeft: 2,
      marginRight: 2,
      marginTop: 2,
    };


    const styles1 = {
      textAlign: 'center',
      paddingTop: '2',
    };
    const likePointer = { cursor: 'pointer' };
    return (
      <div className="previewComponent">
        <div className="imgPreview">
          {$imagePreview}
          
        </div>
        <form encType="multipart/form-data">
          <input className="fileInput"
            type="file"
            onChange={(e) => this._handleImageChange(e)} style={{ width: "200px" }} />

          <div>
            <TextField style={textfieldHeight}
              variant="outlined"
              margin="dense"
              required
              disabled={(this.state.disabled) ? "disabled" : ""}
              id="username"
              label="User Name"
              name="username"
              value={this.state.username}
              onChange={(ev) => this.handleInputChangeValue(ev)}
              autoFocus
            />

            <a onClick={this.handleGameClik.bind(this)}> <EditIcon style={likePointer} /> </a>
          </div>

          <div>
            <TextField style={textfieldHeight}
              variant="outlined"
              margin="dense"
              required
              disabled={(this.state.disabled1) ? "disabled" : ""}
              id="contact"
              label="Contact Number"
              name="contact"
              value={this.state.contact}
              onChange={(ev) => this.handleInputChangeValue(ev)}
              autoFocus
            />
            <a onClick={this.handleGameClik1.bind(this)}> <EditIcon style={likePointer} /> </a>
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            //className={classes.submit}
            onClick={this.handleSubmit} >
            Submit
                        </Button>
        </form>

      </div>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  //profileUpdate: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Profile)




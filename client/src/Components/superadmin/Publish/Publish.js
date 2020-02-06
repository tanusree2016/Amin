import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PublishList from './PublishList';
import base_url from '../../../common/utils/axios';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';



mobiscroll.settings = {
  theme: 'ios',
}

class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChild: true,
      description: '',

    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  componentDidMount() {
    console.log("Child calling ------ ");

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

  showAlert (text) {
    mobiscroll.alert({
        message: text,
        
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const addPublish = {

      description: this.state.description,
    }

    this.forceUpdate();
    base_url.post('publish-add', addPublish, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    })
      .then(res => {
        this.resetField();
        console.log(res.data.value);
        console.log(res.data.message);
        if (res.data.value == 1){
          //swal("Broadcast is publish successfully");
          let success="Broadcast is publish successfully"
          this.showAlert(success);
        }
        else
          //swal(res.data.message);
          this.showAlert(res.data.message);

        this.reloadChild();
      })
      .catch(e => console.log(e))
  }

  resetField = () => {

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

        <Typography variant="h5" gutterBottom paragraph>
          Publish Broadcast
        </Typography>
        <form className="reg" onSubmit={this.handleSubmit}>

          <div >
            <textarea style={textfieldHeight}
              variant="outlined"
              margin="normal"
              required
              id="description"
              placeholder="Discription"
              multiline
              name="description"
              value={this.state.description}
              onChange={(ev) => this.handleInputChangeValue(ev)}
            />



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
          <PublishList reloadChild={this.reloadChild} /> : null
        }
      </div>
    )
  }
}

Publish.propTypes = {
  classes: PropTypes.object.isRequired,
  //addPublish: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Publish)
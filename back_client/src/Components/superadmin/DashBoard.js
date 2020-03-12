import React, { Component } from 'react';
import { Provider } from "react-redux";
import PrimarySearchAppBar from '../../Material_UI/superadminUI/PrimarySearchAppBar'
import Login from './Login'
import axios from 'axios';

import store from "../../store";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../setAuthToken";
import { setCurrentUser, logoutUser } from "./authentication"
import Link from '@material-ui/core/Link';


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

let redirect=false;
class DashBoard extends Component {
  // initialize our state
  state = {
      id: localStorage.getItem('id')
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    
    if(this.state.id==null){
      console.log("check")
      redirect=false
    }
    else
    {
      console.log("Ok")
      redirect=true
    }
    
    return (
      <Provider store={store}>
      <div>
      { redirect
        ? <PrimarySearchAppBar/>
        : <Link href='/login/superadmin'>Yor are Logged Out. Login First</Link>
      }
        {/* <PrimarySearchAppBar/> */}
      </div>
      </Provider>
    );
  }
}

export default DashBoard;
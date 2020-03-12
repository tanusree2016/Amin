import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "../store";
import jwt_decode from "jwt-decode";
import setAuthToken from "../setAuthToken";
import { setCurrentUser, logoutUser } from "../Components/superadmin/authentication"
import Login from '../Components/superadmin/Login';
import CompanyLogin from '../Components/admin/CompanyLogin';
import {BrowserRouter,Route} from 'react-router-dom';
import DashBoard from '../Components/superadmin/DashBoard'
import AdminDashBoard from '../Components/admin/Dashboard'
import QuotationSubmit from '../Components/user/Vendor/QuotationSubmit'
import ApprovePO from '../Components/user/Vendor/ApprovePO'


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

class LoginPage extends Component {
  // initialize our state
  state = {
    
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    
    return (
      <BrowserRouter>
      <Provider store={store}>
          
      <div>
        <Route exact path="/" component={CompanyLogin} />
        <Route path="/rfq-submit" component={QuotationSubmit} />
        <Route path="/approve-po" component={ApprovePO} />
        <Route path="/dashboard" component={AdminDashBoard} />
        <Route path="/ticket-history" component={CompanyLogin} />
        <Route path="/login/superadmin" component={Login} />
        <Route exact path="/superadmin/dashboard" component={DashBoard} />
      </div>
      
      </Provider>
      </BrowserRouter>
      
    );
  }
}

export default LoginPage;
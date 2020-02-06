import React from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from '../types';
import setAuthToken from '../../setAuthToken';
import jwt_decode from 'jwt-decode';
import base_url from '../../common/utils/axios';
import swal from 'sweetalert';
import { useAlert } from 'react-alert'
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import { minTime } from 'date-fns';

mobiscroll.settings = {
    theme: 'ios',
}

function showAlert (text) {
    mobiscroll.alert({
        message: text,
        
    });
}

export const companyReg = (companyReg, history) => dispatch => {
    //user.countrycode='';

    base_url.post('company', companyReg, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1){
            //swal("Company registraion is successfull");
                let success="Company registraion is successfull"
                showAlert(success);
            }
            else
                showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const changeStatus = (changeStatus, history) => dispatch => {
    //user.countrycode='';

    base_url.post('company-activate', changeStatus, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1){
            //swal("Company registraion is successfull");
                //let success="Company registraion is successfull"
                showAlert(res.data.message);
            }
            else
                showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const changePass = (changePass, history) => dispatch => {
    //user.countrycode='';

    base_url.post('superadmin/changepassword', changePass, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1){
                //swal("Password is updated successfully");
                let success="Password is updated successfully"
                showAlert(success);
            }
            else
            //swal(res.data.message);
            showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}


export const leadAdd = (leadAdd, history) => dispatch => {
    //user.countrycode='';

    base_url.post('lead', leadAdd, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1){
                //swal("Lead is added successfully");
                let success="Lead is added successfully"
                showAlert(success);
            }
            else
            //swal(res.data.message);
                showAlert(res.data.message)
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const leadDelete = (leadDelete, history) => dispatch => {

    console.log("localStorage.getItem('token')"+localStorage.getItem('token'));
 
     base_url.post('lead/' + leadDelete.leadid, leadDelete , {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
     .then(res => {
         console.log(res.data.value);
         console.log(res.data.message);
         if (res.data.value == 1){
            //swal("Lead is deleted successfully");
            let success="Lead is added successfully"
            showAlert(success);
         }
         
         else
         //swal(res.data.message);
            showAlert(res.data.message)
     })
     .catch(err => {
         dispatch({
             type: GET_ERRORS,
             payload: err.response.data
         });
     });
 }

 export const leadEdit = (leadEdit, history) => dispatch => {

    console.log("localStorage.getItem('token')"+localStorage.getItem('token'));
 
     base_url.put('lead/' + leadEdit.leadid, leadEdit , {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
     .then(res => {
         console.log(res.data.value);
         console.log(res.data.message);
         if (res.data.value == 1){
            //swal("Lead is edited successfully");
            let success="Lead is edited successfully"
            showAlert(success);
         }
         else
         //swal(res.data.message);
            showAlert(res.data.message);
     })
     .catch(err => {
         dispatch({
             type: GET_ERRORS,
             payload: err.response.data
         });
     });
 }

export const loginSuperAdmin = (loginSuperAdmin, history) => dispatch => {
    base_url.post('superadmin', loginSuperAdmin)
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.token);
            if (res.data.value == 1) {
                setAuthToken(res.data.token);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.user.role);
                localStorage.setItem('userName', res.data.user.userName);
                localStorage.setItem('contact', res.data.user.contact);
                localStorage.setItem('id', res.data.user._id);
                localStorage.setItem('email', res.data.user.email);
                localStorage.setItem('profilepic', res.data.user.profile);
                console.log("Role --- "+res.data.user.role)
                console.log("username --- "+res.data.user.userName)
                console.log("Contact --- "+res.data.user.contact)
                //swal("Login Successfull");
                let success="Login Successfull"
                showAlert(success);
                history.push('/superadmin/dashboard')
            }
            else
            //swal(res.data.message);
            showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: ((err || {}).response || {}).data || 'Error unexpected'
            });
        });
    
}


export const loginCompany = (loginCompany, history) => dispatch => {
    base_url.post('login', loginCompany)
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.token);
            if (res.data.value == 1) {
                setAuthToken(res.data.token);
                localStorage.setItem('token', res.data.token);
                //swal("Login Successfully");
                let success="Login Successfull"
                showAlert(success);
                history.push('/aa')
            }
            else
            //swal(res.data.message);
                showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: ((err || {}).response || {}).data || 'Error unexpected'
            });
        });
}



export const MenuDelete = (MenuDelete, history) => dispatch => {

    console.log("localStorage.getItem('token')"+localStorage.getItem('token'));
 
     base_url.post('menus/' + MenuDelete.menuId, MenuDelete , {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
     .then(res => {
         console.log(res.data.value);
         console.log(res.data.message);
         if (res.data.value == 1){
            //swal("Menu is Deleted successfully");
            let success="Menu is Deleted successfully"
            showAlert(success);
         }
         
         else
         //swal(res.data.message);
            showAlert(res.data.message);
     })
     .catch(err => {
         dispatch({
             type: GET_ERRORS,
             payload: err.response.data
         });
     });
 }

 
 export const addMenu = (addMenu, history) => dispatch => {
    //user.countrycode='';

    base_url.post('menu-add', addMenu, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1){
                //swal("Menu is Added Successfully");
                let success="Menu is Added Successfully"
                showAlert(success);
            }
            
            else
            //swal(res.data.message);
                showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}
 
export const menuEdit = (menuEdit, history) => dispatch => {
    //user.countrycode='';

    base_url.post('menus', menuEdit, {

        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1){
                //swal("Menu is updated successfully");
                let success="Menu is updated successfully"
                showAlert(success);
            }
            else
            //swal(res.data.message);
            showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const ticketUpdate = (ticketUpdate, history) => dispatch => {
    console.log('ticketUpdate---'+JSON.stringify(ticketUpdate));
    base_url.post('ticket-response/', ticketUpdate, {
        headers: {
            'x-access-token': localStorage.getItem('token'),
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1){
                //swal("Ticket is updated successfully");
                let success="Ticket is updated successfully"
                showAlert(success);
            }
            
            else
            //swal(res.data.message);
            showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const addMidSale = (addMidSale, history) => dispatch => {
    //user.countrycode='';

    base_url.post('midsale-add', addMidSale, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1){
                //swal("MidSale is added successfully");
                let success="MidSale is added successfully"
                showAlert(success);
            }
            else
            //swal(res.data.message);
                showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const profileUpdate = (profileUpdate, history) => dispatch => {
    console.log('profileUpdate---'+JSON.stringify(profileUpdate));

    base_url.post('superadmin/account/', profileUpdate, {
        headers: {
            'x-access-token': localStorage.getItem('token'),
        }
    })
        .then(res => {
            console.log('sa--'+res.data.value);
            console.log('me---'+JSON.stringify(res.data.superadmins));
            if (res.data.value == 1){
                localStorage.setItem('userName', res.data.superadmins.userName);
                localStorage.setItem('contact', res.data.superadmins.contact);
                localStorage.setItem('profilepic', res.data.superadmins.profile);
                //swal("Profile is updated successfully");
                let success="Profile is updated successfully"
                showAlert(success);
            }
            else{
                //swal(res.data.message);
                showAlert(res.data.message);
            }
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}



export const addPublish = (addPublish, history) => dispatch => {
    //user.countrycode='';

    base_url.post('publish-add', addPublish, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1){
                //swal("Broadcast is publish successfully");
                let success="Broadcast is publish successfully"
                showAlert(success);
            }
            else
            //swal(res.data.message);
                showAlert(res.data.message);

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

import React from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from '../types';
import setAuthToken from '../../setAuthToken';
import jwt_decode from 'jwt-decode';
import base_url from '../../common/utils/axios';
import swal from 'sweetalert';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';


mobiscroll.settings = {
    theme: 'ios',
}

function showAlert (text) {
    mobiscroll.alert({
        message: text,
        
    });
}

export const loginCompany = (loginCompany, history) => dispatch => {
    base_url.post('admin/login', loginCompany)
        .then(res => {
            console.log("DATA --- "+JSON.stringify(res.data));
            console.log("VALUE --- "+res.data.value);
            console.log("TOKEN --- "+res.data.token);

            console.log('menu--'+JSON.stringify(res.data))
            if (res.data.value == 1) {
                 setAuthToken(res.data.token);
                 localStorage.setItem('token', res.data.token);
                // console.log("token"+res.data.token)
                // localStorage.setItem('email', res.data.email);
                // console.log("email"+res.data.email)
                // localStorage.setItem('name', res.data.name);
                // console.log("name"+res.data.name)
                // localStorage.setItem('dbname', res.data.db);
                // console.log("db"+res.data.db)
                // localStorage.setItem('subscription', res.data.subscription);
                // console.log("subscription"+res.data.subscription)
                // localStorage.setItem('subscription_detail', JSON.stringify(res.data.subscriptionDetail));
                // console.log("subscription_detail"+res.data.subscription_detail)
                // localStorage.setItem('companyid', res.data.companyid);
                // console.log("companyid"+res.data.companyid)
                // localStorage.setItem('companyName', res.data.companyName);
                // console.log("companyName"+res.data.companyName)
                // localStorage.setItem('contact', res.data.contact);
                // console.log("contact"+res.data.contact)
                // localStorage.setItem('profilepic', res.data.profile);
                // console.log("profilepic"+res.data.profile)
                // localStorage.setItem('id', res.data.primaryid);
                // console.log("primaryid"+res.data.primaryid);
                // localStorage.setItem('emp_id', res.data.emp_id);
                // console.log("emp_id"+res.data.emp_id);
                // localStorage.setItem("menu", JSON.stringify(res.data.menu));
                // console.log("menu"+JSON.stringify(res.data.menu))
                // localStorage.setItem('role', res.data.role);
                // console.log("role"+res.data.role)
                // localStorage.setItem('conf_per', res.data.conf_per);
                // console.log("conf_per"+res.data.conf_per)
                // localStorage.setItem('type', res.data.type);
                // console.log("type"+res.data.type)
                // localStorage.setItem('department', res.data.department);
                // console.log("department"+res.data.department)
                showAlert("Login successfull");
                history.push('/dashboard')
            }
            else
            showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: ((err || {}).response || {}).data || 'Error unexpected'
            });
        });
}

export const userAdd = (userAdd, history) => dispatch => {
    //user.countrycode='';

    base_url.post('add-employee', userAdd, {
        headers: {
            'x-access-token': localStorage.getItem('token'),
            'x-access-db': localStorage.getItem('dbname'),
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
            showAlert("New user has been added successfully");
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

export const userDelete = (userDelete, history) => dispatch => {
    //user.countrycode='';

    base_url.post('user-delete', userDelete, {
        headers: {
            'x-access-db': localStorage.getItem('dbname'),
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
            showAlert(res.data.message);
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


export const designationAdd = (designationAdd, history) => dispatch => {
    //user.countrycode='';

    base_url.post('designation', designationAdd, {
        headers: {
            'x-access-token': localStorage.getItem('token'),
            'x-access-db': localStorage.getItem('dbname'),
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
            showAlert("Desination is added successfully");
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

export const editDesignation  = (designationAdd, history) => dispatch => {
   console.log('des edit module mod id'+designationAdd.moduleId);
   console.log('des edit module name'+designationAdd.modulename);
   console.log('des edit module desig'+designationAdd.designation);
   console.log('des edit module id'+designationAdd.designid);

   var editId = designationAdd.designid

   base_url.put('designation/'+editId, designationAdd, {
    headers: {
        'x-access-token': localStorage.getItem('token'),
        'x-access-db': localStorage.getItem('dbname'),
    }
})
    .then(res => {
        console.log(res.data.value);
        console.log(res.data.message);
        if (res.data.value == 1)
        showAlert("Designation is edited successfully");
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

export const designationDelete  = (designationdel, history) => dispatch => {
    console.log('des----'+designationdel)
    var delId = designationdel.desigid

   base_url.post('designation/'+delId, designationdel, {
    headers: {
        'x-access-token': localStorage.getItem('token'),
        'x-access-db': localStorage.getItem('dbname'),
    }
})
    .then(res => {
        console.log(res.data.value);
        console.log(res.data.message);
        if (res.data.value == 1)
        showAlert("Designation is deleted successfully");
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

export const ticketAdd = (ticketAdd, history) => dispatch => {
    console.log('ticketAdd---'+ticketAdd);
    base_url.post('ticket', ticketAdd, {
        headers: {
            'x-access-token': localStorage.getItem('token'),
            'x-access-db': localStorage.getItem('dbname'),
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
            showAlert("Ticket is added successfully");
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

export const ticketUpdate = (ticketUpdate, history) => dispatch => {
    console.log('ticketUpdate---'+JSON.stringify(ticketUpdate));
    base_url.put('ticket/'+ticketUpdate.ticket_primary, ticketUpdate, {
        headers: {
            'x-access-token': localStorage.getItem('token'),
            'x-access-db': localStorage.getItem('dbname'),
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
            showAlert("Ticket is updated successfully");
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

    base_url.post('admin-changepass', changePass, {
        headers: {
            'x-access-token': localStorage.getItem('token'),
            'x-access-db': localStorage.getItem('dbname'),
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

export const userEdit  = (userEdit, history) => dispatch => {
    base_url.post('user-edit', userEdit, {
        headers: {
            'x-access-token': localStorage.getItem('token'),
            'x-access-db': localStorage.getItem('dbname'),
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
            showAlert("User is edited successfully");
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

export const requisitionDelete  = (requisitionDelete, history) => dispatch => {
    console.log('des----'+JSON.stringify(requisitionDelete))
    var delId = requisitionDelete.requesitionid

   base_url.post('requisition-delete', {
    headers: {
        'x-access-db': localStorage.getItem('dbname'),
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ requesitionid: delId })
})
    .then(res => {
        console.log(res.data.value);
        console.log(res.data.message);
        if (res.data.value == 1)
        showAlert("Requisition is deleted successfully");
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


export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

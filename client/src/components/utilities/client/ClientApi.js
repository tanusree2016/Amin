
import { GET_ERRORS, CREATE_NEW_CLIENT,EDIT_CLIENT,DELETE_CLIENT } from '../../actions/types';

import axios from 'axios';

import base_url from '../../../common/utils/axios';
import swal from 'sweetalert';



//Client Api
export const addClient = (addClient, history) => dispatch => {
    //user.countrycode='';

    base_url.post('clients/create-client', addClient)
        .then(res => {

            if (res.data.value == 1)
                //alert("Appointment Added Successfully");
                swal("Client  Added Successfully", {
                    icon: "success",
                });
            else
                //alert(res.data.message);
                swal(res.data.message, {
                    icon: "success",
                });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const editClient = (editClient, history) => dispatch => {
    //user.countrycode='';

    base_url.post('clients/update-client', editClient)
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
                //alert("Appointment Deleted Successfully");
                swal("Client Updated Successfully", {
                    icon: "success",
                });
            else
                //alert(res.data.message);
                swal(res.data.message, {
                    icon: "success",
                });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const deleteClient = (deleteClient, history) => dispatch => {
    //user.countrycode='';

    base_url.post('clients/delete-client', deleteClient)
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
                //alert("Appointment Edited Successfully");
                swal("Task Deleted Successfully", {
                    icon: "success",
                });
            else
                //alert(res.data.message);
                swal(res.data.message, {
                    icon: "success",
                });

        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

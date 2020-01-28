
import { GET_ERRORS,ADD_APPOINTMENT,EDIT_APPOINTMENT,DELETE_APPOINTMENT} from '../../actions/types';

import axios from 'axios';

import base_url from '../../../common/utils/axios';
import swal from 'sweetalert';

 export const addAppointment = (addAppointment, history) => dispatch => {
    //user.countrycode='';
    
        base_url.post('appointment/create-appointment', addAppointment)
        .then(res => {
            console.log("Value is ------"+res.data.value);
            console.log("Message is-----"+res.data.message);
            if(res.data.value==1)
                //alert("Appointment Added Successfully");
                swal("Appointment  Added Successfully", {
                    icon: "success",
                });
             else
               // alert(res.data.message);
                      
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

    export const editAppointment = (editAppointment, history) => dispatch => {
        //user.countrycode='';
        
            base_url.post('appointment/appointment-update', editAppointment)
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if(res.data.value==1)
                    //alert("Appointment Edited Successfully");
                    swal("Appointment  Edited Successfully", {
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

        export const deleteAppointment = (deleteAppointment, history) => dispatch => {
            //user.countrycode='';
            
                base_url.post('appointment/delete-appointment', deleteAppointment)
                .then(res => {
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if(res.data.value==1)
                        //alert("Appointment Edited Successfully");
                        swal("Appointment  Deleted Successfully", {
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
        
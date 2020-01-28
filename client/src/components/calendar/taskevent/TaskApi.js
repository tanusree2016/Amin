
import { GET_ERRORS,ADD_TASK,EDIT_TASK,DELETE_TASK} from '../../actions/types';

import axios from 'axios';

import base_url from '../../../common/utils/axios';

import swal from 'sweetalert';

 export const addTask = (addTask, history) => dispatch => {
    //user.countrycode='';
    
        base_url.post('task/create-task', addTask)
        .then(res => {
            console.log("Value is ------"+res.data.value);
            console.log("Message is-----"+res.data.message);
            if(res.data.value==1)
                //alert("Appointment Added Successfully");
                swal("Task  Added Successfully", {
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

    export const editTask = (editTask, history) => dispatch => {
        //user.countrycode='';
        
            base_url.post('task/task-update', editTask)
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if(res.data.value==1)
                    //alert("Appointment Deleted Successfully");
                    swal("Task Updated Successfully", {
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

        export const deleteTask = (deleteTask, history) => dispatch => {
            //user.countrycode='';
            
                base_url.post('task/delete-task', deleteTask)
                .then(res => {
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if(res.data.value==1)
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
        
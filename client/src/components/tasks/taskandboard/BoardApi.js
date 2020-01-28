
import { GET_ERRORS,ADD_BOARD,EDIT_BOARD,DELETE_BOARD} from '../../actions/types';

import axios from 'axios';

import base_url from '../../../common/utils/axios';
import swal from 'sweetalert';

 export const addBoard = (addBoard, history) => dispatch => {
    //user.countrycode='';
    
        base_url.post('board/create-board', addBoard)
        .then(res => {
            console.log("Value is ------"+res.data.value);
            console.log("Message is-----"+res.data.message);
            if(res.data.value==1)
                //alert("Source Added Successfully");
                swal("Board Added Successfully", {
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

    export const editBoard = (editBoard, history) => dispatch => {
        //user.countrycode='';
        
            base_url.post('board/edit-board', editBoard)
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if(res.data.value==1)
                    //alert("Source Edited Successfully");
                    swal("Board Edited Successfully", {
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

        export const deleteBoard = (deleteBoard, history) => dispatch => {
            //user.countrycode='';
            
                base_url.post('board/delete-board', deleteBoard)
                .then(res => {
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if(res.data.value==1)
                        //alert("Source Deleted Successfully");
                        swal("Board Deleted Successfully", {
                            icon: "success",
                        });
                     else
                        //alert(res.data.message);
                        swal({
                            title: "Hold up, wait a minute.",
                            text: "Are you sure you want to delete this source on all its respective jobs? This cannot be undone.",
                            textAlign: "center",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                            .then((willDelete) => {
                                if (willDelete) {
                                    swal(res.data.message, {
                                        icon: "success",
                                    });
                                }
                            });
                    })
                    .catch(err => {
                        dispatch({
                            type: GET_ERRORS,
                            payload: err.response.data
                        });
                    });
            }
        
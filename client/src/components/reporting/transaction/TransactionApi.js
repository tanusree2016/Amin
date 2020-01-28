
import { GET_ERRORS,ADD_TRANSACTION,EDIT_TRANSACTION,DELETE_TRANSACTION} from '../../actions/types';

import axios from 'axios';

import base_url from '../../../common/utils/axios';
import swal from 'sweetalert';

 export const addTransaction = (addTransaction, history) => dispatch => {
    //user.countrycode='';
    
        base_url.post('transaction/create-transaction', addTransaction)
        .then(res => {
            console.log("Value is ------"+res.data.value);
            console.log("Message is-----"+res.data.message);
            if(res.data.value==1)
                //alert("Source Added Successfully");
                swal("Transaction Added Successfully", {
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

    export const editTransaction = (editTransaction, history) => dispatch => {
        //user.countrycode='';
        
            base_url.post('board/edit-board', editTransaction)
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if(res.data.value==1)
                    //alert("Source Edited Successfully");
                    swal("Transaction Edited Successfully", {
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

        export const deleteTransaction = (deleteTransaction, history) => dispatch => {
            //user.countrycode='';
            
                base_url.post('board/delete-board', deleteTransaction)
                .then(res => {
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if(res.data.value==1)
                        //alert("Source Deleted Successfully");
                        swal("Transaction Deleted Successfully", {
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
        
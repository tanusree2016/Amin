
import { GET_ERRORS,ADD_DISCOUNT,EDIT_DISCOUNT,DELETE_DISCOUNT} from '../../actions/types';

import axios from 'axios';

import base_url from '../../../common/utils/axios';
import swal from 'sweetalert';

 export const addDiscount = (addDiscount, history) => dispatch => {
    //user.countrycode='';
    
        base_url.post('discounts/create-discount', addDiscount)
        .then(res => {
            console.log("Value is ------"+res.data.value);
            console.log("Message is-----"+res.data.message);
            if(res.data.value==1)
                //alert("Source Added Successfully");
                swal("Discount Added Successfully", {
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

    export const editDiscount = (editDiscount, history) => dispatch => {
        //user.countrycode='';
        
            base_url.post('discounts/edit-discount', editDiscount)
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if(res.data.value==1)
                    //alert("Source Edited Successfully");
                    swal("Disconut Edited Successfully", {
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

        export const deleteDiscount = (deleteDiscount, history) => dispatch => {
            //user.countrycode='';
            
                base_url.post('discounts/delete-discount', deleteDiscount)
                .then(res => {
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if(res.data.value==1)
                        //alert("Source Deleted Successfully");
                        swal("Discount Deleted Successfully", {
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
        
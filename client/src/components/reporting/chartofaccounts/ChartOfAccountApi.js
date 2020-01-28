
import { GET_ERRORS,ADD_INC_EXP,EDIT_INC_EXP,DELETE_INC_EXP} from '../../actions/types';

import axios from 'axios';

import base_url from '../../../common/utils/axios';
import swal from 'sweetalert';

 export const addIncome = (addIncome, history) => dispatch => {
    //user.countrycode='';
    
        base_url.post('chartofacc/create-income', addIncome)
        .then(res => {
            console.log("Value is ------"+res.data.value);
            console.log("Message is-----"+res.data.message);
            if(res.data.value==1)
                //alert("Source Added Successfully");
                swal("Income Added Successfully", {
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

    export const editIncome = (editIncome, history) => dispatch => {
        //user.countrycode='';
        
            base_url.post('chartofacc/update-income', editIncome)
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if(res.data.value==1)
                    //alert("Source Edited Successfully");
                    swal("Income Edited Successfully", {
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

        export const deleteIncome = (deleteIncome, history) => dispatch => {
            //user.countrycode='';
            
                base_url.post('chartofacc/delete-income', deleteIncome)
                .then(res => {
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if(res.data.value==1)
                        //alert("Source Deleted Successfully");
                        swal("Income Deleted Successfully", {
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
        
// Expense Api

            export const addExpense = (addExpense, history) => dispatch => {
                //user.countrycode='';
                
                    base_url.post('chartofacc/create-expense', addExpense)
                    .then(res => {
                        console.log("Value is ------"+res.data.value);
                        console.log("Message is-----"+res.data.message);
                        if(res.data.value==1)
                            //alert("Source Added Successfully");
                            swal("Expense Added Successfully", {
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
            
                export const editExpense = (editExpense, history) => dispatch => {
                    //user.countrycode='';
                    
                        base_url.post('chartofacc/update-expense', editExpense)
                        .then(res => {
                            console.log(res.data.value);
                            console.log(res.data.message);
                            if(res.data.value==1)
                                //alert("Source Edited Successfully");
                                swal("Expense Edited Successfully", {
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
            
                    export const deleteExpense = (deletExpense, history) => dispatch => {
                        //user.countrycode='';
                        
                            base_url.post('chartofacc/delete-expense', deletExpense)
                            .then(res => {
                                console.log(res.data.value);
                                console.log(res.data.message);
                                if(res.data.value==1)
                                    //alert("Source Deleted Successfully");
                                    swal("Expense Deleted Successfully", {
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
                    
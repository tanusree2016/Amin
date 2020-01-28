
import { GET_ERRORS,ADD_SOURCE,EDIT_SOURCE,DELETE_SOURCE} from '../../actions/types';

import axios from 'axios';

import base_url from '../../../common/utils/axios';
import swal from 'sweetalert';

 export const addSource = (addSource, history) => dispatch => {
    //user.countrycode='';
    
        base_url.post('project-source/create-sources', addSource)
        .then(res => {
            console.log("Value is ------"+res.data.value);
            console.log("Message is-----"+res.data.message);
            if(res.data.value==1)
                //alert("Source Added Successfully");
                swal("Source Added Successfully", {
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

    export const editSource = (editSource, history) => dispatch => {
        //user.countrycode='';
        
            base_url.post('project-source/edit-source', editSource)
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if(res.data.value==1)
                    //alert("Source Edited Successfully");
                    swal("Source Edited Successfully", {
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

        export const deleteSource = (deleteSource, history) => dispatch => {
            //user.countrycode='';
            
                base_url.post('project-source/delete-source', deleteSource)
                .then(res => {
                    console.log(res.data.value);
                    console.log(res.data.message);
                    if(res.data.value==1)
                        //alert("Source Deleted Successfully");
                        swal("Source Deleted Successfully", {
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
        
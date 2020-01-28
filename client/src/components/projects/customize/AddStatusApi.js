
import { GET_ERRORS, ADD_STATUS } from '../../actions/types';

import axios from 'axios';

import base_url from '../../../common/utils/axios';
import swal from 'sweetalert';

export const addStatus = (addStatus, history) => dispatch => {
    //user.countrycode='';

    base_url.post('customize/add-status', addStatus)
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
                //alert("Status Added Successfully");
                swal("Status Added Successfully", {
                    icon: "success",
                });
            else
               // alert(res.data.message);


          
                        swal(res.data.message, {
                            icon: "success",
                        });
                
        
        })
        .catch (err => {
    dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    });
});
}

// export const setCurrentUser = decoded => {
//     return {
//         type: SET_CURRENT_USER,
//         payload: decoded
//     }
// }

export const statusDelete = (statusDelete, history) => dispatch => {


    base_url.post('customize/delete-status', statusDelete)
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
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
                            swal("Status Deleted successfully", {
                                icon: "success",
                            });
                        }
                    });
            //alert("Status Deleted successfully");
            else
               // alert(res.data.message);

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
                    })
            
            })
        
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}



export const statusEdit = (statusEdit, history) => dispatch => {


    base_url.post('customize/edit-status', statusEdit)
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
               // alert("Tag Edited successfully");
                swal("Status Edited successfully", {
                    icon: "success",
                });
            else
                
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


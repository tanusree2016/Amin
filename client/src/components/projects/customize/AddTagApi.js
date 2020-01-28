
import { GET_ERRORS,ADD_TAG} from '../../actions/types';

import axios from 'axios';

import base_url from '../../../common/utils/axios';
import swal from 'sweetalert';

 export const addTag = (addTag, history) => dispatch => {
    //user.countrycode='';
    
        base_url.post('customize/add-tag', addTag)
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if(res.data.value==1)
                //alert("Tag Added Successfully");
                swal("Tag  Added Successfully", {
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


    export const tagDelete = ( tagDelete,history) => dispatch => {

     
         base_url.post('customize/delete-tag' ,tagDelete)
         .then(res => {
             console.log(res.data.value);
             console.log(res.data.message);
             if (res.data.value == 1)
                 //alert("Tag Deleted successfully");
                 swal("Tag Deleted Successfully", {
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
     


     export const tagEdit = (tagEdit, history) => dispatch => {

    
        base_url.post('customize/edit-tag' ,tagEdit)
            .then(res => {
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1)
                   // alert("Tag Edited successfully");
                    swal("Tag Edited successfully", {
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
    












    // export const setCurrentUser = decoded => {
    //     return {
    //         type: SET_CURRENT_USER,
    //         payload: decoded
    //     }
    // }
    
    // export const tagEdit = (tagEdit, history) => dispatch => {

    //     console.log(tagEdit);
    //     console.log(tagEdit.tagEditid);
    //     //user.countrycode='';
    
    //     base_url.put('customize/edit-tag/' + tagEdit.tagEditid, tagEdit, {
           
    //     })
    //         .then(res => {
    //             console.log(res.data.value);
    //             console.log(res.data.message);
    //             if (res.data.value == 1)
    //                 alert("Tag Edited successfully");
    //             else
    //                 alert(res.data.message);
    //         })
    //         .catch(err => {
    //             dispatch({
    //                 type: GET_ERRORS,
    //                 payload: err.response.data
    //             });
    //         });
    // }
    
    // export const tagDelete = (id) =>  dispatch => {
    //     base_url.post('customize/delete-tag/'+id)
    
    //       .then(res=>res.json())
    //       .then(res2=>{
    //           console.log(res2)
    //           dispatch({type:'DELETE_TAG',payload:res2})
    //       })
      
            
            
    //   }
    
    
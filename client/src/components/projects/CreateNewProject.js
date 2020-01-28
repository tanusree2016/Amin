
import { GET_ERRORS,CREATE_NEW_PROJECT } from '../actions/types';
import { CREATE_NEW_CLIENT } from '../actions/types';
import axios from 'axios';

import base_url from '../../common/utils/axios';
import swal from 'sweetalert';

 export const createProject = (createProject, history) => dispatch => {
    //user.countrycode='';
    
        base_url.post('project/create-project', createProject)
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if(res.data.value==1)
               // alert("Registraion Successfull");
                swal("Registraion Successfull", {
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

    // export const setCurrentUser = decoded => {
    //     return {
    //         type: SET_CURRENT_USER,
    //         payload: decoded
    //     }
    // }
    
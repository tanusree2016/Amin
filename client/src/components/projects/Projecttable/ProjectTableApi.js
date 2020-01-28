
import { GET_ERRORS,DELETE_PROJECT} from '../../actions/types';

import axios from 'axios';

import base_url from '../../../common/utils/axios';
import swal from 'sweetalert';

 export const deleteProject = (deleteProject, history) => dispatch => {
    //user.countrycode='';
    
        base_url.post('project/delete-project', deleteProject)
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if(res.data.value==1)
                //alert("Tag Added Successfully");
                swal("Project Deleted Successfully", {
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


import { GET_ERRORS, SET_CURRENT_USER } from '../../types';
import base_url from '../../../common/utils/axios';
import swal from 'sweetalert';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';

mobiscroll.settings = {
    theme: 'ios',
}

function showAlert (text) {
    mobiscroll.alert({
        message: text,
        
    });
}

export const subscriptionApis = (subscrip, history) => dispatch => {
    //user.countrycode='';

    base_url.post('subscription', subscrip, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
            showAlert("Module is added successfully");
            else
            showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const subscriptionApiEdit = (subscrip, history) => dispatch => {

    console.log(subscrip);
    console.log(subscrip.subscriptionid);
    //user.countrycode='';

    base_url.put('subscription/' + subscrip.subscriptionid, subscrip, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
            showAlert("Module is edited successfully");
            else
            showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const subscriptionApiDelete = (subscrip, history) => dispatch => {

   // console.log(subscrip);

    base_url.post('subscription/' + subscrip.subscriptionid,subscrip, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
    .then(res => {
        console.log(res.data.value);
        console.log(res.data.message);
        if (res.data.value == 1)
        showAlert("Module is deleted successfully");
        else
        showAlert(res.data.message);
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    });
}


export const planCreateApis  = (plancreate, history) => dispatch => {
   

    base_url.post('plan-create', plancreate, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
            showAlert("Plan is added successfully");
            else
            showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}


export const planEdit =  (planedit, history) => dispatch => {

    console.log('all'+planedit);
    console.log('edit id'+planedit.planid);
   
    base_url.put('plan/' + planedit.planid, planedit, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(res => {
            console.log(res.data.value);
            console.log(res.data.message);
            if (res.data.value == 1)
            showAlert("Plan is edited successfully");
            else
            showAlert(res.data.message);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });

}


export const planDelete = (planDelete, history) => dispatch => {
    base_url.post('plan/' + planDelete.planid,planDelete, {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
    .then(res => {
        console.log(res.data.value);
        console.log(res.data.message);
        if (res.data.value == 1)
        showAlert("Plan is deleted successfully");
        else
        showAlert(res.data.message);
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    });
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}
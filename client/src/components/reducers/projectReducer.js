
import { GET_ERRORS,CREATE_NEW_PROJECT,DELETE_PROJECT } from '../actions/types';
import { CREATE_NEW_CLIENT } from '../actions/types';

const initialState = {
    // isAuthenticated: false,
    project: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case CREATE_NEW_PROJECT:
            return {
                ...state,
                // isAuthenticated: !isEmpty(action.payload),
                project: action.payload
            }

            case DELETE_PROJECT:
                return {
                    ...state,
                    // isAuthenticated: !isEmpty(action.payload),
                    project: action.payload
                }
        default: 
            return state;
    }
}
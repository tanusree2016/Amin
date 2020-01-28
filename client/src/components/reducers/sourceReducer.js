
import { GET_ERRORS,ADD_SOURCE,EDIT_SOURCE,DELETE_SOURCE } from '../actions/types';


const initialState = {
    // isAuthenticated: false,

}

export default function(state = initialState, action ) {
    switch(action.type) {
        case ADD_SOURCE:
            return {
                ...state,
                // isAuthenticated: !isEmpty(action.payload),
                status: action.payload
            }
            case EDIT_SOURCE:
            return {
                ...state,
                // isAuthenticated: !isEmpty(action.payload),
                status: action.payload
            }
            case DELETE_SOURCE:
            return {
                ...state,
                // isAuthenticated: !isEmpty(action.payload),
                status: action.payload
            }
        default: 
            return state;
    }
}
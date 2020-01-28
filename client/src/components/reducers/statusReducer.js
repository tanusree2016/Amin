
import { GET_ERRORS,ADD_STATUS,EDIT_STATUS,DELETE_STATUS } from '../actions/types';


const initialState = {
    // isAuthenticated: false,

}

export default function(state = initialState, action ) {
    switch(action.type) {
        case ADD_STATUS:
            return {
                ...state,
                // isAuthenticated: !isEmpty(action.payload),
                status: action.payload
            }
            case EDIT_STATUS:
            return {
                ...state,
                // isAuthenticated: !isEmpty(action.payload),
                status: action.payload
            }
            case DELETE_STATUS:
            return {
                ...state,
                // isAuthenticated: !isEmpty(action.payload),
                status: action.payload
            }
        default: 
            return state;
    }
}
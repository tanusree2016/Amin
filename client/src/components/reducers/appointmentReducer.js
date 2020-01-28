
import { GET_ERRORS,ADD_APPOINTMENT,EDIT_APPOINTMENT,DELETE_APPOINTMENT } from '../actions/types';


const initialState = {
    // isAuthenticated: false,
   
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case ADD_APPOINTMENT:
            return {
                ...state,
                // isAuthenticated: !isEmpty(action.payload),
                project: action.payload
            }

            case EDIT_APPOINTMENT:
                return {
                    ...state,
                    // isAuthenticated: !isEmpty(action.payload),
                    project: action.payload
                }

                
            case DELETE_APPOINTMENT:
                return {
                    ...state,
                    // isAuthenticated: !isEmpty(action.payload),
                    project: action.payload
                }
        default: 
            return state;
    }
}
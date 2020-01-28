
import { GET_ERRORS, ADD_TAG, EDIT_TAG,DELETE_TAG } from '../actions/types';


const initialState = {
    // isAuthenticated: false,

}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TAG:
            return {
                ...state,
                // isAuthenticated: !isEmpty(action.payload),
                tag: action.payload
            }
        case EDIT_TAG:

        
            return {
                ...state,
                // isAuthenticated: !isEmpty(action.payload),
                tag: action.payload
            }

            case DELETE_TAG:

        
                return {
                    ...state,
                    // isAuthenticated: !isEmpty(action.payload),
                    tag: action.payload
                }
        default:
            return state;
    }
}
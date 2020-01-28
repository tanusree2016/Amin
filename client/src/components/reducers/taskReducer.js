
import { GET_ERRORS, ADD_TASK,EDIT_TASK,DELETE_TASK} from '../actions/types';


const initialState = {
    // isAuthenticated: false,

}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                // isAuthenticated: !isEmpty(action.payload),
                tag: action.payload
            }
        case EDIT_TASK:

        
            return {
                ...state,
                // isAuthenticated: !isEmpty(action.payload),
                tag: action.payload
            }

            case DELETE_TASK:

        
                return {
                    ...state,
                    // isAuthenticated: !isEmpty(action.payload),
                    tag: action.payload
                }
        default:
            return state;
    }
}
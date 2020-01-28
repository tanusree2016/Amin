import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import projectReducer from './projectReducer';
import statusReducer from './statusReducer'
import tagReducer from './tagReducer'
import appointmentReducer from './appointmentReducer';
import taskReducer from './taskReducer';
import sourceReducer from './sourceReducer';
export default combineReducers({
    errors: errorReducer,
    project: projectReducer,
    status : statusReducer,
    tag : tagReducer,
    appointment : appointmentReducer,
    task : taskReducer,
    source:sourceReducer
});
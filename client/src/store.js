import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './components/reducers/rootReducer';

const inititalState = {};

const store = createStore(
        rootReducer,
        inititalState, 
        compose(applyMiddleware(thunk), 
                //window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
                ));

export default store;
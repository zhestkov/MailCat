import { combineReducers } from 'redux';
import configReducer from './configReducer';
import responseReducer from './responseReducer';
import messagesReducer  from './messagesReducer'
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    routing: routerReducer,
    config: configReducer,
    messages: messagesReducer,
    response: responseReducer,
});

export default rootReducer;

import contentReducer from './contReducers';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    contentTree: contentReducer
});

export default rootReducer;
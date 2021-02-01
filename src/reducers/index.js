import contentReducer from './contReducers';
import navReducer from './navReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    contentTree: contentReducer,
    navState: navReducer
});

export default rootReducer;
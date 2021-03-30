import { combineReducers } from "redux";
import contentReducer from "./contReducers";
import navReducer from "./navReducers";
import authReducer from "./authReducers";

const rootReducer = combineReducers({
	contentState: contentReducer,
	navState: navReducer,
	authState: authReducer,
});

export default rootReducer;

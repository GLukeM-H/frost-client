import { combineReducers } from "redux";
import contentReducer from "./contReducer";
import navReducer from "./navReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
	contentState: contentReducer,
	navState: navReducer,
	authState: authReducer,
	errorState: errorReducer,
});

export default rootReducer;

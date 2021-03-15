import { combineReducers } from "redux";
import contentReducer from "./contReducers";
import navReducer from "./navReducers";

const rootReducer = combineReducers({
	contentState: contentReducer,
	navState: navReducer,
});

export default rootReducer;

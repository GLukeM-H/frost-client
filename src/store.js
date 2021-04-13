import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initState = {};

const middleware = [thunk];

const enhancers = [applyMiddleware(...middleware)];

if (process.env.NODE_ENV === "development") {
	enhancers.push(
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
}

const store = createStore(rootReducer, initState, compose(...enhancers));

export default store;

import { produce } from "immer";
import {
	USER_ERROR,
	USER_LOGIN,
	USER_LOGOUT,
	USER_RESET,
	USER_SET_USERNAME,
} from "../constants/actionTypes";

const INIT_STATE = {
	username: null,
	token: localStorage.getItem("token"),
	error: null,
};

const authReducer = produce((draft, action) => {
	switch (action.type) {
		case USER_ERROR:
			draft.error = action.payload;
			break;
		case USER_LOGIN:
			localStorage.setItem("token", action.payload.token);
			Object.assign(draft, action.payload);
			break;
		case USER_LOGOUT:
		case USER_RESET:
			localStorage.removeItem("token");
			Object.assign(draft, { ...INIT_STATE, token: null });
			break;
		case USER_SET_USERNAME:
			draft.username = action.payload;
			break;
		default:
	}
}, INIT_STATE);

export default authReducer;

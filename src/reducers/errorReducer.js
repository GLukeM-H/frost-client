import { produce } from "immer";
import {
	ERROR_AUTH_PASSWORD,
	ERROR_AUTH_USERNAME,
	ERROR_GET_VISAGE,
	ERROR_LOGIN,
	ERROR_REGISTER,
	ERROR_RESET,
	ERROR_SAVE_VISAGE,
} from "../constants/actionTypes";

const INIT_STATE = {
	authUsername: null,
	authPassword: null,
	login: null,
	register: null,
	getVisage: null,
	saveVisage: null,
};

const errorReducer = produce((draft, action) => {
	switch (action.type) {
		case ERROR_AUTH_USERNAME:
			draft.authUsername = action.payload;
			break;
		case ERROR_AUTH_PASSWORD:
			draft.authPassword = action.payload;
			break;
		case ERROR_LOGIN:
			draft.login = action.payload;
			break;
		case ERROR_REGISTER:
			draft.register = action.payload;
			break;
		case ERROR_GET_VISAGE:
			draft.getVisage = action.payload;
			break;
		case ERROR_SAVE_VISAGE:
			draft.saveVisage = action.payload;
			break;
		case ERROR_RESET:
			Object.assign(draft, INIT_STATE);
			break;
		default:
	}
}, INIT_STATE);

export default errorReducer;

import { produce } from "immer";

const INIT_STATE = {
	username: null,
	token: localStorage.getItem("token"),
	error: null,
};

const authReducer = produce((draft, action) => {
	switch (action.type) {
		case "USER/ERROR":
			draft.error = action.payload;
			break;
		case "USER/LOGIN":
			localStorage.setItem("token", action.payload.token);
			Object.assign(draft, action.payload);
			break;
		case "USER/LOGOUT":
		case "USER/RESET":
			localStorage.removeItem("token");
			Object.assign(draft, { ...INIT_STATE, token: null });
			break;
		case "USER/SET_USERNAME":
			draft.username = action.payload;
			break;
		default:
	}
}, INIT_STATE);

export default authReducer;

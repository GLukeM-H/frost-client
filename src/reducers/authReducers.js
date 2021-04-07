import { produce } from "immer";

const authReducer = produce(
	(draft, action) => {
		switch (action.type) {
			case "USER/ERROR":
				draft.error = action.payload;
				break;
			case "USER/LOGIN":
				localStorage.setItem("token", action.payload.token);
				draft.username = action.payload.username;
				draft.token = action.payload.token;
				break;
			case "USER/LOGOUT":
				localStorage.removeItem("token");
				draft.username = draft.token = null;
				break;
			default:
		}
	},
	{ username: null, token: localStorage.getItem("token"), error: null }
);

export default authReducer;

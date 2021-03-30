import { produce } from "immer";

const authReducer = produce(
	(draft, action) => {
		switch (action.type) {
			case "USER/ERROR":
				draft.error = action.payload;
				break;
			case "USER/LOGIN":
				draft.username = action.payload.username;
				draft.token = action.payload.token;
				break;
			case "USER/LOGOUT":
				draft.username = draft.token = null;
				break;
			default:
		}
	},
	{ username: null, token: null, error: null }
);

export default authReducer;

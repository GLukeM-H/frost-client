import { produce } from "immer";

const authReducer = produce(
	(draft, action) => {
		switch (action.type) {
			case "USER/LOGIN":
				draft.username = action.payload.username;
				draft.token = action.payload.token;
				draft.error = action.payload.error;
				break;
			case "USER/LOGOUT":
				draft.username = draft.token = draft.error = null;
				break;
			default:
		}
	},
	{ username: null, token: null, error: null }
);

export default authReducer;

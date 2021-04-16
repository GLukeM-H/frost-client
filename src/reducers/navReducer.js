import { produce } from "immer";
import {
	NAV_RESET,
	NAV_TOGGLE,
	TOOLS_SET_TOOLS,
	TOOLS_SET_VIEW,
	TOOLS_TOGGLE,
} from "../constants/actionTypes";
import { INIT_STATE } from "../constants/navReducerConstants";

const navReducer = produce((draft, action) => {
	switch (action.type) {
		case NAV_TOGGLE:
			draft.navIsOpen = !draft.navIsOpen;
			break;
		case NAV_RESET:
			Object.assign(draft, INIT_STATE);
			break;
		case TOOLS_TOGGLE:
			draft.toolsOpen = !draft.toolsOpen;
			break;
		case TOOLS_SET_TOOLS:
			draft.toolsOpen = action.payload;
			break;
		case TOOLS_SET_VIEW:
			draft.toolsView = action.payload;
			break;
		default:
	}
}, INIT_STATE);

export default navReducer;

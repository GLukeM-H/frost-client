import { produce } from "immer";
import { INIT_STATE } from "../constants/navReducerConstants";

const navReducer = produce((draft, action) => {
	switch (action.type) {
		case "NAV/TOGGLE":
			draft.navIsOpen = !draft.navIsOpen;
			break;
		case "NAV/RESET":
			Object.assign(draft, INIT_STATE);
			break;
		case "TOOLS/TOGGLE":
			draft.toolsOpen = !draft.toolsOpen;
			break;
		case "TOOLS/SET_TOOLS":
			draft.toolsOpen = action.payload;
			break;
		case "TOOLS/SET_VIEW":
			draft.toolsView = action.payload;
			break;
		default:
	}
}, INIT_STATE);

export default navReducer;

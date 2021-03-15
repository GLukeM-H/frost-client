import { produce } from "immer";
import { v4 as uuid } from "uuid";
import {
	insertComponent,
	deleteComponent,
	deleteChildren,
	moveComponent,
	newComponent,
} from "../helpers/contentStateHelpers";

import { ROOT_COMP, INIT_STATE } from "../constants/contReducerConstants";

const contentReducer = produce((draft, action) => {
	switch (action.type) {
		case "BODY/GET":
			if (action.payload.length) {
				draft.contentComp = action.payload[0].contentComp;
				draft.contentCompId = action.payload[0]._id;
			} else {
				newComponent(draft, "Grid", ROOT_COMP, null, { container: true });
			}
			draft.loading = false;
			break;
		case "BODY/SAVE":
			draft.contentCompId = action.payload;
			draft.savedChanges = true;
			break;
		case "BODY/LOADING":
			draft.loading = true;
			break;
		case "EDIT/INSERT":
			insertComponent(draft, uuid(), ...action.payload);
			draft.savedChanges = false;
			break;
		case "EDIT/DELETE":
			deleteComponent(draft, action.payload);
			draft.savedChanges = false;
			break;
		case "EDIT/DELETE_CHILDREN":
			deleteChildren(draft, action.payload);
			draft.savedChanges = false;
			break;
		case "EDIT/MOVE":
			moveComponent(draft, ...action.payload);
			draft.savedChanges = false;
			break;
		case "EDIT/SET_INNER":
			draft.contentComp[action.payload.id].inner = action.payload.inner;
			draft.savedChanges = false;
			break;
		case "EDIT/SET_PROPS":
			draft.contentComp[action.payload.id].props = {
				...draft.contentComp[action.payload.id].props,
				...action.payload.props,
			};
			draft.savedChanges = false;
			break;
		case "EDIT/SET_SELECTED":
			draft.selected = action.payload;
			break;
		case "EDIT/DISABLE_PARENT":
			draft.hoverDisabled[
				draft.contentComp[action.payload].parentId || "start"
			] = action.payload;
			break;
		case "EDIT/ENABLE_PARENT":
			delete draft.hoverDisabled[
				draft.contentComp[action.payload].parentId || "start"
			];
			break;
		case "EDIT/TOGGLE":
			draft.editing = !draft.editing;
			break;
		default:
	}
}, INIT_STATE);

export default contentReducer;

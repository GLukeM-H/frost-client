import { produce } from "immer";
import ObjectID from "bson-objectid";
import {
	insertComponent,
	deleteComponent,
	deleteChildren,
	moveComponent,
	newComponent,
} from "../helpers/contentStateHelpers";

import ROOT_COMP from "../constants/contReducerConstants";

const INIT_STATE = {
	contentComp: {
		[ROOT_COMP]: {
			comp: "div",
			inner: "",
			props: { key: ROOT_COMP, id: ROOT_COMP },
			childIds: [],
			parentId: null,
		},
	},
	visageId: ROOT_COMP,
	visageName: "",
	editing: false,
	insertId: null,
	selected: "",
	hoverDisabled: {},
	loading: false,
	savedChanges: true,
	error: "",
};

const contentReducer = produce((draft, action) => {
	switch (action.type) {
		case "BODY/ERROR":
			draft.error = action.payload;
			break;
		case "BODY/GET":
			if (action.payload) {
				draft.contentComp = action.payload.content;
				draft.visageId = action.payload._id;
				draft.visageName = action.payload.name;
			} else {
				newComponent(draft, "Grid", ROOT_COMP, null, { container: true });
			}
			break;
		case "BODY/SAVE":
			draft.visageId = action.payload._id;
			draft.savedChanges = true;
			break;
		case "BODY/LOADING":
			draft.loading = action.payload;
			break;
		case "BODY/RESET":
			Object.assign(draft, INIT_STATE);
			break;
		case "EDIT/SET_VISAGE_NAME":
			draft.visageName = action.payload;
			draft.savedChanges = false;
			break;
		case "EDIT/INSERT":
			insertComponent(draft, ObjectID().toString(), ...action.payload);
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
		case "EDIT/SET_EDITING":
			draft.editing = action.payload;
			break;
		default:
	}
}, INIT_STATE);

export default contentReducer;

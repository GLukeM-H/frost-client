import { produce } from "immer";
import ObjectID from "bson-objectid";
import {
	insertComponent,
	deleteComponent,
	deleteChildren,
	moveComponent,
} from "../helpers/contentStateHelpers";

const ROOT_ID = ObjectID();
const INIT_STATE = {
	visageId: "",
	visageName: "",
	rootId: ROOT_ID,
	editing: false,
	insertId: null,
	selected: "",
	hoverDisabled: {},
	loading: false,
	savedChanges: true,
	displayLogin: false,
	error: "",
	contentComp: {
		[ROOT_ID]: {
			comp: "div",
			inner: "",
			props: { key: ROOT_ID, id: ROOT_ID },
			childIds: [],
			parentId: null,
		},
	},
};

const contentReducer = produce((draft, action) => {
	switch (action.type) {
		case "BODY/ERROR":
			draft.error = action.payload;
			break;
		case "BODY/GET":
			draft.contentComp = action.payload.content;
			draft.rootId = action.payload.rootId;
			draft.visageId = action.payload._id;
			draft.visageName = action.payload.name;
			break;
		case "BODY/SAVE":
			draft.visageId = action.payload._id;
			draft.savedChanges = true;
			break;
		case "BODY/SET_SAVED_CHANGES":
			draft.savedChanges = action.payload;
			break;
		case "BODY/LOADING":
			draft.loading = action.payload;
			break;
		case "BODY/SET_DISPLAY_LOGIN":
			draft.displayLogin = action.payload;
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

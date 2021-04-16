import { produce } from "immer";
import ObjectID from "bson-objectid";
import {
	insertComponent,
	deleteComponent,
	deleteChildren,
	moveComponent,
} from "../helpers/contentStateHelpers";
import {
	BODY_ERROR,
	BODY_GET,
	BODY_LOADING,
	BODY_RESET,
	BODY_SAVE,
	BODY_SET_DISPLAY_LOGIN,
	BODY_SET_SAVED_CHANGES,
	EDIT_DELETE,
	EDIT_DELETE_CHILDREN,
	EDIT_DISABLE_PARENT,
	EDIT_ENABLE_PARENT,
	EDIT_INSERT,
	EDIT_MOVE,
	EDIT_SET_EDITING,
	EDIT_SET_INNER,
	EDIT_SET_PROPS,
	EDIT_SET_SELECTED,
	EDIT_SET_VISAGE_NAME,
	EDIT_TOGGLE,
} from "../constants/actionTypes";

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
		case BODY_ERROR:
			draft.error = action.payload;
			break;
		case BODY_GET:
			draft.contentComp = action.payload.content;
			draft.rootId = action.payload.rootId;
			draft.visageId = action.payload._id;
			draft.visageName = action.payload.name;
			break;
		case BODY_SAVE:
			draft.visageId = action.payload._id;
			draft.savedChanges = true;
			break;
		case BODY_SET_SAVED_CHANGES:
			draft.savedChanges = action.payload;
			break;
		case BODY_LOADING:
			draft.loading = action.payload;
			break;
		case BODY_SET_DISPLAY_LOGIN:
			draft.displayLogin = action.payload;
			break;
		case BODY_RESET:
			Object.assign(draft, INIT_STATE);
			break;
		case EDIT_SET_VISAGE_NAME:
			draft.visageName = action.payload;
			draft.savedChanges = false;
			break;
		case EDIT_INSERT:
			insertComponent(draft, ObjectID().toString(), ...action.payload);
			draft.savedChanges = false;
			break;
		case EDIT_DELETE:
			deleteComponent(draft, action.payload);
			draft.savedChanges = false;
			break;
		case EDIT_DELETE_CHILDREN:
			deleteChildren(draft, action.payload);
			draft.savedChanges = false;
			break;
		case EDIT_MOVE:
			moveComponent(draft, ...action.payload);
			draft.savedChanges = false;
			break;
		case EDIT_SET_INNER:
			draft.contentComp[action.payload.id].inner = action.payload.inner;
			draft.savedChanges = false;
			break;
		case EDIT_SET_PROPS:
			Object.assign(
				draft.contentComp[action.payload.id].props,
				action.payload.props
			);
			draft.savedChanges = false;
			break;
		case EDIT_SET_SELECTED:
			draft.selected = action.payload;
			break;
		case EDIT_DISABLE_PARENT:
			draft.hoverDisabled[
				draft.contentComp[action.payload].parentId || "start"
			] = action.payload;
			break;
		case EDIT_ENABLE_PARENT:
			delete draft.hoverDisabled[
				draft.contentComp[action.payload].parentId || "start"
			];
			break;
		case EDIT_TOGGLE:
			draft.editing = !draft.editing;
			break;
		case EDIT_SET_EDITING:
			draft.editing = action.payload;
			break;
		default:
	}
}, INIT_STATE);

export default contentReducer;

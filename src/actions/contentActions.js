/* eslint-disable no-use-before-define */
import axios from "axios";
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
	ERROR_GET_VISAGE,
	USER_SET_USERNAME,
} from "../constants/actionTypes";

/* ~~~~~ Body Actions ~~~~~ */
export const resetBody = () => ({
	type: BODY_RESET,
});

export const errorBody = (err) => ({
	type: BODY_ERROR,
	payload: err.toString(),
});

export const getDefaultBody = () => async (dispatch) => {
	dispatch(setBodyLoading(true));
	const query = `
		query {
			visage(id: "605435d7a9469248bc1486d3") {
				rootId
				content
				name
			}
		}
	`;

	try {
		const { data, errors } = (await axios.post("/graphql", { query })).data;

		if (errors) throw errors;

		dispatch({ type: BODY_GET, payload: data.visage });
		dispatch({ type: BODY_SET_SAVED_CHANGES, payload: false });
	} catch (err) {
		dispatch({ type: ERROR_GET_VISAGE, payload: err });
	}
	return dispatch(setBodyLoading(false));
};

export const getBody = () => async (dispatch, getState) => {
	const { token } = getState().authState;
	if (!token) return dispatch(getDefaultBody());

	dispatch(setBodyLoading(true));

	const query = `
		query {
			viewer {
				username
				visage {
					_id
					content
					name
					rootId
				}
			}
		}
	`;
	const headers = { Authorization: `Bearer ${token}` };

	try {
		const { data, errors } = (
			await axios.post("/graphql", { query }, { headers })
		).data;

		if (errors) throw errors;

		dispatch({
			type: BODY_GET,
			payload: data.viewer.visage,
		});
		dispatch({ type: USER_SET_USERNAME, payload: data.viewer.username });
	} catch (e) {
		dispatch(errorBody(e.response?.data.error || e));
	}
	return dispatch(setBodyLoading(false));
};

export const saveBody = () => async (dispatch, getState) => {
	const { contentComp, visageId, visageName } = getState().contentState;
	if (!getState().authState.token) return dispatch(setDisplayLogin(true));
	const query = `
		mutation updateVisage(
			$visageId: ID!
			$contentComp: JSONObject
			$visageName: String!
		) {
			updateVisage(
				id: $visageId
				update: { content: $contentComp, name: $visageName}
			) {
				_id
			}
		}
	`;
	const variables = {
		visageId,
		contentComp,
		visageName,
	};
	try {
		const { data, errors } = (
			await axios.post("/graphql", { query, variables })
		).data;

		if (errors) throw errors;

		return dispatch({
			type: BODY_SAVE,
			payload: data.updateVisage,
		});
	} catch (err) {
		return dispatch(errorBody(err));
	}
};

export const setBodyLoading = (loading) => ({
	type: BODY_LOADING,
	payload: loading,
});

export const setDisplayLogin = (isVisible) => ({
	type: BODY_SET_DISPLAY_LOGIN,
	payload: isVisible,
});

/* ~~~~~ Edit Actions ~~~~~ */
export const setSelected = (id) => ({
	type: EDIT_SET_SELECTED,
	payload: id,
});

export const setVisageName = (name) => (dispatch) => {
	dispatch({
		type: EDIT_SET_VISAGE_NAME,
		payload: name,
	});
};

export const disableParent = (id) => ({
	type: EDIT_DISABLE_PARENT,
	payload: id,
});

export const enableParent = (id) => ({
	type: EDIT_ENABLE_PARENT,
	payload: id,
});

export const toggleEditing = () => (dispatch) => {
	dispatch(setSelected(""));
	dispatch({ type: EDIT_TOGGLE });
};

export const setEditing = (editing) => (dispatch) => {
	dispatch(setSelected(""));
	dispatch({ type: EDIT_SET_EDITING, payload: editing });
};

export const insertComp = (compName, parentId, childId, props = {}) => ({
	type: EDIT_INSERT,
	payload: [compName, parentId, childId, props],
});

export const deleteComp = (id) => (dispatch) => {
	dispatch(setSelected(""));
	dispatch({
		type: EDIT_DELETE,
		payload: id,
	});
};

export const deleteChildren = (id) => ({
	type: EDIT_DELETE_CHILDREN,
	payload: id,
});

export const moveComp = (id, oldParent, newParent, index) => ({
	type: EDIT_MOVE,
	payload: [id, oldParent, newParent, index],
});

export const replaceComp = (parentId, childId, compName) => (dispatch) => {
	dispatch(insertComp(parentId, childId, compName));
	dispatch(deleteComp(childId));
};

export const setInner = (id, inner) => ({
	type: EDIT_SET_INNER,
	payload: { id, inner },
});

export const setProps = (id, props) => ({
	type: EDIT_SET_PROPS,
	payload: { id, props },
});

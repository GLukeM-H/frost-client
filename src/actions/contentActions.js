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
export function resetBody() {
	return {
		type: BODY_RESET,
	};
}

export function errorBody(err) {
	return {
		type: BODY_ERROR,
		payload: err.toString(),
	};
}

// function createVisage(visage) {
// 	return async () => {
// 		const query = `
// 			mutation addVisage($visage: VisageFields!) {
// 				addVisage(visage: $visage) {
// 					_id
// 				}
// 			}
// 		`;

// 		const { data, error } = (
// 			await axios.post("/graphql", {
// 				query,
// 				variables: { visage },
// 			})
// 		).data;
// 		if (!data.addVisage || error) {
// 			console.log("Could not add Visage");
// 		}
// 	};
// }

export function getDefaultBody() {
	return async (dispatch) => {
		dispatch(setBodyLoading(true));
		const query = `
			query{
				visage(id: "605435d7a9469248bc1486d3") {
					rootId
					content
					name
				}
			}
		`;

		try {
			const { visage } = (await axios.post("/graphql", { query })).data.data;
			dispatch({ type: BODY_GET, payload: visage });
			dispatch({ type: BODY_SET_SAVED_CHANGES, payload: false });
		} catch (err) {
			dispatch({ type: ERROR_GET_VISAGE, payload: err });
		}
		return dispatch(setBodyLoading(false));
	};
}

export function getBody() {
	return async (dispatch, getState) => {
		const { token } = getState().authState;
		if (!token) return dispatch(getDefaultBody());

		dispatch(setBodyLoading(true));
		const query = `query{
			viewer{
				username
				visage{
					_id
					content
					name
					rootId
				}
			}
		}`;
		const headers = {
			Authorization: `Bearer ${token}`,
		};

		try {
			const { visage, username } = (
				await axios.post("/graphql", { query }, { headers })
			).data.data.viewer;
			dispatch({
				type: BODY_GET,
				payload: visage,
			});
			dispatch({ type: USER_SET_USERNAME, payload: username });
		} catch (e) {
			dispatch(errorBody(e.response?.data.error || e));
		}
		return dispatch(setBodyLoading(false));
	};
}

export function saveBody() {
	return async (dispatch, getState) => {
		const { contentComp, visageId, visageName } = getState().contentState;
		if (!getState().authState.token) return dispatch(setDisplayLogin(true));
		const query = `
			mutation updateVisage($visageId: ID!, $contentComp: JSONObject, $visageName: String!){
				updateVisage(id: $visageId, update:{ content: $contentComp, name: $visageName}) {
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
			const { updateVisage } = (
				await axios.post("/graphql", { query, variables })
			).data.data;
			return dispatch({
				type: BODY_SAVE,
				payload: updateVisage,
			});
		} catch (err) {
			return dispatch(errorBody(err));
		}
	};
}

export function setBodyLoading(loading) {
	return {
		type: BODY_LOADING,
		payload: loading,
	};
}

export function setDisplayLogin(isVisible) {
	return {
		type: BODY_SET_DISPLAY_LOGIN,
		payload: isVisible,
	};
}

/* ~~~~~ Edit Actions ~~~~~ */
export function setSelected(id) {
	return {
		type: EDIT_SET_SELECTED,
		payload: id,
	};
}

export function setVisageName(name) {
	return (dispatch) => {
		dispatch({
			type: EDIT_SET_VISAGE_NAME,
			payload: name,
		});
	};
}

export function disableParent(id) {
	return {
		type: EDIT_DISABLE_PARENT,
		payload: id,
	};
}

export function enableParent(id) {
	return {
		type: EDIT_ENABLE_PARENT,
		payload: id,
	};
}

export function toggleEditing() {
	return (dispatch) => {
		dispatch(setSelected(""));
		dispatch({ type: EDIT_TOGGLE });
	};
}

export function setEditing(editing) {
	return (dispatch) => {
		dispatch(setSelected(""));
		dispatch({ type: EDIT_SET_EDITING, payload: editing });
	};
}

export function insertComp(compName, parentId, childId, props = {}) {
	return {
		type: EDIT_INSERT,
		payload: [compName, parentId, childId, props],
	};
}

export function deleteComp(id) {
	return (dispatch) => {
		dispatch(setSelected(""));
		dispatch({
			type: EDIT_DELETE,
			payload: id,
		});
	};
}

export function deleteChildren(id) {
	return {
		type: EDIT_DELETE_CHILDREN,
		payload: id,
	};
}

export function moveComp(id, oldParent, newParent, index) {
	return {
		type: EDIT_MOVE,
		payload: [id, oldParent, newParent, index],
	};
}

export function replaceComp(parentId, childId, compName) {
	return (dispatch) => {
		dispatch(insertComp(parentId, childId, compName));
		dispatch(deleteComp(childId));
	};
}

export function setInner(id, inner) {
	return {
		type: EDIT_SET_INNER,
		payload: { id, inner },
	};
}

export function setProps(id, props) {
	return {
		type: EDIT_SET_PROPS,
		payload: { id, props },
	};
}

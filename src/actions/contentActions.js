/* eslint-disable no-use-before-define */
import axios from "axios";

/* ~~~~~ Body Actions ~~~~~ */
export function resetBody() {
	return {
		type: "BODY/RESET",
	};
}

export function errorBody(err) {
	return {
		type: "BODY/ERROR",
		payload: err.toString(),
	};
}

export function getBody() {
	return async (dispatch, getState) => {
		dispatch(setBodyLoading());
		const query = `query{
			viewer{
				visage{
					_id
					content
				}
			}
		}`;
		const headers = {
			Authorization: `Bearer ${getState().authState.token}`,
		};

		try {
			const res = await axios.post("/graphql", { query }, { headers });
			dispatch({
				type: "BODY/GET",
				payload: res.data.data.viewer.visage,
			});
		} catch (e) {
			const err = e.response?.data.error || e;
			dispatch(resetBody());
			dispatch(errorBody(err));
		}
	};
}

export function saveBody(content, visageId) {
	return (dispatch) => {
		const query = `mutation updateVisage($visageId: ID!, $content: JSONObject){
			updateVisage(id: $visageId, update:{ content: $content }) {
				_id
			}
		}`;
		const variables = { visageId, content };

		axios
			.post("/graphql", { query, variables })
			.then((res) => {
				dispatch({
					type: "BODY/SAVE",
					payload: res.data.data.updateVisage,
				});
			})
			.catch((err) => {
				dispatch(errorBody(err));
			});
	};
}

export function setBodyLoading() {
	return {
		type: "BODY/LOADING",
	};
}

/* ~~~~~ Edit Actions ~~~~~ */
export function setSelected(id) {
	return {
		type: "EDIT/SET_SELECTED",
		payload: id,
	};
}

export function disableParent(id) {
	return {
		type: "EDIT/DISABLE_PARENT",
		payload: id,
	};
}

export function enableParent(id) {
	return {
		type: "EDIT/ENABLE_PARENT",
		payload: id,
	};
}

export function toggleEditing() {
	return (dispatch) => {
		dispatch(setSelected(""));
		dispatch({ type: "EDIT/TOGGLE" });
	};
}

export function setEditing(editing) {
	return (dispatch) => {
		dispatch(setSelected(""));
		dispatch({ type: "EDIT/SET_EDITING", payload: editing });
	};
}

export function insertComp(compName, parentId, childId, props = {}) {
	return {
		type: "EDIT/INSERT",
		payload: [compName, parentId, childId, props],
	};
}

export function deleteComp(id) {
	return (dispatch) => {
		dispatch(setSelected(""));
		dispatch({
			type: "EDIT/DELETE",
			payload: id,
		});
	};
}

export function deleteChildren(id) {
	return {
		type: "EDIT/DELETE_CHILDREN",
		payload: id,
	};
}

export function moveComp(id, oldParent, newParent, index) {
	return {
		type: "EDIT/MOVE",
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
		type: "EDIT/SET_INNER",
		payload: { id, inner },
	};
}

export function setProps(id, props) {
	return {
		type: "EDIT/SET_PROPS",
		payload: { id, props },
	};
}

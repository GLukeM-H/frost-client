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
		dispatch(setBodyLoading(true));
		const query = `query{
			viewer{
				username
				visage{
					_id
					content
					name
				}
			}
		}`;
		const headers = {
			Authorization: `Bearer ${getState().authState.token}`,
		};

		try {
			const { visage, username } = (
				await axios.post("/graphql", { query }, { headers })
			).data.data.viewer;
			dispatch({
				type: "BODY/GET",
				payload: visage,
			});
			dispatch({ type: "USER/SET_USERNAME", payload: username });
		} catch (e) {
			dispatch(errorBody(e.response?.data.error || e));
		}
		dispatch(setBodyLoading(false));
	};
}

export function saveBody(content, visageId) {
	return (dispatch, getState) => {
		const query = `
			mutation updateVisage($visageId: ID!, $content: JSONObject, $visageName: String!){
				updateVisage(id: $visageId, update:{ content: $content, name: $visageName}) {
					_id
				}
			}
		`;
		const variables = {
			visageId,
			content,
			visageName: getState().contentState.visageName,
		};

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

export function setBodyLoading(loading) {
	return {
		type: "BODY/LOADING",
		payload: loading,
	};
}

/* ~~~~~ Edit Actions ~~~~~ */
export function setSelected(id) {
	return {
		type: "EDIT/SET_SELECTED",
		payload: id,
	};
}

export function setVisageName(name) {
	return (dispatch) => {
		dispatch({
			type: "EDIT/SET_VISAGE_NAME",
			payload: name,
		});
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

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
			dispatch({ type: "BODY/GET", payload: visage });
			dispatch({ type: "BODY/SET_SAVED_CHANGES", payload: false });
		} catch (e) {
			dispatch(errorBody(e));
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
				type: "BODY/GET",
				payload: visage,
			});
			dispatch({ type: "USER/SET_USERNAME", payload: username });
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
				type: "BODY/SAVE",
				payload: updateVisage,
			});
		} catch (err) {
			return dispatch(errorBody(err));
		}
	};
}

export function setBodyLoading(loading) {
	return {
		type: "BODY/LOADING",
		payload: loading,
	};
}

export function setDisplayLogin(isVisible) {
	return {
		type: "BODY/SET_DISPLAY_LOGIN",
		payload: isVisible,
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

/* eslint-disable no-param-reassign, no-use-before-define */
import { ROOT_COMP } from "../constants/contReducerConstants";

export const newComponent = (state, compName, id, parentId, props) => {
	state.contentComp[id] = {
		comp: compName,
		props: { key: id, id, ...props },
		inner: "",
		childIds: [],
		parentId,
	};
};

export const insertComponent = (
	state,
	id,
	compName,
	parentId,
	childId,
	props
) => {
	let index;
	// handle default cases
	if (childId) {
		if (!parentId) {
			parentId = state.contentComp[childId].parentId;
		}
		index = state.contentComp[parentId].childIds.indexOf(childId);
	} else {
		if (!parentId) {
			parentId = ROOT_COMP;
		}
		index = state.contentComp[parentId].childIds.length;
	}

	state.contentComp[parentId].childIds.splice(index, 0, id);
	newComponent(state, compName, id, parentId, props);
};

export function deleteComponent(state, id) {
	if (!state.contentComp[id]) {
		return;
	}

	deleteChildren(state, id);
	// state.contentComp[id].childIds.forEach((childId) => {
	// 	deleteComponent(state, childId);
	// });

	const { parentId } = state.contentComp[id];
	if (parentId) {
		state.contentComp[parentId].childIds = state.contentComp[
			parentId
		].childIds.filter((child) => child !== id);
	}

	delete state.contentComp[id];
}

export function deleteChildren(state, id) {
	state.contentComp[id].childIds.forEach((childId) => {
		deleteComponent(state, childId);
	});
}

export const moveComponent = (state, id, oldParentId, newParentId, index) => {
	state.contentComp[oldParentId].childIds = state.contentComp[
		oldParentId
	].childIds.filter((child) => child !== id);
	state.contentComp[newParentId].childIds.splice(index, 0, id);
	state.contentComp[id].parentId = newParentId;
};

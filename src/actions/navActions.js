import {
	NAV_RESET,
	NAV_TOGGLE,
	TOOLS_SET_TOOLS,
	TOOLS_SET_VIEW,
	TOOLS_TOGGLE,
} from "../constants/actionTypes";

export const resetNav = () => ({
	type: NAV_RESET,
});

export const toggleNav = () => ({
	type: NAV_TOGGLE,
});

export const toggleTools = () => ({
	type: TOOLS_TOGGLE,
});

export const setTools = (open) => ({
	type: TOOLS_SET_TOOLS,
	payload: open,
});

export const setToolsView = (view) => ({
	type: TOOLS_SET_VIEW,
	payload: view,
});

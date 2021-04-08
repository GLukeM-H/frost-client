export const resetNav = () => ({
	type: "NAV/RESET",
});

export const toggleNav = () => ({
	type: "NAV/TOGGLE",
});

export const toggleTools = () => ({
	type: "TOOLS/TOGGLE",
});

export const setTools = (open) => ({
	type: "TOOLS/SET_TOOLS",
	payload: open,
});

export const setToolsView = (payload) => ({
	type: "TOOLS/SET_VIEW",
	payload,
});

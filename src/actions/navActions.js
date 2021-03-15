export const toggleNav = () => ({
	type: "NAV/TOGGLE",
});

export const toggleTools = () => ({
	type: "TOOLS/TOGGLE",
});

export const setToolsView = (payload) => ({
	type: "TOOLS/SET_VIEW",
	payload,
});

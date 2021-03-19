export const ROOT_COMP = "loadingComp";
export const INIT_STATE = {
	contentComp: {
		[ROOT_COMP]: {
			comp: "div",
			inner: "",
			props: { key: ROOT_COMP, id: ROOT_COMP },
			childIds: [],
			parentId: null,
		},
	},
	visageId: ROOT_COMP,
	editing: false,
	insertId: null,
	selected: "",
	hoverDisabled: {},
	loading: false,
	savedChanges: true,
};

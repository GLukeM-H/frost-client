export const ROOT_COMP = 'rootComp';
export const INIT_STATE = {
    contentComp: {
        [ROOT_COMP]: {
            comp: 'div',
            inner: '',
            props: { key: ROOT_COMP, id: ROOT_COMP },
            childIds: [],
            parentId: null
        }
    },
    contentCompId: "",
    editing: false,
    insertId: null,
    selected: '',
    hoverDisabled: {},
    loading: false,
    savedChanges: true
}


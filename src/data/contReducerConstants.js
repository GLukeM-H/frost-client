export const ROOT_COMP = 'rootComp';
export const INIT_STATE = {
    contentComp: {
        [ROOT_COMP]: {
            comp: 'div',
            inner: 'Loading page...',
            props: { key: ROOT_COMP, id: ROOT_COMP },
            childIds: [],
            parentId: null
        }
    },
    editing: false,
    insertId: null,
    placeholderId: null
}


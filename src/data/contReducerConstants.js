export const ROOT_COMP = 'rootComp';
export const INIT_STATE = {
    contentComp: {
        [ROOT_COMP]: {
            comp: (
                <div>
                    Loading page...
                </div>
            ),
            childIds: [],
            parentId: null
        }
    },
    editing: false,
    insertId: null,
    placeholderId: null
}


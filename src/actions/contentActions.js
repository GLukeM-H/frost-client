export const getBody = () => {
    return {
        type: "BODY_COMPONENTS/GET",
    }
}

export const insertComp = (compName, parentId, childId) => {
    return {
        type: "EDIT/INSERT",
        payload: [ compName, parentId, childId ]
    }
}

export const deleteComp = id => {
    return {
        type: "EDIT/DELETE",
        payload: id
    }
}

export const moveComp = (id, oldParent, newParent, index) => {
    return {
        type: "EDIT/MOVE",
        payload: [ id, oldParent, newParent, index ]
    }
}

export const replaceComp = (parentId, childId, compName) => {
    return dispatch => {
        dispatch(insertComp(parentId, childId, compName));
        dispatch(deleteComp(childId));
    }
}

export const selectedComp = id => {
    return {
        type: "EDIT/SELECTED_COMP",
        payload: id
    }
}

// export const insertPlaceholder = (parentId, childId) => {
//     return dispatch => {
//         dispatch(clearPlaceholder());
//         dispatch({
//             type: "EDIT/INSERT_PLACEHOLDER",
//             payload: [ parentId, childId ]
//         });
//     }
// }

// export const clearPlaceholder = () => {
//     return {    
//         type: "EDIT/CLEAR_PLACEHOLDER"
//     }
// }

// export const replacePlaceholder = (compName, placeholderId) => {
//     return dispatch => {
//         dispatch(insertComp(compName, null, placeholderId));
//         dispatch(clearPlaceholder());
//     }
// }

export const toggleEditing = () => {
    return {
        type: "EDIT/TOGGLE"
    }
}
export const getBody = () => {
    return {
        type: "BODY_COMPONENTS/GET",
    }
}

export const insertComp = (compName, parentId, childId, props={}) => {
    return {
        type: "EDIT/INSERT",
        payload: [ compName, parentId, childId, props ]
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

export const toggleEditing = () => {
    return dispatch => {
        dispatch(selectedComp(''));
        dispatch({type: "EDIT/TOGGLE"});
    }
}
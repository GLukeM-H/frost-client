export const getBody = () => {
    return {
        type: "BODY_COMPONENTS/GET",
    }
}

export const insertComp = (parentId, childId, compName='EmptyBlock') => {
    return {
        type: "EDIT/INSERT",
        payload: {parentId, childId, compName}
    }
}

export const deleteComp = id => {
    return {
        type: "EDIT/DELETE",
        payload: id
    }
}

export const replaceComp = (parentId, childId, compName) => {
    return dispatch => {
        dispatch(insertComp(parentId, childId, compName));
        dispatch(deleteComp(childId));
    }
}

export const toggleEditing = () => {
    return {
        type: "EDIT/TOGGLE"
    }
}
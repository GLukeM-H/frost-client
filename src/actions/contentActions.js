export const getBody = () => {
    return {
        type: "GET_BODY_COMPONENTS",
        payload: null
    }
}

export const addComp = compName => {
    return {
        type: "ADD_COMP",
        payload: compName
    }
}

export const insertAfter = ({parentId, childId}) => {
    return {
        type: "INSERT_AFTER",
        payload: { parentId, childId }
    }
}

export const toggleEditing = () => {
    return {
        type: "TOGGLE_EDITING"
    }
}
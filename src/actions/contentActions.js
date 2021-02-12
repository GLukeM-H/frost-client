export const getBody = () => {
    return {
        type: "GET_BODY_COMPONENTS",
        payload: null
    }
}

export const addComp = compClass => {
    return {
        type: "ADD_COMP",
        payload: compClass
    }
}

export const insertAfter = parentId => {
    return {
        type: "INSERT_AFTER",
        payload: parentId
    }
}


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

export const insertComp = parentInState => {
    return {
        type: "INSERT_COMP",
        payload: parentInState
    }
}


export const getBody = () => {
    return {
        type: "GET_BODY_COMPONENTS",
        payload: null
    }
}

export const addDiv = text => {
    return {
        type: "ADD_DIV",
        payload: text
    }
}

export const addLink = linkTo => {
    return {
        type: "ADD_LINK",
        payload: linkTo
    }
}

export const addText = text => {
    return {
        type: "ADD_TEXT",
        payload: text
    }
}


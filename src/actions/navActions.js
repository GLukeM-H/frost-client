export const toggleNav = () => {
    return {
        type: "NAV/TOGGLE"
    }
}

export const toggleTools = () => {
    return {
        type: "TOOLS/TOGGLE"
    }
}

export const setToolsView = payload => {
    return {
        type: "TOOLS/SET_VIEW",
        payload
    }
}
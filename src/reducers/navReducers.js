
const initState = {
    navIsOpen: false,
    toolsOpen: false
}

const navReducer = (state = initState, action) => {
    switch (action.type) {
        case "TOGGLE_NAV":
            return {...state, navIsOpen: !state.navIsOpen};
        case "TOGGLE_TOOLS":
            return {...state, toolsOpen: !state.toolsOpen};
        default:
            return state;
    }
}

export default navReducer;
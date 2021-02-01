
const initState = {
    navIsOpen: false
}

const navReducer = (state = initState, action) => {
    switch (action.type) {
        case "TOGGLE_NAV":
            return {...state, navIsOpen: !state.navIsOpen};
        default:
            return state;
    }
}

export default navReducer;
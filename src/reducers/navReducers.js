import { initState } from '../data/navReducerConstants';


const navReducer = (state = initState, action) => {
    switch (action.type) {
        case "NAV/TOGGLE":
            return { ...state, navIsOpen: !state.navIsOpen };
        case "TOOLS/TOGGLE":
            return { ...state, toolsOpen: !state.toolsOpen };
        case "TOOLS/SET_VIEW":
            return { ...state, toolsView: action.payload };
        default:
            return { ...state };
    }
}

export default navReducer;
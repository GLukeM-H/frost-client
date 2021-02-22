import { produce } from 'immer';
import { INIT_STATE } from '../data/navReducerConstants';

const navReducer = produce((draft, action) => {
    switch (action.type) {
        case "NAV/TOGGLE":
            draft.navIsOpen = !draft.navIsOpen;
            return
        case "TOOLS/TOGGLE":
            draft.toolsOpen = !draft.toolsOpen;
            return
        case "TOOLS/SET_VIEW":
            draft.toolsView = action.payload;
            return
    }
}, INIT_STATE);

export default navReducer;
import { produce } from 'immer';
import {
    insertComponent,
    deleteComponent,
    moveComponent,
    newComponent
} from '../helpers/contentStateHelpers';
import { v4 as uuid } from 'uuid';
import { ROOT_COMP, INIT_STATE } from '../data/contReducerConstants';

const contentReducer = produce((draft, action) => {
    switch (action.type) {
        case "BODY_COMPONENTS/GET":
            newComponent(draft, 'Container', ROOT_COMP, null);
            return
        case "EDIT/INSERT":
            insertComponent(draft, uuid(), ...action.payload);
            return
        case "EDIT/DELETE":
            deleteComponent(draft, action.payload);
            return
        case "EDIT/MOVE":
            moveComponent(draft, ...action.payload);
            return
        case "EDIT/SELECTED_COMP":
            draft.selected = action.payload;
            return
        case "EDIT/TOGGLE":
            draft.editing = !draft.editing;
            return
    }
}, INIT_STATE);


export default contentReducer;
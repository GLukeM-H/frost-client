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
        case "BODY/GET":
            if (action.payload.length){
                draft.contentComp = action.payload[0].contentComp;
                draft.contentCompId = action.payload[0]._id;
            } else {
                newComponent(draft, 'Grid', ROOT_COMP, null, {isContainer: true});
            }
            draft.loading = false;
            return
        case "BODY/SAVE":
            draft.contentCompId = action.payload;
            draft.savedChanges = true;
            return
        case "BODY/LOADING":
            draft.loading = true;
            return
        case "EDIT/INSERT":
            insertComponent(draft, uuid(), ...action.payload);
            draft.savedChanges = false;
            return
        case "EDIT/DELETE":
            deleteComponent(draft, action.payload);
            draft.savedChanges = false;
            return
        case "EDIT/MOVE":
            moveComponent(draft, ...action.payload);
            draft.savedChanges = false;
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
import {
    insertComponent,
    deleteComponent,
    moveComponent
} from '../helpers/contentStateHelpers';
import { v4 as uuid } from 'uuid';
import { ROOT_COMP, INIT_STATE } from '../data/contReducerConstants';

const contentReducer = (state = INIT_STATE, action) => {
    var newId;
    switch (action.type) {
        case "BODY_COMPONENTS/GET":
            return {
                ...state,
                contentComp: { 
                    [ROOT_COMP]: { ...state.contentComp[ROOT_COMP], comp: 'Container', inner: ''}
                }
            };
        case "EDIT/INSERT":
            return insertComponent(state, uuid(), ...action.payload);
        case "EDIT/DELETE":
            return deleteComponent(state, action.payload);
        case "EDIT/MOVE":
            return moveComponent(state, ...action.payload);
        case "EDIT/INSERT_PLACEHOLDER":
            newId = uuid();
            return { ...insertComponent(state, newId, 'EmptyBlock', ...action.payload), placeholderId: newId}
        case "EDIT/CLEAR_PLACEHOLDER":
            if (state.placeholderId){
                return { ...deleteComponent(state, state.placeholderId), placeholderId: null};
            } else {
                return { ...state }
            }
        case "EDIT/TOGGLE":
            return { ...state, editing: !state.editing };
        default:
            return { ...state };
    }
}

export default contentReducer;
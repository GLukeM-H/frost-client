import { createComp } from '../helpers/createComp';
import { v4 as uuid } from 'uuid';

const initState = {
    contentComp: (
        <div>
            Loading page...
        </div>
    ),
    editing: false,
    insertId: null,
    addCompError: null
}

const contentReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_BODY_COMPONENTS":
            return {
                ...state,
                contentComp: { 
                    rootComp: { comp: createComp['Container']('rootComp'), childIds: [], parentId: null }}};
        case "ADD_COMP":
            let id = state.insertId;

            if (id) {
                return {
                    ...state, 
                    contentComp: {
                        ...state.contentComp,
                        [id]: { ...state.contentComp[id], comp: createComp[action.payload](id) }},
                    insertId: null};
            } else {
                alert('No component selected');
                return { ...state };
            }
        case "INSERT_AFTER":
            let { parentId, childId } = action.payload;
            let newId = uuid();
            let childIds = state.contentComp[parentId].childIds;
            let index = childId ? childIds.indexOf(childId) : 0;

            return {
                ...state,
                contentComp:{
                    ...state.contentComp,
                    [parentId]: {
                        ...state.contentComp[parentId],
                        childIds: childIds.slice(0, index).concat(newId, childIds.slice(index))},
                    [newId]: { comp: createComp['EmptyBlock'](newId), childIds: [], parentId }},
                insertId: newId};
        case "TOGGLE_EDITING":
            return { ...state, editing: !state.editing };
        default:
            return { ...state };
    }
}

export default contentReducer;
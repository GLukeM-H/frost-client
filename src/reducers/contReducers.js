import { createComp } from '../helpers/createComp';
import { v4 as uuid } from 'uuid';

const insertComponent = (state, compName, id, parentId, index) => {
    var childIds = state.contentComp[parentId].childIds;

    return {
        ...state,
        contentComp: {
            ...state.contentComp,
            [parentId]: {
                ...state.contentComp[parentId],
                childIds: childIds.slice(0, index).concat(id, childIds.slice(index))
            },
            [id]: { comp: createComp[compName](id), childIds: [], parentId }
        }
    };
}

const deleteComponent = (state, id) => {

    var newState = state;
    for (var i in state.contentComp[id].childIds) {
        newState = deleteComponent(newState, state.contentComp[id].childIds[i]);
    }

    var parentId = newState.contentComp[id].parentId;
    var newContentComp = parentId ? (
        {
            ...newState.contentComp,
            [parentId]: {
                ...newState.contentComp[parentId],
                childIds: newState.contentComp[parentId].childIds.filter(childId => childId !== id)
            }
        }
    ) : ({...newState.contentComp});
    
    delete newContentComp[id];

    return {
        ...newState,
        contentComp: newContentComp
    }

}

const moveComponent = (state, id, oldParentId, newParentId, index) => {
    let oldChildIds = state.contentComp[oldParentId].childIds;
    let newChildIds = state.contentComp[newParentId].childIds;

    return {
        ...state,
        contentComp: {
            ...state.contentComp,
            [oldParentId]: {
                ...state.contentComp[oldParentId],
                childIds: oldChildIds.filter(childId => childId !== id)
            },
            [newParentId]: {
                ...state.contentComp[newParentId],
                childIds: newChildIds.slice(0, index).concat(id, newChildIds.slice(index))
            },
        }
    }
}

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
        case "BODY_COMPONENTS/GET":
            return {
                ...state,
                contentComp: { 
                    rootComp: { comp: createComp['Container']('rootComp'), childIds: [], parentId: null }}};
        case "EDIT/INSERT":
            let { parentId, childId, compName } = action.payload;
            let index = childId ? state.contentComp[parentId].childIds.indexOf(childId) : 0;
            let newId = uuid();

            return insertComponent(state, compName, newId, parentId, index);
        case "EDIT/DELETE":
            return deleteComponent(state, action.payload);
        case "EDIT/TOGGLE":
            return { ...state, editing: !state.editing };
        default:
            return { ...state };
    }
}

export default contentReducer;
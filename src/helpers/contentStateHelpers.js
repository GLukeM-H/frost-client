import { createComp } from './createComp';
import { ROOT_COMP } from '../data/contReducerConstants';

export const insertComponent = (state, id, compName, parentId, childId) => {
    var index;
    if (childId) {
        if (!parentId) {
            parentId = state.contentComp[childId].parentId;
        }
        index = state.contentComp[parentId].childIds.indexOf(childId);
    } else {
        if (!parentId) {
            parentId = ROOT_COMP;
        }
        index = state.contentComp[parentId].childIds.length;
    }
    
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

export const deleteComponent = (state, id) => {
    if (!state.contentComp[id]) {return { ...state }}
    
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

export const moveComponent = (state, id, oldParentId, newParentId, index) => {
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

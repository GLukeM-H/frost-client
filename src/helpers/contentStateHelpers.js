import { ROOT_COMP } from '../data/contReducerConstants';

export const newComponent = (state, compName, id, parentId, props) => {
    state.contentComp[id] = {
        comp: compName,
        props: { key: id, id, ...props },
        inner: '',
        childIds: [],
        parentId
    };
}

export const insertComponent = (state, id, compName, parentId, childId, props) => {
    var index;
    // handle default cases
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
    
    state.contentComp[parentId].childIds.splice(index,0,id);
    newComponent(state, compName, id, parentId, props);
}

export const deleteComponent = (state, id) => {
    if (!state.contentComp[id]) {return}
    
    for (var i in state.contentComp[id].childIds) {
        deleteComponent(state, state.contentComp[id].childIds[i]);
    }

    var parentId = state.contentComp[id].parentId;
    if (parentId){
        state.contentComp[parentId].childIds = state.contentComp[parentId].childIds.filter(child => child !== id);
    }
    
    delete state.contentComp[id];
}

export const moveComponent = (state, id, oldParentId, newParentId, index) => {

    state.contentComp[oldParentId].childIds = state.contentComp[oldParentId].childIds.filter(child => child !== id);
    state.contentComp[newParentId].childIds.splice(index,0,id);
    state.contentComp[id].parentId = newParentId;
}


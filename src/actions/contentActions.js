import axios from 'axios';

export const getBody = () => dispatch => {
    dispatch(setBodyLoading());
    axios.get('/api/pages').then(res => 
        dispatch({
            type: "BODY/GET",
            payload: res.data
        })
    );
}

export const saveBody = (contentComp, contentCompId) => dispatch => {
    axios
        .post('api/pages', { contentComp, creator: "Luke" })
        .then( res => {
            if (contentCompId) {
                axios.delete('api/pages/' + contentCompId)
                    .catch( e => {console.log(e); alert(e)})
            }
            dispatch({ type: "BODY/SAVE", payload: res.data._id });
        })
        .catch( e => { console.log(e); alert(e); })
}

export const setBodyLoading = () => {
    return {
        type: "BODY/LOADING"
    }
}

export const insertComp = (compName, parentId, childId, props={}) => {
    return {
        type: "EDIT/INSERT",
        payload: [ compName, parentId, childId, props ]
    }
}

export const deleteComp = id => {
    return {
        type: "EDIT/DELETE",
        payload: id
    }
}

export const moveComp = (id, oldParent, newParent, index) => {
    return {
        type: "EDIT/MOVE",
        payload: [ id, oldParent, newParent, index ]
    }
}

export const replaceComp = (parentId, childId, compName) => dispatch => {
        dispatch(insertComp(parentId, childId, compName));
        dispatch(deleteComp(childId));
}

export const selectedComp = id => {
    return {
        type: "EDIT/SELECTED_COMP",
        payload: id
    }
}

export const toggleEditing = () => dispatch => {
        dispatch(selectedComp(''));
        dispatch({type: "EDIT/TOGGLE"});
}
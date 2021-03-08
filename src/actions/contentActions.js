import axios from 'axios';

/*~~~~~ Body Actions ~~~~~*/
export function getBody() {
    return dispatch => {

        dispatch(setBodyLoading());
        axios.get('/api/pages').then(res => 
            dispatch({
                type: "BODY/GET",
                payload: res.data
            })
        );
    }
}

export function saveBody (contentComp, contentCompId) {
    return dispatch => {
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
}

export function setBodyLoading() {
    return {
        type: "BODY/LOADING"
    }
}

/*~~~~~ Edit Actions ~~~~~*/
export function setSelected(id) {
    return {
        type: "EDIT/SET_SELECTED",
        payload: id
    }
}

export function disableParent(id) {
    return {
        type: "EDIT/DISABLE_PARENT",
        payload: id
    }
}

export function enableParent(id) {
    return {
        type: "EDIT/ENABLE_PARENT",
        payload: id
    }
}

export function toggleEditing() {
    return dispatch => {
        dispatch(setSelected(''));
        dispatch({type: "EDIT/TOGGLE"});
    }
}

export function insertComp(compName, parentId, childId, props={}) {
    return {
        type: "EDIT/INSERT",
        payload: [ compName, parentId, childId, props ]
    }
}

export function deleteComp(id) {
    return dispatch => {
        dispatch(setSelected(''))
        dispatch({
            type: "EDIT/DELETE",
            payload: id
        })
    }
}

export function deleteChildren(id) {
    return {
        type: "EDIT/DELETE_CHILDREN",
        payload: id
    }
}

export function moveComp(id, oldParent, newParent, index) {
    return {
        type: "EDIT/MOVE",
        payload: [ id, oldParent, newParent, index ]
    }
}

export function replaceComp(parentId, childId, compName) {
    return dispatch => {
        dispatch(insertComp(parentId, childId, compName));
        dispatch(deleteComp(childId));
    }
}

export function setInner(id,inner) {
    return {
        type: "EDIT/SET_INNER",
        payload: {id, inner}
    }
}

export function setProps(id, props) {
    return {
        type: "EDIT/SET_PROPS",
        payload: {id, props}
    }
}

export function toggleEditInner(id) {
    return {
        type: "EDIT/TOGGLE_EDIT_INNER"
    }
}
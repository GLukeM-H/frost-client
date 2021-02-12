import { createComp } from '../helpers/createComp';
import { v4 as uuid } from 'uuid';

const initState = {
    contentComp: (
        <div>
            Loading page...
        </div>
    ),
    editing: false,
    newComp: null
}

const contentReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_BODY_COMPONENTS":
            return {...state,
                    contentComp: { 
                        root: { comp: createComp['Container']('root'), inner: [] }}};
        case "ADD_COMP":
            let newId = uuid();
            return {
                ...state, 
                contentComp: {...state.contentComp, [newId]: createComp[action.payload](newId)},
                newComp: newId
            };
        case "INSERT_AFTER":
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default contentReducer;
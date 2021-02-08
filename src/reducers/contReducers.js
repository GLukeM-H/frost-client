import EmptyBlock from '../components/EmptyBlock';
import Row from '../components/content/Row';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

const connectState = (comp, id) => {
    let mapStateToProps = state => ({
        state: state.contentState.contentComp[id]
    });
    
    return connect(mapStateToProps, {})(comp);
}

const createComp = {
    'Row': id => <Row id={id} />
}

const initState = {
    contentComp: (
        <div>
            Loading page...
        </div>
    )
}

var space = Array(100).fill(<br />);

const bodyTemp = (
        <div>
            <EmptyBlock />
            {space}
        </div>
    );


const contentReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_BODY_COMPONENTS":
            return {...state, contentComp: { root: bodyTemp }};
        case "ADD_COMP":
            let newId = uuid();
            return {
                ...state, 
                contentComp: {...state.contentComp, [newId]: createComp[action.payload](newId)},
                newComp: newId
            };
        default:
            return state;
    }
}

export default contentReducer;
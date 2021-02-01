
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
            <p>Here's the body component that should come from the database (but isn't right now).</p>
            {space}
        </div>
    );


const contentReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_BODY_COMPONENTS":
            return {...state, contentComp: bodyTemp};
        case "ADD_TEXT":
            return {...state, text: action.payload};
        case "ADD_DIV":
            return {...state, div: (<div>{action.payload}</div>)};
        case "ADD_LINK":
            return {...state, div: (<a href={`https://${action.payload}`} target="_blank" rel="noreferrer">{action.payload}</a>)};
        default:
            return state;
    }
}

export default contentReducer;
const SET_ID = 'SET_ID';
const RESET = 'RESET';

const initialState = {
    Group: null,
    InvoiceEdit: null
}

const editReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ID:
            return {
                ...state,
                [action.payload.key]: action.payload.id
            }
        
        case RESET:
            return {
                ...initialState
            }
        default:
            return initialState;
    }
}

const setId = (key, id) => async dispatch => {
    dispatch({ type: SET_ID, payload: {key, id} });
}

const reset = () => async dispatch => {
    dispatch({ type: RESET });
}

export const actions = {
    setId,
    reset
}

export default editReducer;
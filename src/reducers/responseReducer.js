import initialState from './initialState';

const responseReducer = (state = initialState.response, action) => {
    switch (action.type) {
        case 'RESPONSE_REQUEST':
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case 'RESPONSE_SUCCESS':
            return {
                ...state,
                fetching: false,
                error: null,
                data: action.data,
            };
        case 'RESPONSE_FAILURE':
            return {
                ...state,
                fetching: false,
                error: action.data,
            };
        default:
            return state;
    }
};

export default responseReducer;
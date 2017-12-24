export const initialState = {
    config: {
        auth: {
            host: '',
            port: '',
            login: '',
            password: '',
        },
        learningThreshold: 50,
        categories: [],
    },
    response: {
        fetching: false,
        error: null,
        data: {},
    },
    messages: {
        fetching: false,
        error: null,
        data: []
    }
};
export default initialState;

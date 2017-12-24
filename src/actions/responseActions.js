import * as types from './_types';
import { store } from '../store/configureStore';
function mailcatRequest() {
    return {
        type: types.RESPONSE_REQUEST,
        fetching: true,
        error: null,
    };
}

function mailcatSuccess(json) {
    return {
        type: types.RESPONSE_SUCCESS,
        fetching: false,
        error: null,
        data: json,
    }
}

function mailcatFailure(json) {
    return {
        type: types.RESPONSE_FAILURE,
        fetching: false,
        error: json
    };
}

export function request(query='', method='GET', headers, body='') {

    const url = `http://localhost:8080/${query}`;

    return (dispatch) => {
        dispatch(mailcatRequest());
        fetch(url, {
            headers: headers,
            method: method,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then (items => dispatch(mailcatSuccess(items)))
            .then (() => console.log(store.getState()))
            .catch (error => dispatch(mailcatFailure(error)));
    };

}


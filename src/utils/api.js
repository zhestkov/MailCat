import * as actions from '../actions/responseActions';
import * as apis from './api_list';

export function getFolders(config) {
    actions.request(apis.API_POST_FOLDERS, 'POST', {
        "Accept": "application/json"
    }, config);
}
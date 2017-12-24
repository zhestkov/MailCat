import * as actions from '../actions/foldersActions';
import * as apis from './api_list';

export function getFolders(config) {
    actions.getFolders(apis.API_POST_FOLDERS, 'POST', {
        "Accept": "application/json"
    }, config);
}
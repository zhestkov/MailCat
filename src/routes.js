import React from 'react';
import { Route, Switch} from 'react-router';
import Home from './containers/Home';
import App from './components/App';
import Callback from "./containers/Callback";
import Playlist from "./containers/Playlist";
import NewReleases from "./containers/NewReleases";
import TrackList from "./containers/TrackList";
// import { BrowserRouter }  from 'react-router-dom';

export const routes = (
    <Switch>
        <App>
            <Route exact='/' component={Home}/>
            <Route exact path='/playlists' component={Playlist}/>
            <Route path='/playlists/:ids' component={TrackList}/>
            <Route path='/releases' component={NewReleases}/>
            <Route path='/login/callback' component={Callback} />
        </App>
    </Switch>

);

export default routes;
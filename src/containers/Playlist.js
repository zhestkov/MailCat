import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '../components/List/List';
import * as actions from '../actions/spotifyActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Auth} from "../components/Auth/Auth";
import './Playlist.css';

class Playlist extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props.actions);
        this.props.actions.searchSpotify('users/' + this.props.profile.data.id + '/playlists', this.props.spotify.token);
    }

    render() {
        const { spotify, profile } = this.props;
        return (
            <div className='playlist-row text-centered'>
                {
                    (spotify.token.length > 1) ?
                        (spotify.data.items && spotify.data.items.length > 0) ? (
                            <div>
                                <h2>Your playlists:</h2>
                                <List spotify={spotify}/>
                            </div>
                        ) : (<h2>You have no playlists</h2>)
                        : (<Auth/>)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { spotify, profile } = state;
    return {
        spotify,
        profile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Playlist);
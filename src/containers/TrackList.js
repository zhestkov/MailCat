import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../actions/spotifyActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TracksOfList from '../components/TracksOfList/TracksOfList';

class TrackList extends Component {

    componentWillMount() {
        const { spotify, profile } = this.props;
        console.log("PARAMS.ID: " + this.props.match.params.ids);
        const ids = this.props.match.params.ids.split(',');
        this.props.actions.searchSpotify(
            // 'users/' + ids[0] + '/playlists/' + ids[1] + '/tracks', spotify.token);
            `users/${ids[0]}/playlists/${ids[1]}/tracks`, spotify.token);
    }

    render() {
        const { spotify } = this.props;
        return (
            <div className='tracklist'>
                <h2>Songs:</h2>
                <TracksOfList spotify={spotify}/>
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
) (TrackList);
import React, { Component } from 'react';
import './TracksOfList.css';

export class TracksOfList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { spotify } = this.props;
        return (
            <div className='tracks-container'>
                {
                    spotify.data.items && spotify.data.items.map((item, index) =>
                            <li className='track-item' key={index}>
                                {console.log(item)}
                                <img src={item.track.album.images[2].url}/>
                                <p>{item.track.artist.name} –– {item.track.name}</p>
                            </li>
                    )
                }
                </div>
        )
    }
}
export default TracksOfList;
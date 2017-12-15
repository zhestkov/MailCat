import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './List.css'

class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {spotify} = this.props;
        return (

            <div className='list-container'>

                {
                    spotify.data.items && spotify.data.items.map((item, index) =>
                        <div className='list-item' key={index}>
                            <Link to={`/playlists/${item.owner.id},${item.id}`}><img src={item.images[0].url} alt={item.name} /></Link>
                            <p>{ item.name }</p>

                        </div>
                    )
                }
            </div>
        )
    }
}
export default List;
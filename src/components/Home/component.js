import React, { Component } from 'react';
import './Home.css';
import { store } from '../../store/configureStore'

export class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { messages } = this.props;
        return (
            <div>
                <div className="content">
                    <div className="container" id="inbox-head">
                        <div className="row">
                            <p1>You have <span id="email-list-size">{this.props.messages.data.length}</span> new Emails</p1>
                        </div>
                        {/*<div className="row">*/}
                            {/*<p1>To see more, check the list below</p1>*/}
                        {/*</div>*/}
                    </div>
                    <div className="container" id="inbox-list">
                        <ul>
                            {
                                messages.data.length > 0 && messages.data.map((msg, index) =>
                                <li>Sender: {msg.sender}, Subject: {msg.subject}, newCategory: {msg.category}</li>
                                )
                            }
                        </ul>

                    </div>

                    {/*<div className="container" id="test">*/}
                        {/*<button className="btn btn-dark" id="test-btn">Add New</button>*/}
                    {/*</div>*/}

                </div>
            </div>
            )

    }

}
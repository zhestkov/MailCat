import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as configActions from '../../actions/configActions';
import * as responseActions from '../../actions/responseActions';
import * as messageActions from '../../actions/messageActions';
import './common.css';
import * as apis from '../../utils/api_list';
import FolderItem from './folderItem'

const FETCH_MESSAGES_INTERVAL = 6000;

class Common extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailInput: '',
            passwordInput: '',
            hostInput: '',
            portInput: '',
            tresholdInput: '',
        };
        this.saveSettings = this.saveSettings.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleHost = this.handleHost.bind(this);
        this.handlePort = this.handlePort.bind(this);
        this.handleTreshold = this.handleTreshold.bind(this);
        this.initialize = this.initialize.bind(this);
        this.getMessages = this.getMessages.bind(this);

    }

    handleEmail(event) {
        this.setState({emailInput: event.target.value});
    }
    handlePassword(event) {
        this.setState({passwordInput: event.target.value});
    }
    handleHost(event) {
        this.setState({hostInput: event.target.value});
    }
    handlePort(event) {
        this.setState({portInput: event.target.value});
    }
    handleTreshold(event) {
        this.setState({tresholdInput: event.target.value});
    }

    saveSettings() {
        const { config } = this.props;
        const new_config = {
            auth: {
                host: this.state.hostInput,
                port: this.state.portInput,
                login: this.state.emailInput,
                password: this.state.passwordInput,
            },
            learningThreshold: this.state.tresholdInput,
            categories: [],
        };
        this.props.actions.updateConfig(new_config);
        const toSend = {
            email: new_config.auth.login,
            password: new_config.auth.password,
            learningThreshold: new_config.learningThreshold,
            host: new_config.auth.host,
            port: new_config.auth.port
        };

        console.log('toSend:');
        console.log(toSend);
        //const res = apis.getFolders(toSend);
        this.props.actions.request(apis.API_POST_FOLDERS, 'POST', {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, toSend);

    }
    initialize() {
        const {actions} = this.props;
        const {config} = this.props;
        const url = `http://localhost:8080/${apis.API_POST_INIT}`;
        const toSend = {
            email: config.auth.login,
            password: config.auth.password,
            categories: config.categories,
            learningThreshold: config.learningThreshold,
            host: config.auth.host,
            port: config.auth.port
        };
        console.log('init toSend:');
        console.log(JSON.stringify(toSend));

        fetch(
            url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(toSend)
            })
            .then (() => console.log('Init config is sent successfully'))
            .then (() => this.getMessages())
            .catch(error => this.props.actions.mailcatFailure(error));

    }

    getMessages() {
        const { actions } = this.props;
        let timerId = setTimeout(function cycle() {
            actions.getMessages(
                apis.API_GET_CATEGORIZED_LIST,
                'GET',
                {
                    'Accept': 'application/json',
                }
            );
            timerId = setTimeout(cycle, FETCH_MESSAGES_INTERVAL);
        });


    }
    render() {
        const { response } = this.props;
        const foldersList = Object.keys(response.data).map((key, index) =>
            <FolderItem folderName={response.data[key].name} key={index}/>
        );
        return (
            <div className='app-container'>
                <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand text-light">
                            <img src={require('../../img/mailcat.jpg')} id="logo" className="d-inline-block align-top" alt="" />
                            MailCat
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar7">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse justify-content-stretch" id="navbar7">
                            <ul className="navbar-nav nav-fill">
                                <li className="nav-item">
                                    <Link to='/'><a className="nav-link" rel="nofollow" id="scrollup">Home</a></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='#settings'>
                                        <a className="nav-link" id="settings" data-toggle="modal" data-target="#modal-settings">Settings</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/faq'><a className="nav-link">FAQ</a></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>


                <div className="modal fade" aria-hidden="true" id="modal-settings">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Settings</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group row">
                                    <div className="col-12">
                                        <label for="inputEmail" className="sr-only">Email address</label>
                                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus
                                               value={this.state.emailInput} onChange={this.handleEmail} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-12">
                                        <label for="inputPassword" className="sr-only">Password</label>
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required
                                               value={this.state.passwordInput} onChange={this.handlePassword} />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-12">
                                        <label for="inputHost" className="sr-only" >Host</label>
                                        <input type="url" id="inputHost" className="form-control" placeholder="Host" required
                                               value={this.state.hostInput} onChange={this.handleHost}/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-12">
                                        <label for="inputPort" className="sr-only" >Port</label>
                                        <input id="inputPort" className="form-control" placeholder="Port" required
                                               value={this.state.portInput} onChange={this.handlePort}/>
                                    </div>
                                </div>

                                <div className="form-group row slider-group">
                                    <div className="col-sm-6">Learning Threshold: <span id="learning-slider-value">30</span></div>
                                    <div className="col-sm-6 col-xs-12">
                                        <input id="count-slider" data-slider-min="10" data-slider-max="50" data-slider-step="1" data-slider-value="30" data-slider-id="learning-threshold-slider" type="text" value="30"
                                               value={this.state.tresholdInput} onChange={this.handleTreshold} />
                                    </div>
                                </div>
                            </div>

                            <div className='folders-container'>
                                <ul className='list-group'>
                                    {
                                    response.data&& foldersList
                                    }
                                </ul>

                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={this.saveSettings}>OK</button>
                                {
                                    (Object.keys(response.data).length > 0) &&
                                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.initialize}>Run MailCat</button>
                                }
                            </div>

                        </div>

                    </div>

                </div>

                {this.props.children}

                <footer>
                    <div>
                        <b>Contact us: team5kspt@gmail.com</b> <br />
                        The "MailCat" application is provided as is without any guarantees or warranty.
                    </div>
                </footer>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { config, response, messages } = state;
    return {
        config,
        response,
        messages
    }
};

const mapDispatchToProps = (dispatch) => {
    const actions = {
        ...responseActions,
        ...configActions,
        ...messageActions,
    };
    return {
        actions: bindActionCreators(actions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (Common);

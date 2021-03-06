import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';


import Common from './components/Common/component';
import Home  from './components/Home/';
import FaqPage from './components/FAQ/FaqPage';

export class Routes extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router history={this.props.history}>
                <Switch>
                    <Common>
                        <Route exact path='/' component={Home}/>
                        <Route path='/faq' component={FaqPage} />
                    </Common>
                </Switch>
            </Router>
        </Provider>
    );
  }
}

export default Routes;

// export default connect(mapStateToProps)(Routes);
// export { Routes };


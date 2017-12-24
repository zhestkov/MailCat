import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HomePage } from "./component";
import * as configActions from '../../actions/configActions';
import * as responseActions from '../../actions/responseActions';
import * as messageActions from '../../actions/messageActions';
import { bindActionCreators } from 'redux';



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
        ...messageActions
    };
    return {
        actions: bindActionCreators(actions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (HomePage);

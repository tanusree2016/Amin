import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

class DefaultPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
        }
    }
    render() {
        return(
        <div> <b>You have no permission</b> </div>
        )
    }

}

export default DefaultPage;
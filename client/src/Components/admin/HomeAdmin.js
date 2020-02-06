import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

class HomeAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = { 
        }
    }
    render() {
        return(
        <div> <b>Welcome to Eclipsia! You are in Dashboard, which will build gradually</b> </div>
        )
    }

}

export default HomeAdmin;
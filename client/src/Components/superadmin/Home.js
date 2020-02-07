import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { 
        }
    }
    render() {
        return(
        <div> <b>Welcome!!</b> </div>
        )
    }

}

export default Home;
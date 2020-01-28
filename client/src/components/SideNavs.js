import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import Submenu from './Submenu'
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom'

import ListMenu from './ListMenu'
class SideNavs extends React.Component {
    render() {
        return (

            <div style={{position:"fixed"}}>

               
                <ListMenu/>

                <div style={{ marginLeft: "255px" }}>
                    {/* <BigCalendar /> */}

                </div>
            </div>
        );
    }
}
export default withRouter(SideNavs);

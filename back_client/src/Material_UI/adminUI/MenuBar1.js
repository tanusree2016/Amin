import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const styles = {
    list: {
        width: 250,
    },
    links: {
        textDecoration: 'none',
    },
    menuHeader: {
        paddingLeft: '30px'
    },
};

class MenuBar1 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            getMenuPermission: JSON.parse(localStorage.getItem("menu") || "[]"),
        }
    }

    handleClick(item) {
        this.setState(prevState => (
          { [item]: !prevState[item] }
        ))
      }

    handler(children){
        console.log('I am in handler');
        console.log("Menu --- "+JSON.stringify(children))
    }

    render() {
        const { classes, drawerOpen, menuOptions } = this.props
        return (
            <div className={classes.list}>
                <Drawer
                    variant="persistent"
                    anchor="left"
                    open
                    classes={{ paper: classes.list }}>
                    <div>
                        <p>Helo u r here</p>

                        
                    </div>
                </Drawer>
            </div>
        )
    }

}
export default withStyles(styles)(MenuBar1)

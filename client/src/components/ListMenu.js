import React from "react";
import PropTypes from "prop-types";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        background: "#e9768d",
        borderBottom:"1px solid black",
        paddingTop: "2px",
        paddingBottom: "2px",
        color : "white"
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
        paddingTop: "2px",
        paddingBottom: "2px",
        background:"pink",
        borderBottom:"1px solid black",
        color : "white"
        

    }
});
function getItems() {
    var json = {
        list: [
            {
                id: 1,
             
                items: [
                    {
                        id: 1,
                        name: <Link to="/" style={{color:"white"}}> <i className="fa fa-dashboard"></i> Dashboard</Link>
                    },
                    {
                        id: 2,
                        name:  <Link to="/projects" style={{color:"white"}}>  <i class="fa fa-code-fork" style={{ fontSize: "17px", paddingRight: "5px" }}></i>Projects</Link>
                    },
                    {
                        id: 3,
                         name: "Reporting"
                         ,
                         //<text>
                        // <i class="fa fa-file-excel-o"></i> Reporting
                        // </text>,
                        subitems: [
                            {
                                id: 1,
                                name: <Link to="/projectssources" style={{color:"white"}}> Project Sources</Link>
                            },
                            {
                                id: 2,
                                name: <Link to="/projectbreakdown" style={{color:"white"}}> Project Breakdown</Link>
                            }, 
                            {
                                id: 3,
                                name: <Link to="/invoices" style={{color:"white"}}>Invoices</Link>
                            }, 
                            {
                                id: 4,
                                name: <Link to="/transaction" style={{color:"white"}}>Transactions</Link>
                            }, 
                            {
                                id: 5,
                                name: <Link to="/chartofaccounts" style={{color:"white"}}>Chart of Accounts</Link>
                            }, 
                            {
                                id: 6,
                                name: <Link to="/reports" style={{color:"white"}}>Reports</Link>
                            }
                        ]
                    },
                    {
                        id: 4,
                        name: <Link to="/bigcalendar" style={{color:"white"}}><i class="fa fa-calendar" style={{ paddingRight: "5px" }}></i>Calendar</Link>
                    },
                    {
                        id: 6,
                        name: <Link to="/tasks" style={{color:"white"}}><i class="fa fa-tasks" style={{ paddingRight: "5px" }}></i>Tasks</Link>
                    },
                    {
                        id: 7,
                     
                        name: "Utilities",
          
         
                        // <text>
                        // <i class="fa fa-briefcase"></i> Utilities
                        // </text>,
                        subitems: [
                            {
                                id: 1,
                                name: <Link to="/formlists" style={{color:"white"}}>Form List</Link>
                            },
                            {
                                id: 2,
                                name:  <Link to="/addressbook" style={{color:"white"}}> Address Book</Link>
                            },
                            {
                                id: 3,
                                name:  <Link to="/timetracker" style={{color:"white"}}>Time Tracker</Link>
                            }
                        ]
                    },
                    {
                        id: 8,
                        name: "Templates",
                        //  <text>
                        // <i class="fa fa-building-o"></i> Templates
                        // </text>,
                        subitems: [
                            {
                                id: 1,
                                name: <Link to="/scheduler" style={{color:"white"}}> Scheduler</Link>
                            },
                            {
                                id: 2,
                                name: <Link to="/forms" style={{color:"white"}}>Forms</Link>
                            },  {
                                id: 3,
                                name:  <Link to="/cannedemails" style={{color:"white"}}>Canned Emails</Link>
                            },
                            {
                                id: 4,
                                name: <Link to="/packages" style={{color:"white"}}>Packages</Link>
                            },
                            {
                                id: 5,
                                name:  <Link to="/workflow" style={{color:"white"}}>Workflow</Link>
                            },
                            {
                                id: 5,
                                name:  <Link to="/paymentschedule" style={{color:"white"}}>Payment Schedule</Link>
                            }
                        ]
                    },
                    {
                      id: 9,
                      name :<div style={{height:"315px"}}></div>

                    },
                    
                ]
            },
            
            
        ]
    };
    return json;
}
class NestedList extends React.Component {
    state = {};
    handleClick = e => {
        this.setState({ [e]: !this.state[e] });
    };
    render() {
        const items = getItems();
        const { classes } = this.props;
        return (
            <div style={{marginTop:"60px"}}> 
                {items.list.map(list => {
                    return (
                        <List
                            className={classes.root}
                            key={list.id}
                            subheader={
                                <ListSubheader>{list.title}</ListSubheader>
                            }
                        >
                            {list.items.map(item => {
                                return (
                                    <div key={item.id}>
                                        {item.subitems != null ? (
                                            <div key={item.id}>
                                                <ListItem
                                                className={classes.root}
                                                    button
                                                    key={item.id}
                                                    onClick={this.handleClick.bind(
                                                        this,
                                                        item.name
                                                    )}
                                                >
                                                    <ListItemText
                                                        primary={item.name}
                                                    />
                                                    {this.state[item.name] ? (
                                                        <ExpandLess />
                                                    ) : (
                                                        <ExpandMore />
                                                    )}
                                                </ListItem>
                                                <Collapse
                                                    key={list.items.id}
                                                    component="li"
                                                    in={this.state[item.name]}
                                                    timeout="auto"
                                                    unmountOnExit
                                                >
                                                    <List disablePadding>
                                                        {item.subitems.map(
                                                            sitem => {
                                                                return (
                                                                    <ListItem
                                                                        button
                                                                        key={
                                                                            sitem.id
                                                                        }
                                                                        className={
                                                                            classes.nested
                                                                        }
                                                                    >
                                                                        <ListItemText
                                                                            key={
                                                                                sitem.id
                                                                            }
                                                                            primary={
                                                                                sitem.name
                                                                            }
                                                                        />
                                                                    </ListItem>
                                                                );
                                                            }
                                                        )}
                                                    </List>
                                                </Collapse>{" "}
                                            </div>
                                        ) : (
                                            <ListItem
                                            className={classes.root}
                                                button
                                                onClick={this.handleClick.bind(
                                                    this,
                                                    item.name
                                                )}
                                                key={item.id}
                                            >
                                                <ListItemText
                                                    primary={item.name}
                                                />
                                            </ListItem>
                                        )}
                                    </div>
                                );
                            })}
                            <Divider key={list.id} absolute />
                        </List>
                    );
                })}
            </div>
        );
    }
}
NestedList.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(NestedList);

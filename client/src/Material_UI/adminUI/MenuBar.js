import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'
import SubscriptionIcon from '@material-ui/icons/Subscriptions';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CRMIcon from '@material-ui/icons/Chat'
import passvalue from '../../common/utils/passvalue'

var call = 0;
class MenuBar extends Component {
  constructor(props) {
    super(props)
    console.log("Hi test menu --- " + JSON.parse(localStorage.getItem("menu")))
    this.state = {
      getMenuPermission: JSON.parse(localStorage.getItem("menu") || "[]"),
      active: null,
    }
    this.state.getMenuPermission.splice(0, 0, { label: "DashBoard" })
    this.state.getMenuPermission = this.state.getMenuPermission.reduce((unique, o) => {
      console.log("Label --- " + o.label + " --- " + o.value)
      if (!unique.some(obj => obj.label === o.label && obj.value === o.value)) {
        unique.push(o);
      }
      console.log("this.state.getMenuPermission --- " + JSON.stringify(this.state.getMenuPermission))
      return unique;
    }, []);

    this.state.active = "DashBoard"

  }
  // this method sets the current state of a menu item i.e whether it is in expanded or collapsed or a collapsed state
  handleClick(item) {
    console.log("Click --- " + item)
    this.setState(prevState => (
      { [item]: !prevState[item] }
    ))
  }

  myColor(label, pos) {
    if (pos == 0 && call == 0) {
      label = label.replace(/"/g, '')
      label = label.replace(/"/g, '')
      call++;
      console.log("Label Check --- +++ " + label)
    }
    console.log("Label Check --- " + label)
    if (this.state.active === label) {
      return "#0083db";
    }

    return "";
  }

  toggle(e, label, pos) {
    if (this.state.active === label) {
      this.setState({ active: null })
    } else {
      this.setState({ active: label })
    }
    console.log("LABEL ---" + label + " ---- " + this.state.active)
    this.props.handler(e, label)
  }

  // if the menu item doesn't have any child, this method simply returns a clickable menu item that redirects to any location and if there is no child this method uses recursion to go until the last level of children and then returns the item by the first condition.
  handler(children) {
    console.log("Menu --- " + JSON.stringify(children))
    const { classes } = this.props
    const { state } = this

    return children.map((subOption, i) => {
      if (!subOption.children) {
        passvalue.submenulabel = subOption.label
        console.log("subOption.label --- " + JSON.stringify(subOption.label))
        let labelOption;
        labelOption = JSON.stringify(subOption.label).replace(/"/g, '')
        labelOption = JSON.stringify(subOption.label).replace(/"/g, '')
        console.log("subOption.label --- " + labelOption)
        return (
          <div key={subOption.label}>

            <ListItem style={{ background: this.myColor(JSON.stringify(subOption.label), i) }}
              button onClick={e => { this.toggle(e, JSON.stringify(subOption.label), i) }}
              key={subOption.label}>
              <ListItemIcon> <CRMIcon style={{ color: "#FFFFFF" }} /> </ListItemIcon>
              <Link style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                <ListItemText
                  primary={subOption.label}
                />
              </Link>
            </ListItem>
          </div>
        )
      }
      return (
        <div key={subOption.label}>
          <ListItem
            button
            onClick={() => this.handleClick(subOption.label)}>
            <ListItemIcon> <SubscriptionIcon style={{ color: "#FFFFFF" }} /> </ListItemIcon>
            <ListItemText
              primary={subOption.label} />
            {state[subOption.label] ?
              <ExpandLess /> :
              <ExpandMore />
            }
          </ListItem>
          <Collapse
            in={state[subOption.label]}
            timeout="auto"
            unmountOnExit >
            {this.handler(subOption.children)}
          </Collapse>
        </div>
      )
    })
  }


  render() {
    return (
      <div>
        <List style={{ color: '#FFFFFF' }}>
          {this.handler(this.state.getMenuPermission)}

        </List>
      </div>
    )
  }
}
export default (MenuBar)
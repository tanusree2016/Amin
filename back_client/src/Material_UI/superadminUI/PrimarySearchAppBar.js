import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Image from '../../img/eclipsia-logo.png'
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DashboardIcon from '@material-ui/icons/Dashboard'
import CreationIcon from '@material-ui/icons/Computer'
import CRMIcon from '@material-ui/icons/Chat'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import SubscriptionIcon from '@material-ui/icons/Subscriptions';
import MidsaleIcon from '@material-ui/icons/AddShoppingCartSharp';
import PostsaleIcon from '@material-ui/icons/AddShoppingCartRounded';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import TicketIcon from '@material-ui/icons/Sms';
import PublishIcon from '@material-ui/icons/Publish';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Company from '../../Components/superadmin/Company';
import PasswordChange from '../../Components/superadmin/PasswordChange';
import Subscription from '../../Components/superadmin/subscription/Subscription';
import LeadManagementView from '../../Components/superadmin/LeadManagementView';
import LeadManagement from '../../Components/LeadManagement';
import TicketManagement from '../../Components/superadmin/TicketManagement/Ticket';
import MenuAdd from '../../Components/superadmin/Menu/MenuAdd';
import Plan from '../../Components/superadmin/subscription/Plan';
import MidSales from '../../Components/superadmin/MidSales';
import Broadcast from '../../Components/superadmin/Publish/Publish'
import Link from '@material-ui/core/Link';
import Profile from '../../Components/superadmin/Profile/Profile';
import socketIO from 'socket.io-client';
import swal from 'sweetalert';
import Avatar from '@material-ui/core/Avatar';
import Home from '../../Components/superadmin/Home';
import Grid from '@material-ui/core/Grid';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    display: 'flex',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#0099FF",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icon: {
    color: "#FFFFFF"
  },

}));

var sales = false;

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [component, setComponent] = useState('dashboard');

  const [message, setMessage] = React.useState(false);

  const role = localStorage.getItem('role');

  let urlimg;
  console.log('profpic----' + localStorage.getItem('profilepic'))
  if (localStorage.getItem('profilepic') == '' || localStorage.getItem('profilepic') == null) {
    urlimg = 'http://localhost:5000/uploads/profile/avatar.png';
  } else {
    urlimg = 'http://localhost:5000/uploads/profile/' + localStorage.getItem('profilepic');
  }
  //let $urlimg ='http://localhost:5000/uploads/profile/'+localStorage.getItem('profilepic');

  var socket = socketIO('http://localhost:5000');
  socket.emit('join', { email: localStorage.getItem('email') });

  socket.on("new_msg", function (data) {
    console.log('heloo socjet--' + data.msg);
    swal(data.msg);
  });

  if (role === 'sales')
    sales = true

  function handleListItemClick(event, index) {
    console.log("Index --- " + index)
    setSelectedIndex(index);
    if (index == 0)
      setComponent("dashboard");
    if (index == 1)
      setComponent("company");
    if (index == 2)
      setOpen(!open);
    if (index == 2.1)
      setComponent("subscription");
    if (index == 2.2)
      setComponent("leadview");
    if (index == 2.3)
      setComponent("leadadd");
    if (index == 2.4)
      setComponent("ticketmanage")
    if (index == 2.6)
      setComponent("plan")
    if (index == 3)
      setOpen1(!open1);
    if (index == 3.1)
      setComponent("publish")
    if (index == 3.2)
      setComponent("midsales")

    if (index == 5)
      setComponent("menu");

  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMenuLogout() {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
    localStorage.clear();
    setComponent("logout");
  }

  function handleMenuPassword() {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
    setComponent("password");
  }

  function handleMenuProfile() {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
    setComponent("profile");
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  //   function handler() {
  //     this.setState({
  //         message: true
  //     });
  // }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}

    >

      <MenuItem onClick={handleMenuProfile}>Profile</MenuItem>
      <MenuItem onClick={handleMenuPassword}>Change Password</MenuItem>
      <Link style={{ color: '#000', textDecoration: 'none' }} href='/login/superadmin'><MenuItem onClick={handleMenuLogout}>Logout</MenuItem></Link>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose} >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >


          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  return (

    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar} >
        <CssBaseline />
        <Toolbar>
          <img src={Image} alt="logo" />
          &nbsp;&nbsp;
            <Typography className={classes.title} variant="h9">
            v3.0
            </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 1 new mails" color="inherit">
              <Badge badgeContent={1} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 2 new notifications" color="inherit">
              <Badge badgeContent={2} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton aria-label="show 2 new notifications" color="inherit">
              <Badge badgeContent={2} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              
            >
           
              <AccountCircle> <img src = {$urlimg } /></AccountCircle>
            </IconButton> */}
            {/* <img edge="end"  aria-controls={menuId} height="50px"  src = {$urlimg } onClick={handleProfileMenuOpen}/ >  */}

            <Grid container justify="center" alignItems="center">
              <Avatar alt="Remy Sharp" src={urlimg} onClick={handleProfileMenuOpen} />
            </Grid>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button selected={selectedIndex === 0} onClick={event => handleListItemClick(event, 0)}>
            <ListItemIcon><DashboardIcon className={classes.icon} /> </ListItemIcon>
            <ListItemText primary="Dashboard" style={{ color: '#FFFFFF' }} />
          </ListItem>
        </List>
        {!sales
          ? <List>
            <ListItem id button selected={selectedIndex === 1} onClick={event => handleListItemClick(event, 1)}>
              <ListItemIcon><CreationIcon className={classes.icon} /> </ListItemIcon>
              <ListItemText primary="Company" style={{ color: '#FFFFFF' }} />
            </ListItem>
          </List>
          :
          ''
        }
        <List>
          <ListItem button selected={selectedIndex === 2} onClick={event => handleListItemClick(event, 2)}>
            <ListItemIcon><CRMIcon className={classes.icon} /> </ListItemIcon>
            <ListItemText primary="CRM" style={{ color: '#FFFFFF' }} />
            {open ? <ExpandLess className={classes.icon} /> : <ExpandMore className={classes.icon} />}
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {!sales
                ? <ListItem button className={classes.nested} selected={selectedIndex === 2.1} onClick={event => handleListItemClick(event, 2.1)}>
                  <ListItemIcon> <SubscriptionIcon className={classes.icon} /> </ListItemIcon>
                  <ListItemText primary="Subscription Management" style={{ color: '#FFFFFF' }} />
                </ListItem>
                :
                ''
              }
              <ListItem button className={classes.nested} selected={selectedIndex === 2.2} onClick={event => handleListItemClick(event, 2.2)}>
                <ListItemIcon> <StarBorder className={classes.icon} /> </ListItemIcon>
                <ListItemText primary="Lead View" style={{ color: '#FFFFFF' }} />
              </ListItem>
              {sales
                ? <ListItem button className={classes.nested} selected={selectedIndex === 2.3} onClick={event => handleListItemClick(event, 2.3)}>
                  <ListItemIcon> <StarBorder className={classes.icon} /> </ListItemIcon>
                  <ListItemText primary="Lead Add/Edit/Delete" style={{ color: '#FFFFFF' }} />
                </ListItem>
                :
                ''
              }
              {!sales
                ? <ListItem button className={classes.nested} selected={selectedIndex === 2.4} onClick={event => handleListItemClick(event, 2.4)}>
                  <ListItemIcon> <TicketIcon className={classes.icon} /> </ListItemIcon>
                  <ListItemText primary="Ticket Management" style={{ color: '#FFFFFF' }} />
                </ListItem>
                :
                ''
              }
            
              {!sales
                ? <ListItem button className={classes.nested} selected={selectedIndex === 2.6} onClick={event => handleListItemClick(event, 2.6)}>
                  <ListItemIcon> <PostsaleIcon className={classes.icon} /> </ListItemIcon>
                  <ListItemText primary="Plan" style={{ color: '#FFFFFF' }} />
                </ListItem>
                :
                ''
              }

            </List>
          </Collapse>
        </List>

        {!sales
          ?
          <List>

            <ListItem button selected={selectedIndex === 3} onClick={event => handleListItemClick(event, 3)}>
              <ListItemIcon><PublishIcon className={classes.icon} /> </ListItemIcon>
              <ListItemText primary="Broadcast" style={{ color: '#FFFFFF' }} />
              {open1 ? <ExpandLess className={classes.icon} /> : <ExpandMore className={classes.icon} />}
            </ListItem>
            <Collapse in={open1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} selected={selectedIndex === 3.1} onClick={event => handleListItemClick(event, 3.1)}>
                  <ListItemIcon> <NewReleasesIcon className={classes.icon} /> </ListItemIcon>
                  <ListItemText primary="All" style={{ color: '#FFFFFF' }} />
                </ListItem>
                <ListItem button className={classes.nested} selected={selectedIndex === 3.2} onClick={event => handleListItemClick(event, 3.2)}>
                  <ListItemIcon> <AnnouncementIcon className={classes.icon} /> </ListItemIcon>
                  <ListItemText primary="Admin" style={{ color: '#FFFFFF' }} />
                </ListItem>
              </List>
            </Collapse>
          </List>
          :
          ''
        }
        <Divider />
        <List>
          <ListItem button selected={selectedIndex === 4} onClick={event => handleListItemClick(event, 4)}>
            <ListItemIcon><InboxIcon className={classes.icon} /> </ListItemIcon>
            <ListItemText primary="Reports" style={{ color: '#FFFFFF' }} />
          </ListItem>
        </List>
        {!sales
          ? <List>
            <ListItem button selected={selectedIndex === 5} onClick={event => handleListItemClick(event, 5)}>
              <ListItemIcon><InboxIcon className={classes.icon} /> </ListItemIcon>
              <ListItemText primary="Menu" style={{ color: '#FFFFFF' }} />
            </ListItem>
          </List>
          :
          ''
        }
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {

          component === 'company' ?
            <Company />
            :
            ''
        }
        {

          component === 'subscription' ?

            <Subscription />
            :
            ''
        }
        {

          component === 'leadview' ?

            <LeadManagementView />
            :
            ''
        }
        {

          component === 'leadadd' && role === 'sales' ?

            <LeadManagement />
            :
            ''
        }
        {
          component === 'ticketmanage' ?
            <TicketManagement />
            :
            ''
        }
        {
          component === 'midsales' ?
            <MidSales />
            :
            ''
        }
        {
          component === 'plan' ?
            <Plan />
            :
            ''
        }
        {

          component === 'menu' ?

            <MenuAdd />
            :
            ''
        }

        {

          component === 'password' ?

            <PasswordChange />
            :
            ''
        }
        {

          component === 'profile' ?

            <Profile />
            :
            ''
        }
        {

          component === 'publish' ?

            <Broadcast />
            :
            ''
        }
        {
          component === 'dashboard' ?

            <Home />
            :
            ''
        }

      </main>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
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
import TicketIcon from '@material-ui/icons/Sms';

import User from '../../Components/admin/UserManagement/User';
import AddUser from '../../Components/admin/UserManagement/AddUser';
import AddDesignation from '../../Components/admin/DesignationManagement/AddDesignation';
import LeadManagementView from '../../Components/superadmin/LeadManagementView';
import LeadManagement from '../../Components/LeadManagementList';
import TicketManagement from '../../Components/admin/TicketManagement/AddTicket';
import MenuBar from './MenuBar'
import MenuBar1 from './MenuBar1'
import socketIO from 'socket.io-client';
import swal from 'sweetalert';
import Received from '../../Components/superadmin/Publish/PublishList';
import Published from '../../Components/admin/Publish/Publish';
import MidSales from '../../Components/superadmin/MidSaleList';
import Link from '@material-ui/core/Link';
import Home from '../../Components/admin/Home';
import PasswordChange from '../../Components/admin/PasswordChange';
import Profile from '../../Components/admin/Profile/Profile';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Requisition from '../../Components/user/purchase/Requisition';
import RequisitionReceived from '../../Components/user/purchase/RequisitionReceived';
import RequisitionListApproved from '../../Components/user/purchase/RequisitionListApproved';
import Stock from '../../Components/user/Stock/AddStock';
import Unit from '../../Components/admin/UnitManagement/Unit';
import passvalue from '../../common/utils/passvalue'
import RequisitionListInventory from '../../Components/user/purchase/RequisitionListInventory'
import RequisitionListCompletedInventory from '../../Components/user/purchase/RequisitionListCompletedInventory'
import RFQProcessingList from '../../Components/user/purchase/RFQProcessingList'
import VendorManagement from '../../Components/user/Vendor/AddVendor';
import QuotationSubmit from '../../Components/user/Vendor/QuotationSubmit'
import RFQVendorSubmittedList from '../../Components/user/purchase/RFQVendorSubmittedList'
import QuotationList from '../../Components/user/purchase/QuotationList'
import POList from '../../Components/user/purchase/POList'
import HomeAdmin from '../../Components/admin/HomeAdmin';
import DefaultPage from '../../Components/admin/DefaultPage';
import AddCategory from '../../Components/aminAdmin/category/addCategories';
import SubCategory from '../../Components/aminAdmin/subcategory/addSubcategory';
import Providers from '../../Components/aminAdmin/provider/providerlist';


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

  titleUser: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    marginRight: '5px',
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

var isAdmin = false;
export default function AdminLayout() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [subscription_detail] = React.useState(JSON.parse(localStorage.getItem("subscription_detail")));

  const [component, setComponent] = useState('dashboard');

  if (localStorage.getItem('role') === 'Admin') {
    isAdmin = true;
    console.log('u r Admin');
  }

  let urlimg;
  console.log('profpic----' + localStorage.getItem('profilepic'))
  if (localStorage.getItem('profilepic') === "img" || localStorage.getItem('profilepic') == null) {
    urlimg = 'http://localhost:5000/uploads/profile/avatar.png';
  } else {
    urlimg = 'http://localhost:5000/uploads/profile/' + localStorage.getItem('profilepic');
  }


  function handleListItemClick(event, index) {
    console.log("Index --- " + index)
    setSelectedIndex(index);
    if (index == 0)
      setComponent("dashboard");
    if(index==1)
     setComponent("category")
    if(index==2)
     setComponent("subCategory")
    if(index==3)
    setComponent("providers")
    // if (index == 1)
    //   setOpen(!open);
    // if (index == 1.1)
    //   setComponent("user");
    // if (index == 1.2)
    //   setComponent("adduser");
    // if (index == 2)
    //   setOpen1(!open1);
    // if (index == 2.1)
    //   setComponent("lead");
    // if (index == 3)
    //   setComponent("designation");
    // if (index == 4)
    //   setComponent("Ticket");
    // if (index == 5)
    //   setOpen2(!open2);
    // if (index == 5.1)
    //   setComponent("receive")
    // if (index == 5.2)
    //   setComponent("publish")
    // if (index == 6)
    //   setComponent("units")
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
      <Link style={{ color: '#000', textDecoration: 'none' }} href='/'><MenuItem onClick={handleMenuLogout}>Logout</MenuItem></Link>
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
      <AppBar position="fixed" className={classes.appBar}>
        <CssBaseline />
        
        <Toolbar variant="dense">
          {/* <img src={Image} alt="logo" />
          &nbsp;&nbsp;
            <Typography className={classes.title} variant="h9">
            v3.0
            </Typography> */}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 1 new mails" color="inherit">
              <Badge badgeContent={1} color="secondary">
                <MailIcon />
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
              <AccountCircle />
            </IconButton> */}
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
        <div>
          <Typography align="right" className={classes.titleUser} variant="h9">
            Welcome {localStorage.getItem("name")}   
          </Typography>
        </div>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }} >
        <div className={classes.toolbar} />

        
            <div>
              <List>
                <ListItem button selected={selectedIndex === 0} onClick={event => handleListItemClick(event, 0)}>
                  <ListItemIcon><DashboardIcon className={classes.icon} /> </ListItemIcon>
                  <ListItemText primary="Dashboard" style={{ color: '#FFFFFF' }} />
                </ListItem>
              </List>
              <List>
                <ListItem button selected={selectedIndex === 1} onClick={event => handleListItemClick(event, 1)}>
                  <ListItemIcon><CRMIcon className={classes.icon} /> </ListItemIcon>
                  <ListItemText primary="Category" style={{ color: '#FFFFFF' }} />
                </ListItem>
              </List>
              <List>
                <ListItem button selected={selectedIndex === 2} onClick={event => handleListItemClick(event, 2)}>
                  <ListItemIcon><CRMIcon className={classes.icon} /> </ListItemIcon>
                  <ListItemText primary="Sub Category" style={{ color: '#FFFFFF' }} />
                </ListItem>
              </List>
              <List>
                <ListItem button selected={selectedIndex === 3} onClick={event => handleListItemClick(event, 3)}>
                  <ListItemIcon><CRMIcon className={classes.icon} /> </ListItemIcon>
                  <ListItemText primary="Providers" style={{ color: '#FFFFFF' }} />
                </ListItem>
              </List>
      
            </div>
      

      </Drawer>


      <main className={classes.content}>
        <div className={classes.toolbar} />
        {

          component === 'user' ?
            <User />
            :
            ''
        }
        {

          component === 'adduser' ?
            <AddUser />
            :
            ''
        }
        {

          component === 'lead' ?
            <LeadManagement />
            :
            ''
        }
        {

          component === 'designation' ?
            <AddDesignation />
            :
            ''
        }
        {
          component === 'Ticket' ?
            <TicketManagement />
            :
            ''
        }

        {
          component === 'receive' ?
            <Received />
            :
            ''
        }

        {
          component === 'publish' ?
            <Published />
            :
            ''
        }

        {
          component === 'units' ?
            <Unit />
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

          component === 'password' ?

            <PasswordChange />
            :
            ''
        }
        {
          component === 'dashboard' && localStorage.getItem('role') === 'Admin' ?

            <Home />
            :
            ''
        }
        {
          component === 'dashboard' && localStorage.getItem('role') != 'Admin' ?

            <HomeAdmin />
            :
            ''
        }
        {
          component === 'requisition' ?

            <Requisition />
            :
            ''
        }
        {
          component === 'requisitionreceived' ?

            <RequisitionReceived />
            :
            ''
        }
        {
          component === 'requisitionapproved' ?

            <RequisitionListApproved />
            :
            ''
        }
        {
          component === 'requisitionreceivedlist' ?

            <RequisitionListInventory />
            :
            ''
        }
        {
          component === 'requisitionreceivedcompletedlist' ?

            <RequisitionListCompletedInventory />
            :
            ''
        }
        {
          component === 'stock' ?

            <Stock />
            :
            ''
        }
        {
          component === 'vendor' ?

            <VendorManagement />
            :
            ''
        }
        {
          component === 'rfqprocessinglist' ?

            <RFQProcessingList />
            :
            ''
        }
        {
          component === 'quotationsubmitlist' ?

            <QuotationSubmit />
            :
            ''
        }
        {
          component === 'vendorquotationlist' ?

            <RFQVendorSubmittedList />
            :
            ''
        }
        {
          component === 'quotationlist' ?

            <QuotationList />
            :
            ''
        }
        {
          component === 'polist' ?

            <POList />
            :
            ''
        }
        {
          component === '' ?

            <DefaultPage />
            :
            ''
        }
        {
          component === 'category' ?

            <AddCategory />
            :
            ''
        }
         {
          component === 'subCategory' ?

            <SubCategory />
            :
            ''
        }
        {
          component === 'providers' ?
          <Providers />
          :
          ''
        }
        
      </main>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
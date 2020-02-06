import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2,
  },
});

class Test extends Component {
  state = {
    open: false,
  };
 
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
 
  handleClick = () => {
    this.setState({
      open: true,
    });
  };
 
  render() {
    const { classes } = this.props;
    const { open } = this.state;
 
    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Modal Pop-up</DialogTitle>
          <DialogContent>
            <DialogContentText>This is an example of modal pop-up</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="h3" gutterBottom>
          Material-UI Demo Test
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Example Project Test
        </Typography>
        <Button variant="contained" color="secondary" onClick={this.handleClick}>
          Show Pop-Up
        </Button>
      </div>
    );
  }
}
 
Test.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(Test);
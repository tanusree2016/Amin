import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import axios from '../../../common/utils/axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import envirionment from '../../../common/utils/envirionment';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
import base_url from '../../../common/utils/axios';

mobiscroll.settings = {
    theme: 'ios',
  }
  
  function showAlert (text) {
    mobiscroll.alert({
        message: text,
        
    });
  }

  var unitArray = [];

  class UnitList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getAllunit: [],
            name: '',
            shortname:'',
            units: [],
            delIndex: -1,
            editIndex: -1,
            

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,

        });
    };

    handleClick(e, f, g,index) {
        this.setState({
            open: true,
            name: e,
            shortname: f,
            unitid: g,
            editIndex: index,
        });

        
    };

    handleClickDelete(e,index) {
        this.setState({
            open1: true,
            unitid: e,
            delIndex: index,
        });
    }

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    


    fetchUnit () {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'unit-list', {
            method: "GET",
            headers: { 'x-access-token': localStorage.getItem('token'), 'x-access-db': localStorage.getItem('dbname') }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    getAllunit: res.Unit
                });
                for (let i = 0; i < res.Unit.length; i++) {
                    unitArray.push(res.Unit[i].name);
                    this.setState({ name: res.Unit[i].name })
                    this.setState({ shortname: res.Unit[i].shortname })                    
                }
                console.log('array' + unitArray);
                this.setState({ stocks: unitArray })

                console.log("Plan Names --- " + this.state.getAllunit);
            })
            console.log("Calling --- End ---  ");
        this.forceUpdate();

    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.name == ''){
            showAlert('Please fill name')
          }
          else{
        const unitEdit = {

            name: this.state.name,
            shortname: this.state.shortname,
            unitid: this.state.unitid
        }

        this.state.getAllunit[this.state.editIndex].name= this.state.name
        this.state.getAllunit[this.state.editIndex].shortname= this.state.shortname
        this.state.getAllunit[this.state.editIndex].id= this.state.unitid

        ///this.props.planEdit(planEdit, this.props.history);
        //this.resetField();

        base_url.post('unit-update', unitEdit, {
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'x-access-db': localStorage.getItem('dbname')
            }
        })
            .then(res => {
                //this.resetField();
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    //swal("Plan is added successfully");
                    let success = "Unit is updates successfully"
                    showAlert(success);
                }
                else
                    //swal(res.data.message);
                    showAlert(res.data.message);

                //this.resetField();
               // this.reloadChild();
            })
            .catch(e => console.log(e))
        this.handleClose();
    }
}

handleDelete(e){
    e.preventDefault();
   // console.log("this.state.unitid --- " + this.state.unitid)

    this.setState((prevState) => ({
        getAllunit: prevState.getAllunit.filter((_, i) => i !== this.state.delIndex)
    }));

    fetch(envirionment.BASE_URL + 'unit-delete', {
        method: 'post',
        headers: {
            'x-access-db': localStorage.getItem('dbname'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ unitid: this.state.unitid })
    }).then(res => res.json())
        .then(res => {
            console.log("DATA --- " + res + " --- " + res.value);
            console.log(res.message);
            if (res.value == 1)
                showAlert("Unit is deleted successfully");
            else
                showAlert(res.message);
        })
        .catch(err => {
        });

    this.handleClose();
}

    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchUnit();
    }

    render() {
        const { open, open1 } = this.state;
        
        const likePointer = { cursor: 'pointer' , color: 'blue' };
        const delPointer = { cursor: 'pointer' , color: 'red' };

        const tableHeadStyle= { fontWeight: 'bold' , fontSize: '15px' , color: 'black' }
        const tableBodyStyle= { fontSize: '12px' }

        return (
            <div>
                <Dialog
                    open={open1}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">{"Are sure , to delete the unit?"}</DialogTitle>
                    <DialogContent>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button style={{fontWeight: 'bold'}} onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleDelete}  color="secondary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit Plan
                        </DialogContentText>
                        <form>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Unit Name"
                                name="name"
                                value={this.state.name}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="shortname"
                                value={this.state.shortname}
                                label="Shortname"
                                name="shortname"
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button style={{fontWeight: 'bold'}} onClick={this.handleSubmit} color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={ tableHeadStyle }>Name</TableCell>
                            <TableCell style={ tableHeadStyle }>Short Name</TableCell>
                            <TableCell style={ tableHeadStyle }>Edit</TableCell>
                            <TableCell style={ tableHeadStyle }>Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAllunit && this.state.getAllunit.map((unit, i) =>


                            <TableRow>
                                <TableCell style={ tableBodyStyle }>{unit.name}</TableCell>
                                <TableCell style={ tableBodyStyle }>{unit.shortname}</TableCell>
                                <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(unit.name, unit.shortname, unit._id,i)} /></TableCell>
                                <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(unit._id,i)}/></TableCell>
                            </TableRow>

                        )}
                    </TableBody></Table>
            </div>
        )
    }
  }

  UnitList.propTypes = {
    auth: PropTypes.object.isRequired,
   // editDesignation: PropTypes.func.isRequired,
    // designationDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(UnitList)
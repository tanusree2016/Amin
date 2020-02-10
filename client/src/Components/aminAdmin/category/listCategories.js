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

  var categoryArray = [];

  class ListCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getAllcategories: [],
            category: '',
            color_code:'',
            categories: [],
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
            category: e,
            color_code: f,
            categoryid: g,
            editIndex: index,
        });

        
    };

    handleClickDelete(e,index) {
        this.setState({
            open1: true,
            categoryid: e,
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
        fetch(envirionment.BASE_URL + 'consumer/services', {
            method: "GET",
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    getAllcategories: res.Service
                });
                for (let i = 0; i < res.Service.length; i++) {
                    categoryArray.push(res.Service[i].name);
                    this.setState({ category: res.Service[i].category })
                    this.setState({ color_code: res.Service[i].color_code })                    
                }
                console.log('array' + categoryArray);
                this.setState({ category: categoryArray })

               
            })
            console.log("Calling --- End ---  ");
        this.forceUpdate();

    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.category == ''){
            showAlert('Please fill name')
          }
          else{
        const categoryEdit = {

            category: this.state.category,
            color_code: this.state.color_code,
            categoryid: this.state.categoryid
        }

        this.state.getAllcategories[this.state.editIndex].category= this.state.category
        this.state.getAllcategories[this.state.editIndex].color_code= this.state.color_code
        this.state.getAllcategories[this.state.editIndex].categoryid= this.state.categoryid

        ///this.props.planEdit(planEdit, this.props.history);
        //this.resetField();

        base_url.post('admin/edit-category', categoryEdit, {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
            .then(res => {
                //this.resetField();
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    //swal("Plan is added successfully");
                    let success = "Category is updates successfully"
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
        getAllcategories: prevState.getAllcategories.filter((_, i) => i !== this.state.delIndex)
    }));
    const changeStatus = {
        categoryid: this.state.categoryid,
        
    }

    console.log(changeStatus);
    base_url.post('admin/delete-category' ,changeStatus, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
       
    }).then(res => {
        console.log(res.data.value);
        console.log(res.data.message);
        if (res.data.value == 1) {
            //swal("Company registraion is successfull");
            //let success="Company registraion is successfull"
            showAlert(res.data.message);
        }
        else
            showAlert(res.data.message);
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
                    <DialogTitle id="alert-dialog-title">{"Are sure , to delete the categories?"}</DialogTitle>
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
                            Edit Category
                        </DialogContentText>
                        <form>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="category"
                                label="Category"
                                name="category"
                                value={this.state.category}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="color_code"
                                value={this.state.color_code}
                                label="Color Code"
                                name="color_code"
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
                            <TableCell style={ tableHeadStyle }>Category</TableCell>
                            <TableCell style={ tableHeadStyle }>Color Code</TableCell>
                            <TableCell style={ tableHeadStyle }>Edit</TableCell>
                            <TableCell style={ tableHeadStyle }>Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAllcategories && this.state.getAllcategories.map((unit, i) =>


                            <TableRow>
                                <TableCell style={ tableBodyStyle }>{unit.category}</TableCell>
                                <TableCell style={ tableBodyStyle }>{unit.color_code}</TableCell>
                                <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(unit.category, unit.color_code, unit.id,i)} /></TableCell>
                                <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(unit.id,i)}/></TableCell>
                            </TableRow>

                        )}
                    </TableBody></Table>
            </div>
        )
    }
  }

  ListCategories.propTypes = {
    auth: PropTypes.object.isRequired,
   // editDesignation: PropTypes.func.isRequired,
    // designationDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(ListCategories)
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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

mobiscroll.settings = {
    theme: 'ios',
  }
  
  function showAlert (text) {
    mobiscroll.alert({
        message: text,
        
    });
  }

  var categoryArray = [];
  var desigNameArray = [];
  var desigIdArray = [];
  class ListSubCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getAllsubcategories: [],
            subcategory: '',
            subcategories: [],
            getAllCategory: [],
            category:'',
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
            subcategory: e,
            subcategoryid: f,
            category: g,
            editIndex: index,
        });

        
    };

    handleClickDelete(e,index) {
        this.setState({
            open1: true,
            subcategoryid: e,
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
        fetch(envirionment.BASE_URL + 'admin/list-subcategory', {
            method: "GET",
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    getAllcategories: res.Service
                });
                console.log('--'+JSON.stringify(res.Service));
                for (let i = 0; i < res.Service.length; i++) {
                    categoryArray.push(res.Service[i].name);
                    this.setState({ category: res.Service[i].category_id })
                    this.setState({ subcategory: res.Service[i].subcategory })
                    this.setState({ subcategoryid: res.Service[i].id })
                    // this.setState({ color_code: res.Service[i].color_code })                    
                }
                console.log('array' + categoryArray);
                this.setState({ category: categoryArray })

               
            })
            console.log("Calling --- End ---  ");
        this.forceUpdate();

    }


    fetchcategory() {

        this.setState({ loading: true }, () => {
            fetch(envirionment.BASE_URL + 'consumer/services/', {
                method: "GET",
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    
                }
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        getAllCategory: res.Service,
                        loading: false,
                    });

                    for (let i = 0; i < res.Service.length; i++) {
                        desigNameArray.push(res.Service[i].category);
                        desigIdArray.push(res.Service[i].id);
                       
                    }
                })
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.subcategory == ''){
            showAlert('Please fill name')
          }
          else{
        const unitEdit = {

            subcategory: this.state.subcategory,
            subcategoryid: this.state.subcategoryid
        }

        this.state.getAllcategories[this.state.editIndex].subcategory= this.state.subcategory
        this.state.getAllcategories[this.state.editIndex].subcategoryid= this.state.subcategoryid
        this.state.getAllcategories[this.state.editIndex].category= this.state.category

        base_url.post('admin/edit-subcategory', unitEdit, {
            headers: {
               // 'x-access-token': localStorage.getItem('token'),
                //'x-access-db': localStorage.getItem('dbname')
            }
        })
            .then(res => {
                //this.resetField();
                console.log(res.data.value);
                console.log(res.data.message);
                if (res.data.value == 1) {
                    //swal("Plan is added successfully");
                    let success = "Subcategories is updates successfully"
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
        subcategoryid: this.state.subcategoryid,
        
    }

    base_url.post('admin/delete-subcategory' ,changeStatus, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
       
    }).then(res => {
        if (res.data.value == 1) {
            let success = "Sub Category is Deleted successfully"
            showAlert(success);
        }
        else{
            showAlert(res.data.message);
        }
        })
        .catch(err => {
        });

    this.handleClose();
}

    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchUnit();
        this.fetchcategory();
    }

    handleInputChangeValueCategory(event, id) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        this.setState({ [nam]: val });
        for (let i = 0; i < this.state.getAllCategory.length; i++) {
            if (JSON.stringify(desigIdArray.pop(i)) == val) {
                console.log("entered");
                this.state.id = val;
            }
        }
    }

    render() {
        const { open, open1 } = this.state;
        
        const likePointer = { cursor: 'pointer' , color: 'blue' };
        const delPointer = { cursor: 'pointer' , color: 'red' };

        const tableHeadStyle= { fontWeight: 'bold' , fontSize: '15px' , color: 'black' };
        const tableBodyStyle= { fontSize: '12px' };

        const formControl = {
            minWidth: 150,
            marginLeft: 15,
        };

        return (
            <div>
                <Dialog
                    open={open1}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    <DialogTitle id="alert-dialog-title">{"Are sure , to delete the subcategories?"}</DialogTitle>
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
                            Edit Subcategory
                        </DialogContentText>
                        <form>

                        <div id='1' style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                            <FormControl style={formControl}>
                                <InputLabel htmlFor="Category">Category</InputLabel>
                                <Select
                                    value={this.state.category}
                                    onChange={(ev) => this.handleInputChangeValueCategory(ev)}
                                    inputProps={{
                                        name: 'category',
                                        id: 'category',
                                    }}
                                >
                                    {this.state.getAllCategory.map(module => (
                                        <MenuItem value={module.id}>{module.category}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                          
                        </div>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="category"
                                label="Subcategory"
                                name="subcategory"
                                value={this.state.subcategory}
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
                            <TableCell style={ tableHeadStyle }>Sub Category</TableCell>
                            <TableCell style={ tableHeadStyle }>Category</TableCell>
                            <TableCell style={ tableHeadStyle }>Edit</TableCell>
                            <TableCell style={ tableHeadStyle }>Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAllcategories && this.state.getAllcategories.map((unit, i) =>


                            <TableRow>
                                <TableCell style={ tableBodyStyle }>{unit.subcategory}</TableCell>
                                <TableCell style={ tableBodyStyle }>{unit.amin_service_category.category}</TableCell>
                                <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(unit.subcategory,unit.id,unit.category_id,i)} /></TableCell>
                                <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(unit.id,i)}/></TableCell>
                            </TableRow>

                        )}
                    </TableBody></Table>
            </div>
        )
    }
  }

  ListSubCategories.propTypes = {
    auth: PropTypes.object.isRequired,
   // editDesignation: PropTypes.func.isRequired,
    // designationDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});


export default connect(mapStateToProps)(ListSubCategories)
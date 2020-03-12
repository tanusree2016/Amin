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
import { subscriptionApiEdit } from './subscriptionApi';
import {subscriptionApiDelete} from './subscriptionApi';
import swal from 'sweetalert';

var planArray = [];
var formData=null;
class SubscriptionList extends Component {

    constructor(props) {
        super(props);
        this.state = {

            planName: '',
            price: '',
            duedate: '',
            subscriptions: [],
            getAllPlan: [],
            plans: [],
            price: [],
            delIndex: -1,
            editIndex: -1,
            filename: '',
            selectedFile: null,
            ext: '',
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

    handleClick(e, f, g,h,index) {
        this.setState({
            open: true,
            price: e,
            planName: f,
            subscriptionId: g,
            filename: h,
            editIndex: index,
        });
    };

    handleClickDelete(e,index) {
        this.setState({
            open1: true,
            subscriptionid: e,
            delIndex: index,
        });
    }


    fetchAllPlans() {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'subscription', {
            data: 'planName',
            data: 'price',
            data: 'subscriptionId',
            method: "GET",
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => res.json())
            .then(res => {
                console.log("Size --- " + res.subscription.length);
                this.setState({
                    getAllPlan: res.subscription
                });
                for (let i = 0; i < res.subscription.length; i++) {
                    planArray.push(res.subscription[i].planName);
                    //this.setState({ plans: res.subscription[i].planName })
                    this.setState({ id: res.subscription[i].subscriptionId })
                    this.setState({ price: res.subscription[i].price })
                }
                console.log('array' + planArray);
                this.setState({ plans: planArray })

                console.log("Plan Names --- " + this.state.getAllPlan);
            })
            console.log("Calling --- End ---  ");
        this.forceUpdate();
        
    }
    componentDidMount() {
        console.log("Child calling ------ ");
        this.fetchAllPlans();
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.auth.isAuthenticated) {
    //         this.props.history.push('/')
    //     }
    //     if (nextProps.errors) {
    //         this.setState({
    //             errors: nextProps.errors
    //         });
    //     }
    // }

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    onChangeHandler = event => {

        let files=event.target.files;
        let extension;
        extension=event.target.files[0].name.slice((event.target.files[0].name.lastIndexOf(".") - 1 >>> 0) + 2);
        this.setState({
            ext: extension,
        })
        console.log("File Name : "+event.target.files[0].name+" "+extension)
        let reader=new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload=(e)=>{
            console.log("Files --- "+e.target.result.split(',').pop())
            formData={file:e.target.result.split(',').pop()}
        }
    
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
          })
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.state.planName == ''){
            swal('Please fill all required feilds')
          }
          else{

        console.log('hghd' + this.state.price);
        const subscriptionApiEdit = {

            planName: this.state.planName,
            price: this.state.price,
            subscriptionid: this.state.subscriptionId,
            file: formData || this.state.filename,
            extension: this.state.ext,
        }

        this.state.getAllPlan[this.state.editIndex].planName= this.state.planName
        this.state.getAllPlan[this.state.editIndex].price= this.state.price
        this.state.getAllPlan[this.state.editIndex].subscriptionid= this.state.subscriptionid
        this.state.getAllPlan[this.state.editIndex].filename= this.state.filename

        this.props.subscriptionApiEdit(subscriptionApiEdit, this.props.history);
        //this.resetField();
        this.handleClose();
    }
}

    handleDelete(e){
        e.preventDefault();
        const subscriptionApiDelete = {
            subscriptionid: this.state.subscriptionid
        }
        
        this.setState((prevState) => ({
            getAllPlan: prevState.getAllPlan.filter((_, i) => i !== this.state.delIndex)
          }));
 
        this.props.subscriptionApiDelete(subscriptionApiDelete, this.props.history);
        this.handleClose();
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
                    <DialogTitle id="alert-dialog-title">{"Are you sure to delete the subscription module?"}</DialogTitle>
                    <DialogContent>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button style={{fontWeight:'bold'}} onClick={this.handleClose} color="primary">
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
                            Edit Subscription
                        </DialogContentText>
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <TextField
                                autoFocus
                                margin="dense"
                                id="companyname"
                                label="Name"
                                name="planName"
                                value={this.state.planName}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="price"
                                value={this.state.price}
                                label="Price"
                                name="price"
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />

                            <div id='2'>

                            <input type="file" name="file" onChange={this.onChangeHandler} />


                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button style={{fontWeight:'bold'}} onClick={this.handleSubmit} color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={ tableHeadStyle }>Module name</TableCell>
                            <TableCell style={ tableHeadStyle }>Price( Monthly {"\u20B9"} )</TableCell>
                            <TableCell style={ tableHeadStyle }>Edit</TableCell>
                            <TableCell style={ tableHeadStyle }>Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAllPlan && this.state.getAllPlan.map((plan, i) =>


                            <TableRow>
                                <TableCell style={ tableBodyStyle }>{plan.planName}</TableCell>
                                <TableCell style={ tableBodyStyle }>{plan.price}</TableCell>
                                <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(plan.price, plan.planName, plan._id,plan.filename,i)} /></TableCell>
                                <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(plan._id,i)} /></TableCell>

                            </TableRow>

                        )}
                    </TableBody></Table>

            </div>

        )
    }
}
SubscriptionList.propTypes = {
    auth: PropTypes.object.isRequired,
    subscriptionApiEdit: PropTypes.func.isRequired,
    subscriptionApiDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { subscriptionApiEdit, subscriptionApiDelete })(SubscriptionList)
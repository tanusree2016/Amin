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
import { planEdit } from './subscriptionApi';
import { planDelete } from './subscriptionApi';
import swal from 'sweetalert';
import mobiscroll from '@mobiscroll/react-lite';
import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
mobiscroll.settings = {
    theme: 'ios',
}

function showAlert (text) {
    mobiscroll.alert({
        message: text,
        
    });
}
var planArray = [];
class PlanList extends Component {

    constructor(props) {
        super(props);
        this.state = {

            name: '',
            discount: '',
            subscriptions: [],
            getAllPlan: [],
            plans: [],
            discount: [],
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
            discount: e,
            name: f,
            planid: g,
            editIndex: index,
        });
    };

    handleClickDelete(e,index) {
        this.setState({
            open1: true,
            planid: e,
            delIndex: index,
        });
    }


    fetchAllPlans() {
        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'plan', {
            method: "GET",
            headers: { 'x-access-token': localStorage.getItem('token') }
        }).then(res => res.json())
            .then(res => {
                console.log("Size --- " + res.plans.length);
                this.setState({
                    getAllPlan: res.plans
                });
                for (let i = 0; i < res.plans.length; i++) {
                    planArray.push(res.plans[i].planName);
                    this.setState({ plans: res.plans[i].name })
                    this.setState({ id: res.plans[i].planId })
                    this.setState({ discount: res.plans[i].discount })
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

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.name == ''){
            showAlert('Please fill name')
          }
          else{
        const planEdit = {

            name: this.state.name,
            discount: this.state.discount,
            planid: this.state.planid
        }

        this.state.getAllPlan[this.state.editIndex].name= this.state.name
        this.state.getAllPlan[this.state.editIndex].discount= this.state.discount
        this.state.getAllPlan[this.state.editIndex].id= this.state.planid

        this.props.planEdit(planEdit, this.props.history);
        //this.resetField();
        this.handleClose();
    }
}

    handleDelete(e){
        e.preventDefault();
        const planDelete = {
            planid: this.state.planid
        }
        
        this.setState((prevState) => ({
            getAllPlan: prevState.getAllPlan.filter((_, i) => i !== this.state.delIndex)
          }));
 
        this.props.planDelete(planDelete, this.props.history);
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
                    <DialogTitle id="alert-dialog-title">{"Are sure , to delete the subscription module?"}</DialogTitle>
                    <DialogContent>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ fontWeight:'bold' }} onClick={this.handleClose} color="primary">
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
                                id="companyname"
                                label="Plan Name"
                                name="name"
                                value={this.state.name}
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="price"
                                value={this.state.discount}
                                label="Discount"
                                name="discount"
                                fullWidth
                                onChange={(ev) => this.handleInputChangeValue(ev)}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button style={{ fontWeight:'bold' }} onClick={this.handleSubmit} color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={ tableHeadStyle }>Plan name</TableCell>
                            <TableCell style={ tableHeadStyle }>Discount</TableCell>
                            <TableCell style={ tableHeadStyle }>Edit</TableCell>
                            <TableCell style={ tableHeadStyle }>Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.getAllPlan && this.state.getAllPlan.map((plan, i) =>


                            <TableRow>
                                <TableCell style={ tableBodyStyle }>{plan.name}</TableCell>
                                <TableCell style={ tableBodyStyle }>{plan.discount}</TableCell>
                                <TableCell><EditIcon fontSize="small" style={likePointer} onClick={(e) => this.handleClick(plan.discount, plan.name, plan._id,i)} /></TableCell>
                                <TableCell><DeleteIcon fontSize="small" style={delPointer} onClick={(e) => this.handleClickDelete(plan._id,i)} /></TableCell>

                            </TableRow>

                        )}
                    </TableBody></Table>

            </div>

        )
    }
}
PlanList.propTypes = {
    auth: PropTypes.object.isRequired,
    planDelete: PropTypes.func.isRequired,
    planEdit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { planDelete,planEdit  })(PlanList)
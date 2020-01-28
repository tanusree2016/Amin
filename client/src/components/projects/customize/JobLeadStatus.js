import React, { Component } from 'react'
import { Segment, ButtonGroup, Button, Checkbox } from 'semantic-ui-react'

import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {statusEdit,statusDelete} from './AddStatusApi'
import TextField from '@material-ui/core/TextField';
import _ from 'lodash'
class JobLeadStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statuslist: [],
            editIndex: -1,
           
            id: '',
            status_name : '' ,
            status_category : 0,
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    handleStatusList() {
        console.log("Calling --- ");
        fetch('http://localhost:5000/customize/statuslist', {

            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded ' }
        }).then(res => res.json())
            .then(res2 => {
                console.log("Size --- " + res2.statuslist.length);
                //let allList = JSON.stringify(res2.list)
                // console.log("All List --- " + allList);
                this.setState({
                    statuslist: res2.statuslist
                });

                console.log("Project Names --- " + JSON.stringify(this.state.statuslist));




            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }


    componentDidMount = () => {
        this.handleStatusList();

    }

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,

        });
    };

    handleClickDelete(e, index) {
        this.setState({
            open1: true,
            id: e,
            delIndex: index,
        });
    }

    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
        console.log("test-----" + this.state.tag)
    }

    handleSubmit(e) {
        e.preventDefault();

        const statusEdit = {

            status_name: this.state.status_name,
            status_category: this.state.status_category,
            id: this.state.id,
        }

        this.state.statuslist[this.state.editIndex].status = this.state.status
        

        this.props.statusEdit(statusEdit, this.props.history);


        //this.resetField();
        this.handleClose();
    }

    handleClick(name, sid, index) {
        console.log("Value Details --- " + name + " " + sid + " " + " " + index)
        this.setState({
            open: true,
            status_name: name,
            id: sid,
            editIndex: index,
        });
    }

    handleDelete(e) {
        e.preventDefault();
        const statusDelete = {
            id: this.state.id
        }

        this.setState((prevState) => ({
            statuslist: prevState.statuslist.filter((_, i) => i !== this.state.delIndex)
        }));

        this.props.statusDelete(statusDelete, this.props.history);
        this.handleClose();
    }




    render() {
        const { open, open1 } = this.state;
        return (
            <div>
                <text>Leads</text>


                <div style={{ overflow: "scroll", background: "#eee" }}>

                    <ButtonGroup>
                        {this.state.statuslist && this.state.statuslist.map((status, i) =>
                        <div>
                            <div style={{ padding: "3px" }}>


                                <Button variant="secondary" style={{ background: "white", color: "black", width: "130px", height: "112px", display: "inline", }} onClick={(e) => this.handleClick(status.status, status.id, i)}> <text style={{ marginTop: "-20px", float: "left" }}>1</text> <Checkbox style={{ float: "right", marginTop: "-20px" }} /> <br />{status.status}</Button>




                                {/* <text>Jobs</text>
                <Segment style={{ background: "#dddddd", overflow: "auto", height: "120px", padding: "3px", whiteSpace: "nowrap" }}>
                    <ButtonGroup>
                    <Button></Button>

                    </ButtonGroup>

                </Segment> */}
                            </div>
                             <div>

                             {/* <Dialog
                                 open={open1}
                                 onClose={this.handleClose}
                                 aria-labelledby="alert-dialog-title"
                                 aria-describedby="alert-dialog-description" >
                                 <DialogTitle id="alert-dialog-title">{"Are sure , want to delete subscription?"}</DialogTitle>
                                 <DialogContent>
         
                                 </DialogContent>
                                 <DialogActions>
                                     <Button onClick={this.handleClose} color="primary">
                                         Disagree
                                     </Button>
                                     <Button onClick={this.handleDelete} color="primary" autoFocus>
                                         Agree
                                     </Button>
                                 </DialogActions>
                             </Dialog> */}
         
                             <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                 <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                                 <DialogContent>
                                     <DialogContentText>
                                         Edit Status
                                     </DialogContentText>
                                     <form>
                                         <TextField
                                             autoFocus
                                             margin="dense"
                                             id="status_name"
                                             label="Status"
                                             name="status_name"
                                             value={this.state.status_name}
                                             fullWidth
                                             onChange={(ev) => this.handleInputChangeValue(ev)}
                                         />
         
                                     </form>
                                 </DialogContent>
                                 <DialogActions>
                                     <Button onClick={this.handleClose} color="primary">
                                         Cancel
                                     </Button>
                                     <Button onClick={this.handleSubmit} color="primary">
                                         Edit
                                     </Button>
                                     <Button onClick={this.handleDelete}  color="primary">
                                         Delete
                                     </Button>
                                 </DialogActions>
                             </Dialog>
                         </div></div>

                        )}  </ButtonGroup>
                </div>

               
            </div>
        )
    }
}

JobLeadStatus.propTypes = {
    //classes: PropTypes.object.isRequired,
    statusEdit: PropTypes.func.isRequired,
    statusDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    status: state.status,
    errors: state.errors
});

export default connect(mapStateToProps, { statusEdit, statusDelete })(JobLeadStatus)

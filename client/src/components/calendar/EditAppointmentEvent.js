import React, { Component, useState } from 'react'
import { Button, Modal, Form, } from 'semantic-ui-react';

import { Dropdown, Divider, Icon } from 'semantic-ui-react'
import DateRange from './DateRange';
import AddDate from './AddDate'
import PropTypes from 'prop-types';
import axios from 'axios';

import base_url from '../../common/utils/axios';
import { connect } from 'react-redux';
import { editAppointment, deleteAppointment } from './appointment/AppointmentApi'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

class EditAppointmentEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: '',
            is_all_day: '',
            show_me: '',
            project_id: '',
            location: '',
            description: '',
            appointmentList: [],
            editIndex: -1,
            open: false


        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    close = () => this.setState({ open: false });

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    show = (size, title, project_id, location, description, aid, index) => () => {
        this.setState({
            size: size,

            title: title,
            project_id: project_id,
            location: location,
            description: description,
            id: aid,
            editIndex: index,
            open: true
        })
    }

    handleTagData() {
        console.log("Calling --- ");
        fetch('http://localhost:5000/appointment/appointment-list', {

            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded ' }
        }).then(res => res.json())
            .then(res2 => {
                console.log("Size --- " + res2.appoint.length);
                //let allList = JSON.stringify(res2.list)
                // console.log("All List --- " + allList);
                this.setState({
                    appointmentList: res2.appoint
                });

                console.log("Project Names --- " + JSON.stringify(this.state.appointmentList));




            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }


    componentDidMount = () => {
        this.handleTagData();

    }


    handleClick = (e, id) => {
        id = id + 1

        document.getElementById(id).style.display = "block";
        document.getElementById(id + 4).required = true;

    }
    handleDate = (e, id) => {
        id = id + 1
        if (document.getElementById(id).style.display == "none") {
            document.getElementById(id).style.display = "block";
            document.getElementById(id + 1).innerHTML = "Hide Dates"

        }

        else {
            if (document.getElementById(id + 1).innerHTML = "Hide Dates")
                document.getElementById(id + 1).innerHTML = "Add Dates"

            document.getElementById(id).style.display = "none";

        }
    }




    handleSubmit(e) {
        e.preventDefault();

        const editAppointment = {

            title: this.state.title,
            project_id: this.state.project_id,
            location: this.state.location,
            description: this.state.description,
            id: this.state.id
        }

        this.state.appointmentList[this.state.editIndex].title = this.state.title


        this.props.editAppointment(editAppointment, this.props.history);


        //this.resetField();
        this.close();
    }


    handleClick(name, tid, index) {
        console.log("Value Details --- " + name + " " + tid + " " + " " + index)
        this.setState({
            open: true,
            tag: name,
            id: tid,
            editIndex: index,
        });
    }

    handleClose = () => {
        this.setState({

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


    handleDelete(e) {
        e.preventDefault();
        const deleteAppointment = {
            id: this.state.id
        }

        this.setState((prevState) => ({
            appointmentList: prevState.appointmentList.filter((_, i) => i !== this.state.delIndex)
        }));

        this.props.deleteAppointment(deleteAppointment, this.props.history);
        this.close();
    }

    handleProjectChange = (e, { value }) => this.setState((prevState, props) => {
        let newState = { ...prevState }
        newState.project_id = value;
        return { ...newState };
    });

    render() {

        const { open1, open, size } = this.state;

        return (

            <div>


                <div>

                    {this.state.appointmentList && this.state.appointmentList.map((appointment, i) =>


                        <div >
                            <div style={{ width: "150px", height: "20px", background: "orange", textAlign: "center", borderRadius: "10px", }} onClick={this.show("medium", appointment.title, appointment.project_id, appointment.location, appointment.description, appointment.id, i)}>{appointment.title} </div>

                            <br />

                            <>

                                <Dialog
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
                                </Dialog>

                                <Modal size={size} open={open} onClose={this.close}>
                                    <Modal.Header>    Edit Appointment  <text style={{ float:"right"}}><Icon name="briefcase" size="large" /></text></Modal.Header>
                                    <Modal.Content>




                                        <Form onSubmit={this.handleSubmit} >

                                            <Form.Field>
                                                <label>Title*</label>
                                                <input type="text" placeholder="Enter project title here" name="title" value={this.state.title} onChange={this.handleChange} />
                                            </Form.Field>


                                            <div id="4" style={{ padding: "8px" }}>
                                                <AddDate />
                                            </div>
                                            <Form.Field >
                                                <label>Project</label>
                                                <Dropdown
                                                    fluid
                                                    selection
                                                    multiple={false}
                                                    search={true}
                                                    options={options}
                                                    value={this.state.project_id}
                                                    placeholder='Select a project'
                                                    onChange={this.handleProjectChange}

                                                    disabled={false}
                                                    loading={false}
                                                />
                                            </Form.Field>



                                            <Form.TextArea label='Location' name="location" placeholder="Add some notes" value={this.state.location} onChange={this.handleChange} />
                                            <Form.TextArea label='Discription' name="description" placeholder="Add some notes" value={this.state.description} onChange={this.handleChange} />











                                            {/* 
                                <AddDate /> */}
                                            <div id="3"></div>
                                            {/* <button class="btn btn-light" onClick={(e) => this.handleDate(e, 3)} style={{width:"650px"}} >
                                    Create New Client
                                            </button><br /><br /> */}


                                            <Divider></Divider>



                                            <Button primary type="submit" style={{ float: "right" }}>
                                                Save
                            </Button>

                                        </Form>

                                        <Button secondary onClick={(e) => this.handleClickDelete(appointment.id, i)} style={{ float: "right" }}>
                                            Delete
                            </Button>&nbsp;&nbsp;
                            <Button secondary onClick={this.close} style={{ float: "right" }}>
                                            Cancel
                            </Button>&nbsp;&nbsp;
                            </Modal.Content>
                                </Modal>
                            </>
                        </div>

                    )}
                </div>

            </div>

        )
    }
}




EditAppointmentEvent.propTypes = {
    //classes: PropTypes.object.isRequired,
    editAppointment: PropTypes.func.isRequired,
    deleteAppointment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    appointment: state.appointment,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { editAppointment, deleteAppointment })(EditAppointmentEvent);


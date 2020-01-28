import React, { Component, useState } from 'react'


import { Dropdown, Divider, Input, Icon, Button, Modal, Form, } from 'semantic-ui-react'

import AddTaskDate from './AddTaskDate'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { editTask, deleteTask } from './taskevent/TaskApi'
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


class EditTaskEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            body: '',
            due_date: '',
            due_time: '',
            project_id: '',
            assignee: '',
            is_private: 0,
            comment: '',
            file: '',
            allTask: [],
            open: false


        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    close = () => this.setState({ open: false });

    handleCheck = (e, id) => {

        if ((document.getElementById(id).style.display == "block")) { document.getElementById(id).style.display = "none"; }

        else if ((document.getElementById(id).style.display == "none")) {
            document.getElementById(id).style.display = "block";

        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    show = (size, body, project_id, is_private, tid, index) =>()=> {
        this.setState({
            size: size,

            body: body,
            project_id: project_id,
            is_private: is_private,

            id: tid,
            editIndex: index,
            open: true
        })
    }

    handleData = () => {
        fetch('/list')
            .then(response => response.json())
            .then(res2 => this.setState({ createproject: res2 }));

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

    resetField = () => {
        this.setState({
            body: '',
            //  due_date :'',
            // due_time: '',
            project_id: '',
            is_private: '',
            assignee: ''
        });
    }



    handleTagData() {
        console.log("Calling --- ");
        fetch('http://localhost:5000/task/tasklist', {

            method: "GET",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded ' }
        }).then(res => res.json())
            .then(res2 => {
                console.log("Size --- " + res2.list.length);
                //let allList = JSON.stringify(res2.list)
                // console.log("All List --- " + allList);
                this.setState({
                    allTask: res2.list
                });

                console.log("Project Names --- " + JSON.stringify(this.state.allTask));




            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }


    componentDidMount = () => {
        this.handleTagData();

    }





    handleSubmit(e) {
        e.preventDefault();

        const editTask = {

            body: this.state.body,
            //due_date: '',
            //due_time: '',
            project_id: this.state.project_id,
            //assignee: this.state.assignee,
            is_private: parseInt(this.state.is_private),
            id: this.state.id
        }

        this.state.allTask[this.state.editIndex].body = this.state.body


        this.props.editTask(editTask, this.props.history);


        //this.resetField();
        this.close();
    }


    handleClick(name, tid, index) {
        console.log("Value Details --- " + name + " " + tid + " " + " " + index)
        this.setState({
            open: true,
            body: name,
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
        const deleteTask = {
            id: this.state.id
        }

        this.setState((prevState) => ({
            allTask: prevState.allTask.filter((_, i) => i !== this.state.delIndex)
        }));

        this.props.deleteTask(deleteTask, this.props.history);
        this.close();
    }

    handleProjectChange = (e, { value }) => this.setState((prevState, props) => {
        let newState = { ...prevState }
        newState.project_id = value;
        return { ...newState };
    });

    handleAssigneeChange = (e, { value }) => this.setState((prevState, props) => {
        let newState = { ...prevState }
        newState.assignee = value;
        return { ...newState };
    });


    render() {


        const { open1, open, size } = this.state;

        return (

            <div>
                {this.state.allTask && this.state.allTask.map((task, i) =>
                    <div>



                        <div style={{ width: "150px", height: "20px", background: "green", textAlign: "center", borderRadius: "10px", }} onClick={this.show("small", task.body, task.project_id, task.is_private, task.id, i)}>{task.body}</div>
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
                                <Modal.Header> Edit Todo</Modal.Header>
                                <Modal.Content>



                                    <Form onSubmit={this.handleSubmit} >

                                        <Form.Field>
                                            <label>Body</label>
                                            <input name="body" value={this.state.body} onChange={this.handleChange} />
                                        </Form.Field>


                                        <div id="4" >

                                            <label><b>Due</b></label>

                                            <AddTaskDate />








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

                                        <div id="109" style={{ display: "block" }}>

                                            <Form.Field >
                                                <label>Asignee</label>
                                                <Dropdown
                                                    fluid
                                                    selection
                                                    multiple={false}
                                                    search={true}
                                                    options={options}
                                                    value={this.state.assignee}
                                                    placeholder='Select a assignee'
                                                    onChange={this.handleAssigneeChange}

                                                    disabled={false}
                                                    loading={false}
                                                />
                                            </Form.Field>


                                        </div>




                                        <br />
                                        <Divider></Divider>

                                        <Form.Field>
                                            <label style={{ float: "right", }}><input type="file" name="file" style={{ display: "none" }} /><Icon name="plus square outline" size="large" /></label>
                                            <label>File</label>
                                        </Form.Field>



                                        <Divider></Divider>

                                        <Form.TextArea label="Comments" name="comment" placeholder="Add some notes"  value={this.state.comment} onChange={this.handleChange}/>

                                        

                                        <Button primary  style={{ float:"right" }}>
                                            Add Comment
                            </Button><br /><br />

                                        <Divider></Divider>
                                        <br />

                                   
                           
                            <Button primary type="submit" style={{ float:"right"}}>
                                            Save
                            </Button>

                                    </Form>
                                    <Button secondary onClick={(e) => this.handleClickDelete(task.id, i)} style={{float:"right"}} >
                                            Delete
                            </Button>&nbsp;&nbsp;
                            <Button secondary onClick={this.close} style={{float:"right"}}>
                                            Cancel
                            </Button>&nbsp;&nbsp;
                                </Modal.Content>
                            </Modal>
                        </>


                    </div>
                )}

            </div>

        )
    }
}




EditTaskEvent.propTypes = {
    //classes: PropTypes.object.isRequired,
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    task: state.project,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { editTask, deleteTask })(EditTaskEvent);


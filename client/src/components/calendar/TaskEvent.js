import React, { Component, useState } from 'react'
import { Button, Modal, Form, Checkbox,  } from 'semantic-ui-react';

import { Dropdown, Divider } from 'semantic-ui-react'
import DateRange from './DateRange';
import AddTaskDate from './AddTaskDate'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addTask } from './taskevent/TaskApi'
const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]


class TaskEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body : '',
            due_date : '',
            due_time: '',
            project_id: '',
            assignee : '',
            is_private: 0,
            open: false

        }
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })


    handleCheck = (e, id) => {

        if ((document.getElementById(id).style.display == "block")) { document.getElementById(id).style.display = "none"; }

        else if ((document.getElementById(id).style.display == "none")) {
            document.getElementById(id).style.display = "block";

        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleShow = (show) => {
        this.setState({
            show: show
        })
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
            body : '',
      //  due_date :'',
       // due_time: '',
        project_id: '',
        is_private:'',
        assignee : ''
        });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        let addTask = {
            body : this.state.body,
           // due_date : this.state.due_date,
           // due_time: this.state.due_time,
            project_id: this.state.project_id,
            is_private: parseInt(this.state.is_private) ,
            assignee : this.state.assignee
        }
     



      

        this.props.addTask(addTask, this.props.history);
        this.resetField();
        this.handleShow(false);
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

        const { open, size } = this.state
        return (

            <div>
                <>

                    <div style={{ width: "135px", height: "15px" }} onClick={this.show('medium')}>Task</div>
                    <Modal size={size} open={open} onClose={this.close}>
                    <Modal.Header>  Add Todo</Modal.Header>
                    <Modal.Content>
                             
                    


                            <Form onSubmit={this.handleSubmit} >
                            <Form.Field>
                                <label>Body</label>
                                <input name="body" value={this.state.body} onChange={this.handleChange}/>
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


                               <br/>
                                <Checkbox label="Make Task Private" onClick={(e) => this.handleCheck(e, 109)}/>

                                <br />



                                {/* 
                                <AddDate /> */}
                                <div id="3"></div>
                                {/* <button class="btn btn-light" onClick={(e) => this.handleDate(e, 3)} style={{width:"650px"}} >
                                    Create New Client
                                            </button><br /><br /> */}


                                <Divider></Divider>


                           
                            <Button primary disabled={!(this.state.body)} type="submit" style={{ float: "right"}}>
                                    Create
                            </Button>

                            </Form>
                            <Button secondary onClick={this.close} style={{ float: "right" }}>
                                    Cancel
                            </Button>&nbsp;<br/><br/>
                            </Modal.Content>
                    </Modal>
                </>

            </div>

        )
    }
}




TaskEvent.propTypes = {
    //classes: PropTypes.object.isRequired,
    addTask: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    task: state.task,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { addTask })(TaskEvent);


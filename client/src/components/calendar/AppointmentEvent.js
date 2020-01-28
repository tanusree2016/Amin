import React, { Component, useState } from 'react'


import { Dropdown, Divider, Button, Modal, Form, } from 'semantic-ui-react'
import DateRange from './DateRange';
import AddDate from './AddDate'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addAppointment } from './appointment/AppointmentApi'

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]


class AppointmentEvent extends Component {
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
            open: false


        }
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleShow = (show) => {
        this.setState({
            show: show
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
            id: 0,
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
        });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        let addAppointment = {

            title: this.state.title,
            // start_date: '',
            // end_date: '',
            // start_time: '',
            // end_time: '',
            // is_all_day: '',
            // show_me: '',
            project_id: this.state.project_id,
            location: this.state.location,
            description: this.state.description,

        }





        this.props.addAppointment(addAppointment, this.props.history);
        this.resetField();
    }


    handleClientChange = (e, { value }) => this.setState((prevState, props) => {
        let newState = { ...prevState }
        newState.project_id = value;
        return { ...newState };
    });

    render() {
        const { open, size } = this.state;
        return (

            <div>
                <>
                  

                    <div style={{ width: "135px", height: "15px" }} onClick={this.show('medium')}>Appointment</div>
                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>     Add Appointment</Modal.Header>
                        <Modal.Content>
                            <Form onSubmit={this.handleSubmit} >
                                <Form.Field>
                                    <label>Title*</label>
                                    <input name="title" placeholder='Enter project title here' value={this.state.title} onChange={this.handleChange} />
                                </Form.Field>
                                <div id="4" style={{padding:"8px"}}>
                                    <AddDate />
                                </div>
                                <Form.Field >
                                    <label>Client*</label>
                                    <Dropdown
                                        fluid
                                        selection
                                        multiple={false}
                                        search={true}
                                        options={options}
                                        value={this.state.project_id}
                                        placeholder='Select your project status'
                                        onChange={this.handleClientChange}

                                        disabled={false}
                                        loading={false}
                                    />
                                </Form.Field>
                                <Form.TextArea label='Location' name="location" placeholder="Add some notes" value={this.state.location} onChange={this.handleChange} />
                                <Form.TextArea label='Description' name="description" placeholder="Add some notes" value={this.state.description} onChange={this.handleChange} />
                    
                                <div id="3"></div>

                                <Divider></Divider>

                             
                            <Button variant="secondary" disabled={!(this.state.title)} type="submit" style={{ float: "right", marginRight: "30px", background: "#e9768d" }}>
                                    Create
                            </Button>
                            </Form>
                            <Button variant="secondary" onClick={this.close} style={{ float: "right" }}>
                                    Cancel
                            </Button>&nbsp;
                            <br/>   <br/>
                        </Modal.Content>
                       
                    </Modal>
                </>

            </div>

        )
    }
}




AppointmentEvent.propTypes = {
    //classes: PropTypes.object.isRequired,
    addAppointment: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { addAppointment })(AppointmentEvent);


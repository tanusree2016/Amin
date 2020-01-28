import React, { Component, useState } from 'react'


import { Dropdown, Divider,Button,Modal, Form, Grid,Popup} from 'semantic-ui-react'
import DateRange from './DateRange';
import AddDate from './AddDate'
import PropTypes from 'prop-types';
import './hvr.css'
import { connect } from 'react-redux';
import {createProject} from './CreateNewProject'

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]
  const options1 = [
    { key: 'q', text: 'Male', value: 'male' },
    { key: 'w', text: 'Female', value: 'female' },
    { key: 'e', text: 'Other', value: 'other' },
  ]
  const options2 = [
    { key: 'r', text: 'Male', value: 'male' },
    { key: 't', text: 'Female', value: 'female' },
    { key: 'y', text: 'Other', value: 'other' },
  ]

class NewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project_title: '',
            client_id: 0,
            status: 0,
            first_name: '',
            last_name: '',
            company_name: '',
            emailaddress: '',
            phoneno: '',
           
            tag_id: 0,
            notes: '',
            start_date: '',
            end_date: '',
            start_time: '',
            end_time: '',
            is_all_day: '',
            show_me: '',
            available: '',
            busy: '',
            createproject: [],
            open: false

        }
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    handleChangeSelect = (e, { value }) => this.setState({ value })

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleClientChange = (e, { value }) => this.setState((prevState, props) => {
        let newState = { ...prevState }
        newState.client_id = value;
        return { ...newState };
    });

    handleStatusChange = (e, { value }) => this.setState((prevState, props) => {
        let newState = { ...prevState }
        newState.status = value;
        return { ...newState };
    });


    handleTagChange = (e, { value }) => this.setState((prevState, props) => {
        let newState = { ...prevState }
        newState.tag_id = value;
        return { ...newState };
    });


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
            project_title: '',
            client_id: 0,
            status: 0,
            first_name: '',
            last_name: '',
            company_name: '',
            email: '',
            phone_number: '',
            status: '',
            tag_id: 0,
            notes: '',
        });
    }


    handleSubmit=(event)=>{
        event.preventDefault();
        let createProject = {

            project_title: this.state.project_title,
            client_id: parseInt(this.state.client_id),
            status: parseInt(this.state.status),
            tag_id: parseInt(this.state.tag_id),
            notes: this.state.notes,
            // start_date: '',
            // end_date: '',
            // start_time: '',
            // end_time: '',
            // is_all_day: '',
            // show_me: '',
            // available: '',
            // busy: ''

        }
       // alert(this.state.client_id)
        // const createNewClient = {

        //     first_name: this.state.first_name,
        //     last_name: this.state.last_name,
        //     company_name: this.state.company_name,
        //     email: this.state.email,
        //     phone_number: this.state.phone_number,

        // }


        console.log("")
        //this.props.createNewClient(createNewClient, this.props.history);
        this.props.createProject(createProject, this.props.history);
        this.resetField();
    }



    componentDidMount = () => {
        this.handleData();
    }


    render() {
        const { open, size } = this.state;
        // const list = this.state.createproject.map(item => {
        //     return <h1>{item.dub_project}</h1>
        // })
        //    {if(projectTitle===this.state.projectTitle&&client===this.state.client&&status===this.state.status)?}
        return (

            <div>
                <>

                    <Button style={{background:"#e9768d",color:"white"}} onClick={this.show('medium')} >New Project</Button>
                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>
                            
                                Create a new project
                  
                        </Modal.Header>
                        <Modal.Content>


                            <Form onSubmit={this.handleSubmit}>
                                
                                   
                            <Form.Field>
                                        <label>Project Name*</label>
                                        <input  name="project_title" placeholder='Enter project title here' value={this.state.project_title} onChange={this.handleChange}  />
                                    </Form.Field>
                                    <div id="1"></div>

                                            <Grid columns={2} relaxed='very' stackable>
                                                 <Grid.Column>
                                                

                                                    <Form.Field >
                                                    <label>Client*</label>
                                                    <Dropdown
                                                        fluid
                                                        selection
                                                        multiple={false}
                                                        search={true}
                                                        options={options1}
                                                        value={this.state.client_id}
                                                        placeholder='Select your project status'
                                                        onChange={this.handleClientChange}
                                                    
                                                        disabled={false}
                                                        loading={false}
                                                    />
                                                </Form.Field>

                                                  </Grid.Column>

                                                  <Grid.Column verticalAlign='middle'>
                                                  <text>OR</text><br/>
                                                  <div className="hvr" onClick={(e) => this.handleClick(e, 1)} style={{ background: "rgb(250,250,250)", width: "50%", height: "35px", textAlign: "center", paddingTop: "7px" }}>
                                                  Create New Client
                                                  </div>
                                                    </Grid.Column>
    
                                              </Grid><br/>

                             

                                <div id="2" style={{ display: "none", background: "rgb(250,250,250)",  }}>

                                 
                                      
                                                <Form.Field>
                                        <label>First Name*</label>
                                        <input  name="first_name" placeholder='First Name' id="6" value={this.state.first_name} onChange={this.handleChange}  />
                                    </Form.Field>
                                       
                                    
                                        <Form.Field>
                                        <label>Last Name</label>
                                        <input  name="last_name" placeholder='Last Name'  value={this.state.last_name} onChange={this.handleChange}  />
                                    </Form.Field>
                                        
                                      
                            


                                    <Divider horizontal>Optional</Divider>

                                  
                                            <Form.Field>
                                        <label>Company Name</label>
                                        <input  name="company_name" placeholder='Company Name'  value={this.state.company_name} onChange={this.handleChange}  />
                                    </Form.Field>
                                   
                                 
                                               <Form.Field>
                                        <label>Email Address</label>
                                        <input type="email" name="email" placeholder='Enter an email address'  value={this.state.email} onChange={this.handleChange}  />
                                    </Form.Field>
                                      
                                                 <Form.Field>
                                        <label>Phone Number</label>
                                        <input name="phone_number" placeholder='Enter a phone no.'  value={this.state.phone_number} onChange={this.handleChange}  />
                                    </Form.Field>
                                        
                                      
                                </div><br/>

                                <Popup
                                    trigger={<text style={{ float: "right"}}>What is this?</text>}
                                    content='  Assign a status to this project to help you keep track of the progress you made'
                                    offset=''
                                    position='top right'
                                    />
                                                
                               
                                  

                                    <Form.Field >
                                    <label>Status*</label>
                                            <Dropdown
                                                fluid
                                                selection
                                                multiple={false}
                                                search={true}
                                                options={options}
                                                value={this.state.status}
                                                placeholder='Select your project status'
                                                onChange={this.handleStatusChange}
                                            
                                                disabled={false}
                                                loading={false}
                                            />
                                    </Form.Field>

                             

                                <Divider horizontal>Optional</Divider>



                                            <Popup
                                                trigger={<text style={{ float: "right"}}>What is this?</text>}
                                                content='Assign tags to this project to help you identify it and search for it later'
                                                offset=''
                                                position='top right'
                                                />
                                                    
                                  
                                

                                    <Form.Field >
                                    <label>Tags</label>
                                            <Dropdown
                                                fluid
                                                selection
                                                multiple={false}
                                                search={true}
                                                options={options}
                                                value={this.state.tag_id}
                                                placeholder='Tags'
                                                onChange={this.handleTagChange}
                                            
                                                disabled={false}
                                                loading={false}
                                            />
                                    </Form.Field>
                                
                                <Form.Field>
                                        <label>Notes</label>
                                        <input name="notes" placeholder='Add some notes'  value={this.state.notes} onChange={this.handleChange}  />
                                    </Form.Field>
                                   

                                {/* 
                                <AddDate /> */}
                                <div id="3"></div>
                                {/* <button class="btn btn-light" onClick={(e) => this.handleDate(e, 3)} style={{width:"650px"}} >
                                    Create New Client
                                            </button><br /><br /> */}
                                <div className="hvr" onClick={(e) => this.handleDate(e, 3)} style={{ background: "rgb(250,250,250)", height: "35px", textAlign: "center", paddingTop: "7px" }}>
                                    <text id="5">Add Dates</text>
                                </div><br /><br />


                                <div id="4" style={{ display: "none", background: "rgb(250,250,250)",padding:"15px" }}>
                                  
                                     

                                            <AddDate />


                                            





                                

                                </div>
                                <br /><Divider></Divider>
                                <br />
                                <Button secondary onClick={() => this.close()} style={{ float: "right" }}>
                                    Cancel
                            </Button>&nbsp;
                            <Button primary disabled={!(this.state.project_title)} type="submit" style={{ float: "right", marginRight: "30px",}}>
                                    Submit
                            </Button>
                      </Form>
                      <br/>
                            </Modal.Content>
                  
                    </Modal>
                </>

            </div>

        )
    }
}




NewProject.propTypes = {
    //classes: PropTypes.object.isRequired,
    createProject: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    project: state.project,
    errors: state.errors
  });
   
  //export default withStyles(styles)(Company);
  export default connect(mapStateToProps, {createProject})(NewProject);


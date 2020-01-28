import React, { Component, useState } from 'react'


import { Modal, Form, Button, Dropdown, Divider, Icon, Grid, Segment ,Image} from 'semantic-ui-react'


import { connect } from 'react-redux';
//import { createProject } from './CreateNewProject'




class EditClientModal extends Component {
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
            project: '',
            assignee: ''
        });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        let createProject = {

            project_title: this.state.project_title,
            client_id: parseInt(this.state.client_id),
            status: parseInt(this.state.status),
            tag_id: parseInt(this.state.tag_id),
            notes: this.state.notes,

        }
        alert(this.state.client_id)



        console.log("")

        this.props.createProject(createProject, this.props.history);
        this.resetField();
    }



    componentDidMount = () => {
        this.handleData();
    }


    render() {
        const { open, size } = this.state
        return (

            <div>

                <Icon name="pencil" onClick={this.show('medium')} />


                <Modal size={size} open={open} onClose={this.close}>
                    <Modal.Header>Delete Your Account</Modal.Header>
                    <Modal.Content>
                        
                    <Form>
                        <Grid columns={2} padded>
                            <Grid.Row>
                            <Grid.Column>


                                    <text style={{ fontSize: "30px" }}>General</text><br/>
                                    <div style={{ marginLeft: "25%" }}>
                                    <Segment style={{ width: "60%", height: "130px"}}> <Image src='/images/wireframe/image.png' /></Segment>
                                    <Button secondary style={{width:"60%"}}><Icon name="pencil" /></Button>
                                    </div>
                                    <Form.Field>
                                        <label>Facebook</label>
                                        <input placeholder='Facebook username' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Twitter</label>
                                        <input placeholder='Twitter username' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Instagram</label>
                                        <input placeholder='Instagram username' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Website</label>
                                        <input placeholder='Website url' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Pinterest</label>
                                        <input placeholder='Pinterest username' />
                                    </Form.Field>
                                  
                              
                               
                            </Grid.Column>
                            <Grid.Column>
                            <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>First Name</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Last Name</label>
                                        <input placeholder='Last Name' />
                                    </Form.Field>
                                    </Form.Group >
                                    <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Email</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Phone</label>
                                        <input placeholder='Last Name' />
                                    </Form.Field>
                                   
                                    </Form.Group >
                                    <text style={{ fontSize: "30px" }}>Address</text><br/>
                                    <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Line 1</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Line 2</label>
                                        <input placeholder='Last Name' />
                                    </Form.Field>
                                    </Form.Group >
                                    <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>City</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>State/Province</label>
                                        <input placeholder='Last Name' />
                                    </Form.Field>
                                    </Form.Group >
                                    <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Zip/Postal</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    
                                    </Form.Group >
                                    <Form.Field>
                                        <label>Country</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    
                                    
                                   
                                  
                              
                            </Grid.Column>
                            </Grid.Row>
                            <text style={{ fontSize: "30px" }}>Alternate Contact</text><br/>
                            <Grid.Row>
                            <Grid.Column>
                           
                                    
                                   
                                    <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>First Name</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    
                                    </Form.Group >
                                    <Form.Field>
                                        <label>First Name</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    
                                    
                                   
                                  
                              
                            </Grid.Column>
                            <Grid.Column>
                           
                                    <Form.Field>
                                        <label>Last Name</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Phone</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    
                                    
                                   
                                  
                              
                            </Grid.Column>
                            </Grid.Row>
                            <text style={{ fontSize: "30px" }}>Company</text><br/>
                            <Grid.Row>
                            <Grid.Column>
                           
                                    
                                   
                                    <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Name</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    
                                    </Form.Group >
                                    <Form.Field>
                                        <label>Phone</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    
                                    
                                   
                                  
                              
                            </Grid.Column>
                            <Grid.Column>
                           
                                    <Form.Field>
                                        <label>Email</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                 
                                    
                                    
                                   
                                  
                              
                            </Grid.Column>
                            </Grid.Row>
                            <text style={{ fontSize: "30px" }}>Shipping Address</text><br/>
                            <Grid.Row>
                            <Grid.Column>
                           
                                    
                                   
                                    <Form.Group widths='equal'>
                                    <Form.Field>
                                        <label>Line 1</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    
                                    </Form.Group >
                                    <Form.Field>
                                        <label>City</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    
                                    <Form.Field>
                                        <label>Zip/Postal</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                   
                                  
                              
                            </Grid.Column>
                            <Grid.Column>
                           
                                    <Form.Field>
                                        <label>Line 2</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>State/Province</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                    
                                    <Form.Field>
                                        <label>Country</label>
                                        <input placeholder='First Name' />
                                    </Form.Field>
                                   
                                  
                              
                            </Grid.Column>
                            </Grid.Row>
                           
                        </Grid>
                       
                        
                       
                        </Form>
                    
                           

                    </Modal.Content>
                    <Modal.Header></Modal.Header>
                    
                    <Modal.Header>
                    <text style={{ fontSize: "30px" }}>Custom Mapped Fields</text>
                    </Modal.Header>
                    
                    <Modal.Actions>
                    <Button secondary>Save & Close</Button>
                 
                    </Modal.Actions>
               
                </Modal>
            </div>

        )
    }
}




EditClientModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    //createProject: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps)(EditClientModal);


// import React, { Component, useState } from 'react'
// import { Button, Modal, Form, ButtonToolbar, OverlayTrigger, Col, Tooltip, DropdownButton } from 'react-bootstrap';
// //import 'bootstrap/dist/css/bootstrap.min.css';
// import { Dropdown, Divider, Icon, Popup } from 'semantic-ui-react'
// //import DateRange from './DateRange';
// //import AddTaskDate from './AddTaskDate'
// import PropTypes from 'prop-types';
// //import './hvr.css'
// import { connect } from 'react-redux';
// //import { createProject } from './CreateNewProject'
// import { SketchPicker } from 'react-color';

// const options = [
//     { key: 'angular', text: 'Angular', value: 'angular' },
//     { key: 'css', text: 'CSS', value: 'css' },
//     { key: 'design', text: 'Graphic Design', value: 'design' },
//     { key: 'ember', text: 'Ember', value: 'ember' },
//     { key: 'html', text: 'HTML', value: 'html' },
//     { key: 'ia', text: 'Information Architecture', value: 'ia' },
//     { key: 'javascript', text: 'Javascript', value: 'javascript' },
//     { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
//     { key: 'meteor', text: 'Meteor', value: 'meteor' },
//     { key: 'node', text: 'NodeJS', value: 'node' },
//     { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
//     { key: 'python', text: 'Python', value: 'python' },
//     { key: 'rails', text: 'Rails', value: 'rails' },
//     { key: 'react', text: 'React', value: 'react' },
//     { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
//     { key: 'ruby', text: 'Ruby', value: 'ruby' },
//     { key: 'ui', text: 'UI Design', value: 'ui' },
//     { key: 'ux', text: 'User Experience', value: 'ux' },
// ]


// class AdModal extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             project_title: '',
//             client_id: 0,
//             status: 0,
//             first_name: '',
//             last_name: '',
//             company_name: '',
//             emailaddress: '',
//             phoneno: '',

//             tag_id: 0,
//             notes: '',
//             start_date: '',
//             end_date: '',
//             start_time: '',
//             end_time: '',
//             is_all_day: '',
//             show_me: '',
//             available: '',
//             busy: '',
//             createproject: []

//         }
//         //this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleCheck = (e, id) => {

//         if ((document.getElementById(id).style.display == "block")) { document.getElementById(id).style.display = "none"; }

//         else if ((document.getElementById(id).style.display == "none")) {
//             document.getElementById(id).style.display = "block";

//         }
//     }

//     handleChange = (e) => {
//         this.setState({ [e.target.name]: e.target.value })
//     }
//     handleShow = (show,title,project_id,location,description,aid,index) => {
//         this.setState({
//             show: show,
          
//             title: title,
//             project_id:project_id,
//             location : location,
//             description: description,
//             id: aid,
//             editIndex: index,
//         })
//     }

//     handleData = () => {
//         fetch('/list')
//             .then(response => response.json())
//             .then(res2 => this.setState({ createproject: res2 }));

//     }


//     handleClick = (e, id) => {
//         id = id + 1

//         document.getElementById(id).style.display = "block";
//         document.getElementById(id + 4).required = true;

//     }
//     handleDate = (e, id) => {
//         id = id + 1
//         if (document.getElementById(id).style.display == "none") {
//             document.getElementById(id).style.display = "block";
//             document.getElementById(id + 1).innerHTML = "Hide Dates"

//         }

//         else {
//             if (document.getElementById(id + 1).innerHTML = "Hide Dates")
//                 document.getElementById(id + 1).innerHTML = "Add Dates"

//             document.getElementById(id).style.display = "none";

//         }
//     }

//     resetField = () => {
//         this.setState({
//             project_title: '',
//             client_id: 0,
//             status: 0,
//             first_name: '',
//             last_name: '',
//             company_name: '',
//             email: '',
//             phone_number: '',
//             status: '',
//             tag_id: 0,
//             notes: '',
//             project: '',
//             assignee: ''
//         });
//     }



//     // handleSubmit = (event) => {
//     //     event.preventDefault();
//     //     let createProject = {

//     //         project_title: this.state.project_title,
//     //         client_id: parseInt(this.state.client_id),
//     //         status: parseInt(this.state.status),
//     //         tag_id: parseInt(this.state.tag_id),
//     //         notes: this.state.notes,

//     //     }
//     //     alert(this.state.client_id)



//     //     console.log("")

//     //     this.props.createProject(createProject, this.props.history);
//     //     this.resetField();
//     // }



//     componentDidMount = () => {
//         this.handleData();
//     }


//     render() {
//         return (

//             <div>
//                 <>

//                     <div style={{ width: "80px", height: "15px" }} onClick={() => this.handleShow(true)}><text><Icon name='cog'/>Edit</text></div>



//                     <Modal
//                         show={this.state.show}
//                         onHide={() => this.handleShow(false)}
//                         dialogClassName="modal-90w"
//                         aria-labelledby="example-custom-modal-styling-title"
//                         size="lg"

//                     >
//                         <Modal.Header closeButton>
//                             <Modal.Title id="example-custom-modal-styling-title">
//                                 Edit Sourse
//                      </Modal.Title>
//                         </Modal.Header>
//                         <br />
//                         <Modal.Body>


//                             <Form onSubmit={this.handleSubmit} >
//                                 <Form.Group controlId="formBasicEmail">

//                                     <Form.Label><b>Source name*</b></Form.Label>
//                                     <Form.Control type="text" placeholder="Enter project title here" name="project_title" value={this.state.project_title} required />

//                                 </Form.Group>

//                                 <Form.Group >

//                                     <Form.Label><b>Select color*</b></Form.Label>
//                                     <br />
//                                     <Icon name="stop" size="big" style={{ color: "red" }} />
//                                     <Icon name="stop" size="big" style={{ color: "yellow" }} />
//                                     <Icon name="stop" size="big" style={{ color: "pink" }} />
//                                     <Icon name="stop" size="big" style={{ color: "arange" }} />
//                                     <Icon name="stop" size="big" style={{ color: "blue" }} />
//                                     <Icon name="stop" size="big" style={{ color: "green" }} /><br />
//                                     <Icon name="stop" size="big" style={{ color: "grey" }} />
//                                     <Icon name="stop" size="big" style={{ color: "teal" }} />
//                                     <Icon name="stop" size="big" style={{ color: "yellow" }} />
//                                     <Icon name="stop" size="big" style={{ color: "pink" }} />
//                                     <Icon name="check square" size="big" style={{ color: "red" }} />




//                                     <Popup
//                                         trigger={
//                                             <Icon name="plus square outline" size="big" content='Activate doomsday device' />
//                                         }

//                                         content={<div>
//                                             <b>Custom color picker</b> <br />
//                                             <SketchPicker /><br />
//                                             <Button type="submit">Add</Button><br />
//                                             <Divider></Divider>
//                                             <text><b>Applied color</b></text><br /><br />
//                                             <Icon name="check square" size="big" style={{ color: "red" }} />
//                                             <Divider></Divider>
//                                             <b style={{ textAlign: "center" }}>Use this color</b>
//                                         </div>}
//                                         on='click'
//                                         position='right center'
//                                         size='mini'
//                                     />


//                                 </Form.Group >




//                                 <Divider></Divider>


//                                 <Button variant="secondary" onClick={() => this.handleShow(false)} style={{ float: "right" }}>
//                                     Cancel
//                             </Button>&nbsp;
//                             <Button variant="secondary" disabled={!(this.state.project_title)} type="submit" style={{ float: "right", marginRight: "30px", background: "#e9768d" }}>
//                                     Save
//                             </Button>

//                             </Form>
//                         </Modal.Body>
//                     </Modal>
//                 </>
//             </div>

//         )
//     }
// }




// AddBoardModal.propTypes = {
//     //classes: PropTypes.object.isRequired,
//     //createProject: PropTypes.func.isRequired,
//     //auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     project: state.project,
//     errors: state.errors
// });

// //export default withStyles(styles)(Company);
// export default connect(mapStateToProps)(AddBoardModal);


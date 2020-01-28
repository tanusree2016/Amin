import React, { Component, useState } from 'react'


import { Dropdown, Divider, Icon, Button, Segment ,Progress,Modal,} from 'semantic-ui-react'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';





class QuesUploadModal extends Component {
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
            createproject: []

        }
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

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
        return (

            <div>
                <>

                    <div><u><Icon name="arrow up" size="small" onClick={() => this.handleShow(true)} /></u></div>



                    <Modal
                        show={this.state.show}
                        onHide={() => this.handleShow(false)}
                        dialogClassName="modal-90w"
                        aria-labelledby="example-custom-modal-styling-title"
                        size="xl"

                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Upload PDF <Button style={{ marginLeft: "400px" }}>Add</Button> <Button style={{ float: "right" }}>Cancel</Button><br />
                                <text style={{ fontSize: "13px" }}><i>Add a PDF file (8MB Max File Size)</i></text>
                            </Modal.Title>
                        </Modal.Header>
                        <br />
                        <Modal.Body>
                            <div style={{ width: "700px",textAlign:"center" }}>
                                <Segment>
                                    <div style={{borderStyle: 'dashed',padding:"20px",color:"#ddd"}}>
                                    <Progress percent={20} size='small' color="blue">
                                        small
                                     </Progress>
                                     <br/> 
                                     <text style={{fontSize:"25px"}}>Drop PDF Here</text>
                                     <br/>     <br/> 
                                     <text style={{fontSize:"25px"}}>- or -</text>
                                     <Button secondary fluid>Select PDF File</Button>
                                     </div>

                                </Segment>

                                

                            </div>


                        </Modal.Body>
                    </Modal>
                </>
            </div>

        )
    }
}




QuesUploadModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    createProject: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps)(QuesUploadModal);






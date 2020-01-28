import React, { Component } from 'react'
import { Segment, Header, Icon, Message, Button, Checkbox, Grid, Dropdown } from 'semantic-ui-react'
import AddStatusModal from './AddStatusModal'
import EditLeadsModal from './EditLeadsModal';
import EditJobsModal from './EditJobsModal';
import AddTagModal from './AddTagModal';
import EditTagModal from './EditTagModal';
import { Form, Col, ButtonGroup,Modal,Row } from 'react-bootstrap'
import _ from 'lodash'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import PropTypes from 'prop-types';
import {tagEdit} from './customize/AddTagApi'
class Customize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag:'',
            tagdata: []
        }
    }
    handleEdit = (e, id) => {
        document.getElementById(id).style.display = "inline"
        document.getElementById(id - 1).style.display = "inline"
        document.getElementById(id + 1).style.display = "none"
    }

    handleCancel = (e, id) => {

        document.getElementById(id + 1).style.display = "inline"
        document.getElementById(id).style.display = "none"
        document.getElementById(id - 1).style.display = "none"
    }


    handleTagData() {
        console.log("Calling --- ");
        fetch('http://localhost:5000/customize/taglist', {

            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded ' }
        }).then(res => res.json())
            .then(res2 => {
                console.log("Size --- " + res2.taglist.length);
                //let allList = JSON.stringify(res2.list)
                // console.log("All List --- " + allList);
                this.setState({
                    tagdata: res2.taglist
                });




                console.log("Project Names --- " + this.state.tagdata);

            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }


    componentDidMount = () => {
        this.handleTagData();

    }

    // handleTagDelete=(id)=>{

    //     const tagDelete = {
    //         tagDeleteid: this.state.tagDeleteid
    //     }
        
  
    //     fetch('http://localhost:5000/customize/edit-tag/'+id,{method:"delete"})
    //     .then(res=>res.json())
    //     .then(res2=>{
    //       console.log(res2)
    //       const newTagData = this.state.mywishes.filter(item=>{
    //         return item._id !== res2._id
    //       })
    //       this.setState({
    //         tagdata:newTagData
    //       })
    //     })
    //     this.props.tagDelete(tagDelete,this.props.history);
    //   }

    handleClick(e, index,show) {
    
        this.setState({
            show: show,
            tag: e,
        })
    };
    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    handleSubmit(e) {
        e.preventDefault();
      
        const tagEdit = {

            tag: this.state.tag,
         
        }

        this.state.tagdata[this.state.editIndex].tag= this.state.tag
   

        this.props.tagEdit(tagEdit, this.props.history);
        //this.resetField();
        this.handleClose();
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleShow = (show) => {
        this.setState({
            show: show
        })
    }

    render() {
        const { tagdata } = this.state;
        return (
            <div style={{ padding: "20px", }}>
                <div ><br />
                    <Header attached='top' style={{ background: "#e9768d", color: "white", marginTop: "-10px" }}>
                        {/* <Button color="red" floated="right" style={{background:"#ccc",border:"1px solid black"}}>Add Status</Button> */}
                        {/* <Button color='#eee'floated="right" style={{border:"1px solid #aaa"}}>Add Status</Button> */}

                        <text style={{ float: "right" }}><AddStatusModal /></text>
                        <h2>Project Status</h2>
                        <text>Customize your projects page here. Click checkbox for default view on projects page.</text>
                    </Header>



                    <Segment attached='bottom'>
                        <text>Leads</text>
                        <Segment style={{ background: "#dddddd", overflow: "auto", height: "120px", padding: "3px", whiteSpace: "nowrap" }}>
                            <ButtonGroup>
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                                <EditLeadsModal />
                            </ButtonGroup>



                        </Segment>
                        <text>Jobs</text>
                        <Segment style={{ background: "#dddddd", overflow: "auto", height: "120px", padding: "3px", whiteSpace: "nowrap" }}>
                            <ButtonGroup>
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                                <EditJobsModal />
                            </ButtonGroup>

                        </Segment>
                    </Segment>
                </div><br />
                <div>
                    <Header attached='top' style={{ background: "#e9768d", color: "white" }}>
                        <Button id="23" color='#eee' floated="right" style={{ border: "1px solid #aaa", display: "none" }} onClick={(e) => this.handleCancel(e, 23)}>Save</Button>
                        <Button id="22" color='#eee' floated="right" style={{ border: "1px solid #aaa", display: "none" }} onClick={(e) => this.handleCancel(e, 23)}>cancle</Button>

                        <Button id="24" color='#eee' floated="right" style={{ border: "1px solid #aaa" }} onClick={(e) => this.handleEdit(e, 23)}>Edit Column</Button>

                        <h2>Columns</h2>
                        <text>Customize which columns will be visible in your projects page.</text>
                    </Header>


                    <Segment attached>
                        <text>General :</text> <br /><br />
                        <Grid style={{ marginLeft: "6px" }}>
                            <Grid.Row columns={7}>
                                <Grid.Column>
                                    <Checkbox label={{ children: 'Date' }} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Checkbox label={{ children: 'Invoice' }} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Checkbox label={{ children: 'Contract' }} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Checkbox label={{ children: 'Company' }} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Checkbox label={{ children: 'Created Date' }} />
                                </Grid.Column>
                                <Grid.Column>
                                    <Checkbox label={{ children: 'Project Source' }} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <br />

                        <Form>
                            {/* <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select">
                                    <option>Choose...</option>
                                    <option>Project Title(A-Z)</option>
                                    <option>Created Date</option>
                                    <option>Project Date</option>
                                    <option>Status</option>
                                   
                                </Form.Control>
                                <Form.Label>State</Form.Label>
                                <Form.Control as="select">
                                    <option>Choose...</option>
                                    <option>Project Title(A-Z)</option>
                                    <option>Created Date</option>
                                    <option>Project Date</option>
                                    <option>Status</option>
                                   
                                </Form.Control>
                            </Form.Group>
                            </Form.Row> */}

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Default sort view : </Form.Label>
                                    <Form.Control as="select">
                                        <option>Choose...</option>
                                        <option>Project Title(A-Z)</option>
                                        <option>Created Date</option>
                                        <option>Project Date</option>
                                        <option>Status</option>

                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Sort by :</Form.Label>
                                    <Form.Control as="select">
                                        <option>Choose...</option>
                                        <option>Oldest to newest</option>
                                        <option>Newest to oldest</option>
                                    </Form.Control>
                                </Form.Group>


                            </Form.Row>

                        </Form>
                        <br />
                        <text>Custom Job Mapped Fields:</text><br /><br />

                    </Segment>

                </div><br />

                <div>
                    <Header attached='top' style={{ background: "#e9768d", color: "white" }}>
                        {/* <Button color='#eee'floated="right" style={{border:"1px solid #aaa"}}>Add tag</Button> */}
                        <text style={{ float: "right" }}><AddTagModal /></text>
                        <h2>Tags</h2>
                        <text>Organize all project tags here.</text>
                    </Header>


                    <div>
                        {/* <Segment attached='bottom'>
                            <EditTagModal />
                        </Segment> */}

                        {_.map(tagdata, ({i, tag}) => (
                            <Segment attached='bottom'>
                                <Grid columns='equal'>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <li style={{ paddingLeft:"20px"}} key={i}>{tag}
                                      
                                            <Button id={i} color='green' style={{ marginLeft: "240px" }} onClick={(e)=>this.handleClick(tagdata.tag,e,true)}> Edit </Button>
                                            
                                            <Button color='brown' >Archive</Button></li>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>




                            </Segment>
                        ))}
                    </div>


                </div>


                <div>
                <>

                    {/* <Button color='green' onClick={() => this.handleShow(true)}>New Project</Button> */}
                    <Button color='#eee' floated="right" style={{ border: "1px solid #aaa" }} onClick={() => this.handleShow(true)}>Add Tag</Button>
                 
                    <Modal
                        size="lg"
                        show={this.state.show}
                        onHide={() => this.handleShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Edit Tag
                     </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form >
                                <Form.Group controlId="formBasicEmail">

                                    <Form.Label>Tag name</Form.Label>
                                    <Row>
                                        <Col>
                                        <ButtonGroup>
                                        <Form.Control type="text" placeholder="Tag name" name="tag" value={this.state.tag} onChange={this.handleChange} required />
                                        <Form.Control type="color" style={{padding:"0px", width:"30px"}}/>
                                        </ButtonGroup>
                                    
                                    </Col>
                                  
                                    </Row>
                                </Form.Group>



                                <Button secondary onClick={() => this.handleShow(false)} style={{ float: "right" }}>
                                    Cancel
                            </Button>&nbsp;
                            <Button primary type="submit"  style={{ float: "right" }} onSubmit={this.handleSubmit} >
                                    Save
                            </Button>

                            </Form>
                        </Modal.Body>
                    </Modal>
                </>

            </div>


            </div>
        )
    }
}



Customize.propTypes = {
    //classes: PropTypes.object.isRequired,
    tagEdit: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tag: state.tag,
    errors: state.errors
});

export default connect(mapStateToProps, {tagEdit} )(Customize)

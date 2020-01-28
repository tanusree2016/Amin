import React, { Component } from 'react'
import { Form, Segment, Header, Icon, Message, Button, Checkbox, Grid, Dropdown } from 'semantic-ui-react'
import AddStatusModal from './AddStatusModal'

import AddTagModal from './AddTagModal';


import _ from 'lodash'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import PropTypes from 'prop-types';
import { tagEdit, tagDelete } from './customize/AddTagApi'

import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import base_url from '../../common/utils/axios';
import JobLeadStatus from './customize/JobLeadStatus'
import TextField from '@material-ui/core/TextField';

const options = [
    { key: 'p', text: 'Project Title(A-Z)', value: 'p' },
    { key: 'c', text: 'Created Date', value: 'c' },
    { key: 'pr', text: 'Project Date', value: 'pr' },
    { key: 's', text: 'Status', value: 's' },
]
const options1 = [
    { key: 'on', text: 'Oldest to newest', value: 'on' },
    { key: 'no', text: 'Newest to oldest', value: 'no' },

]

class Customize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: '',
            tagdata: [],
            editIndex: -1,
            id: '',
            default_sort_view:"",
            sort_by:""

        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

                console.log("Project Names --- " + JSON.stringify(this.state.tagdata));




            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }


    componentDidMount = () => {
        this.handleTagData();

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

        const tagEdit = {

            tag: this.state.tag,
            id: this.state.id,
        }

        this.state.tagdata[this.state.editIndex].tag = this.state.tag


        this.props.tagEdit(tagEdit, this.props.history);


        //this.resetField();
        this.handleClose();
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

    handleDelete(e) {
        e.preventDefault();
        const tagDelete = {
            id: this.state.id
        }

        this.setState((prevState) => ({
            tagdata: prevState.tagdata.filter((_, i) => i !== this.state.delIndex)
        }));

        this.props.tagDelete(tagDelete, this.props.history);
        this.handleClose();
    }
    handleDefaultChange = (e, { value }) => this.setState((prevState, props) => {
        let newState = { ...prevState }
        newState.default_sort_view = value;
        return { ...newState };
    });
    handleSortChange = (e, { value }) => this.setState((prevState, props) => {
        let newState = { ...prevState }
        newState.sort_by = value;
        return { ...newState };
    });



    render() {

        const { open, open1 } = this.state;
        const likePointer = { cursor: 'pointer' };

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
                        <JobLeadStatus />
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


                            <Form.Group inline>


                                <Form.Field >
                                    <label>Default sort view : </label>
                                    <Dropdown
                                        fluid
                                        selection
                                        multiple={false}
                                        search={true}
                                        options={options}
                                        value={this.state.default_sort_view}
                                        placeholder='Choose...'
                                        onChange={this.handleDefaultChange}

                                        disabled={false}
                                        loading={false}
                                    />
                                </Form.Field>
                                <Form.Field >
                                    <label>Sort by :</label>
                                    <Dropdown
                                        fluid
                                        selection
                                        multiple={false}
                                        search={true}
                                        options={options1}
                                        value={this.state.client_id}
                                        placeholder='Choose...'
                                        onChange={this.handleSortChange}

                                        disabled={false}
                                        loading={false}
                                    />
                                </Form.Field>
                               
                            </Form.Group>



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
                    <Segment attached='bottom'>

                        <div>





                            <div style={{ padding: "20px", }}>
                                <Grid>


                                    <Grid.Row columns={7}>
                                        {this.state.tagdata && this.state.tagdata.map((tagd, i) =>



                                            <Grid.Column>
                                                <Segment primary onClick={(e) => this.handleClick(tagd.tag, tagd.id, i)} ><Icon name="circle" color="red" size="tiny" /> {tagd.tag}</Segment>

                                                <br />



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

                                                <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                                    <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            Edit Subscription
</DialogContentText>
                                                        <form>
                                                            <TextField
                                                                autoFocus
                                                                margin="dense"
                                                                id="tag"
                                                                label="Tag"
                                                                name="tag"
                                                                value={this.state.tag}
                                                                fullWidth
                                                                onChange={(ev) => this.handleInputChangeValue(ev)}
                                                            />

                                                        </form>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={this.handleSubmit} color="green">
                                                            Edit
                                                </Button>
                                                        <Button onClick={(e) => this.handleClickDelete(tagd.id, i)} color="red">
                                                            Delete
                                                </Button>
                                                        <Button onClick={this.handleClose} color="secondary">
                                                            Cancel
                                                </Button>

                                                    </DialogActions>
                                                </Dialog>






                                            </Grid.Column>







                                        )}
                                    </Grid.Row>
                                </Grid>








                            </div>




                        </div>
                    </Segment>



                </div>




            </div>
        )
    }
}



Customize.propTypes = {
    //classes: PropTypes.object.isRequired,
    tagEdit: PropTypes.func.isRequired,
    tagDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    tag: state.tag,
    errors: state.errors
});

export default connect(mapStateToProps, { tagEdit, tagDelete })(Customize)

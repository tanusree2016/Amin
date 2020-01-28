import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Icon, Dropdown, Button, Popup, Checkbox, Segment } from 'semantic-ui-react'
import envirionment from '../../common/utils/envirionment'
import BoardDropdownInput from './BoardDropdownInput'
import { deleteProject } from './Projecttable/ProjectTableApi'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const tableData = [
    { name: 'John', age: 15, gender: 'Male' },
    { name: 'Amber', age: 40, gender: 'Female' },
    { name: 'Leslie', age: 25, gender: 'Other' },
    { name: 'Ben', age: 70, gender: 'Male' },
]

const options = [
    { key: 'copy', text: 'Copy', value: 'copy' },
    { key: 'delete', text: 'Dlete', value: 'delete' },

]

const listArray = []
const dateArray = []

class ProjectSorTable extends Component {
    constructor(props){
        super(props);
    this.state = {
        column: null,
        data: [],
        direction: null,
        project_title: [],
        client_id: [],
        projectList: [],
        startdate: [],
        id : ''
    }
    this.handleDelete = this.handleDelete.bind(this);
   this. handleClickDelete = this.handleClickDelete.bind(this);
}

    handleClose = () => {
        this.setState({
            open: false,
            open1: false,

        });
    };

    handleSort = (clickedColumn) => () => {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }


    handleData() {
        console.log("Calling --- ");
        fetch('http://localhost:5000/project/list', {

            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded ' }
        }).then(res => res.json())
            .then(res2 => {
                console.log("Size --- " + res2.list.length);
                //let allList = JSON.stringify(res2.list)
                // console.log("All List --- " + allList);
                this.setState({
                    data: res2.list
                });
                let i = 0;
                let x = "";



                // for (let i = 0; i < this.state.data.list.length; i++) {

                //     listArray.push(this.state.data.list[i].project_title);
                //     dateArray.push(this.state.data.list[i].start_date);
                //     //this.setState({ plans: res.subscription[i].planName })
                //     this.setState({ start_date: this.state.data.list[i].start_date })
                //     //this.setState({ price: res.subscription[i].price })
                // }
                // this.setState({
                //     projectList: x
                // })
                console.log('project list------' + JSON.stringify(this.state.data));
                //console.log('project_title------' + this.state.client_id);
                this.setState({
                    projectList: listArray,
                    startdate: dateArray
                })

                console.log("Project Names --- " + this.state.projectList);
                console.log("Project Names --- " + this.state.start_date);
            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }


    componentDidMount = () => {
        this.handleData();

    }

    handleClickDelete(pid, index) {
        this.setState({
            open1: true,
            id: pid,
            delIndex: index,
        });
    }

    handleDelete(e) {
        e.preventDefault();
        const deleteProject = {
            id: this.state.id
        }

        this.setState((prevState) => ({
            data: prevState.data.filter((_, i) => i !== this.state.delIndex)
        }));

        this.props.deleteProject(deleteProject, this.props.history);
        this.handleClose();
    }


    render() {
        const { column, direction, data,open, open1 } = this.state
       
        // const startDate = this.state.startdate.map(date=>{
        //     return date
        // })
        return (

            <div>

                <Table sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell

                            >

                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'title' ? direction : null}
                                onClick={this.handleSort('title')}
                            >
                                Title
            </Table.HeaderCell>
                            <Table.HeaderCell

                            >
                                Client
            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'client' ? direction : null}
                                onClick={this.handleSort('client')}
                            >
                                Date
            </Table.HeaderCell>
                            <Table.HeaderCell

                            >
                                Invoices
            </Table.HeaderCell>
                            <Table.HeaderCell

                            >
                                Contract
            </Table.HeaderCell>
                            <Table.HeaderCell

                            >
                                Workflow
            </Table.HeaderCell>
                            <Table.HeaderCell

                            >
                                Status
            </Table.HeaderCell>
                            <Table.HeaderCell

                            >
                                Action
            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data, ({ project_title, client_id, start_date,id,i }) => (
                            <Table.Row >
                                <Table.Cell><Checkbox /></Table.Cell>
                                <Table.Cell>{project_title}</Table.Cell>
                                <Table.Cell>{client_id}</Table.Cell>
                                <Table.Cell>{start_date}</Table.Cell>
                                <Table.Cell>{id}</Table.Cell>
                                <Table.Cell>  <Button style={{ border: "1px solid grey", borderRadius: "5px", padding: "3px", height: "30px", fontSize: "12px" }}>Needs Sending</Button></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell><BoardDropdownInput /></Table.Cell>
                                <Table.Cell style={{ textAlign: "center" }}>




                                    <Popup
                                        content={<div><Button.Group vertical >
                                            <Button content='Archive' />
                                            <Button content='Delete' onClick={(e) => this.handleClickDelete(id, i)}/>

                                        </Button.Group></div>}
                                        on='click'

                                        position='bottom center'
                                        trigger={<Icon name='angle down circuler' circular />}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}


                    </Table.Body>
                </Table>

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




            </div>
        )
    }
}


ProjectSorTable.propTypes = {

    deleteProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    project: state.project,
    errors: state.errors
});

export default connect(mapStateToProps, { deleteProject })(ProjectSorTable)
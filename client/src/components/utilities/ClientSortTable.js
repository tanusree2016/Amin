import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Icon, Button, Divider, Popup, Input } from 'semantic-ui-react'



import { connect } from 'react-redux';
import { deleteClient } from './client/ClientApi'
import { SketchPicker } from 'react-color';
import envirionment from '../../common/utils/envirionment'
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';


class ClientSortTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
          
            color: '',
            search: '',
            clientList: [],
            editIndex: -1
        }
        this.handleDelete = this.handleDelete.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSort = (clickedColumn) => () => {
        const { column, clientList, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                clientList: _.sortBy(clientList, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            clientList: clientList.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }




    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }



    handleShow = (show, source_name, sid, index) => {
        this.setState({
            show: show,
            source_name: source_name,
            id: sid,
            editIndex: index,
        })
    }

    handleSourceData() {
       


        console.log("Calling --- ");
        fetch(envirionment.BASE_URL + 'clients/client-list', {

            method: "POST",

        }).then(res => res.json())
            .then(res2 => {
                console.log("Size --- " + res2.clientlist.length);
                //let allList = JSON.stringify(res2.list)
                // console.log("All List --- " + allList);
                this.setState({
                    clientList: res2.clientlist
                });

                console.log("Project Names --- " + JSON.stringify(this.state.clientList));




            })
        console.log("Calling --- End ---  ");
        this.forceUpdate();

    }


    componentDidMount = () => {
        this.handleSourceData();

    }


    //   handleSubmit(e) {
    //     e.preventDefault();

    //     const editSource = {

    //       source_name: this.state.source_name,
    //       //color: this.state.color,

    //       id: this.state.id
    //     }

    //    // this.state.sourceList[this.state.editIndex].source_name = this.state.source_name


    //     this.props.editSource(editSource, this.props.history);


    //     //this.resetField();
    //     this.handleShow(false);
    //   }


    // // handleClick(name, sid, index) {
    // //   console.log("Value Details --- " + name + " " + sid + " " + " " + index)
    // //   this.setState({
    // //     open: true,
    // //     source_name: name,
    // //     id: sid,
    // //     editIndex: index,
    // //   });
    // // }

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

    onSearchChange = e =>{
        this.setState({
            search : e.target.value
        })
    }

    handleDelete(e) {
        e.preventDefault();
        const deleteClient = {
            id: this.state.id
        }

        this.setState((prevState) => ({
            clientList: prevState.clientList.filter((_, i) => i !== this.state.delIndex)
        }));

        this.props.deleteClient(deleteClient, this.props.history);
        this.handleClose();
    }

    render() {
        const { column, clientList, direction, open1, search } = this.state

        return (
            <div>
                <Input fluid placeholder="Search Name" icon="search" onChange={this.onSearchChange} iconPosition="left" />

                <Table sortable celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === 'first_name' ? direction : null}
                                onClick={this.handleSort('first_name')}
                            >
                                Name
            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'last_name' ? direction : null}
                                onClick={this.handleSort('last_name')}
                            >
                                Last Name
            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'company_name' ? direction : null}
                                onClick={this.handleSort('company_name')}
                            >
                                Company Name
            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'email' ? direction : null}
                                onClick={this.handleSort('email')}
                            >
                                Email
            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'phone_number' ? direction : null}
                                onClick={this.handleSort('phone_number')}
                            >
                                Phone Number
            </Table.HeaderCell>
                            <Table.HeaderCell


                            >
                                Action
            </Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(clientList, ({ first_name, last_name, company_name, email, phone_number, id, i }) => {

                            if (search !== "" && first_name.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                                return null
                            }


                          return  <>
                                <Table.Row key={first_name}>
                                    <Table.Cell> {first_name}</Table.Cell>
                                    <Table.Cell>{last_name}</Table.Cell>
                                    <Table.Cell> {company_name}</Table.Cell>
                                    <Table.Cell>{email}</Table.Cell>
                                    <Table.Cell> {phone_number}</Table.Cell>



                                    <Table.Cell><Button style={{ background: "white", textAlign: "center" }} onClick={(e) => this.handleClickDelete(id, i)}> <text ><Icon name='trash' />Delete</text></Button> </Table.Cell>





                                    {/* <div style={{ width: "80px", height: "15px" }} onClick={() => this.handleShow(true)}><text><Icon name='cog' />Edit</text></div> */}

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


                                    {/* <Modal
                  show={this.state.show}
                  onHide={() => this.handleShow(false)}
                  dialogClassName="modal-90w"
                  aria-labelledby="example-custom-modal-styling-title"
                  size="lg"

                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                      Edit Sourse
     </Modal.Title>
                  </Modal.Header>
                  <br />
                  <Modal.Body>


                    <Form onSubmit={this.handleSubmit} >
                      <Form.Group controlId="formBasicEmail">

                        <Form.Label><b>Source name*</b></Form.Label>
                        <Form.Control type="text" name="source_name" value={this.state.source_name} onChange={this.handleChange}/>

                      </Form.Group>

                      <Form.Group >

                        <Form.Label><b>Select color*</b></Form.Label>
                        <br />
                        <Icon name="stop" size="big" style={{ color: "red" }} />
                        <Icon name="stop" size="big" style={{ color: "yellow" }} />
                        <Icon name="stop" size="big" style={{ color: "pink" }} />
                        <Icon name="stop" size="big" style={{ color: "arange" }} />
                        <Icon name="stop" size="big" style={{ color: "blue" }} />
                        <Icon name="stop" size="big" style={{ color: "green" }} /><br />
                        <Icon name="stop" size="big" style={{ color: "grey" }} />
                        <Icon name="stop" size="big" style={{ color: "teal" }} />
                        <Icon name="stop" size="big" style={{ color: "yellow" }} />
                        <Icon name="stop" size="big" style={{ color: "pink" }} />
                        <Icon name="check square" size="big" style={{ color: "red" }} />




                        <Popup
                          trigger={
                            <Icon name="plus square outline" size="big" content='Activate doomsday device' />
                          }

                          content={<div>
                            <b>Custom color picker</b> <br />
                            <SketchPicker /><br />
                            <Button type="submit">Add</Button><br />
                            <Divider></Divider>
                            <text><b>Applied color</b></text><br /><br />
                            <Icon name="check square" size="big" style={{ color: "red" }} />
                            <Divider></Divider>
                            <b style={{ textAlign: "center" }}>Use this color</b>
                          </div>}
                          on='click'
                          position='right center'
                          size='mini'
                        />


                      </Form.Group >




                      <Divider></Divider>


                      <Button secondary onClick={() => this.handleShow(false)} style={{ float: "right" }}>
                        Cancel
            </Button>&nbsp;
            <Button primary type="submit" style={{ float: "right", marginRight: "30px", }}>
                        Save
            </Button>

                    </Form>
                  </Modal.Body>
                </Modal> */}


                                </Table.Row>

                            </>

                        })}


                    </Table.Body>
                </Table>

            </div>
        )
    }
}



ClientSortTable.propTypes = {

    //editSource: PropTypes.func.isRequired,
    deleteClient: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    clients: state.clients,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { deleteClient })(ClientSortTable);

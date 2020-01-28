import _ from 'lodash'
import React, { Component } from 'react'
import { Modal, Form, Table, Icon, Button, Divider, Popup, Input } from 'semantic-ui-react'
import AddBoardModal from './AddSourceModal'
import EditSourceModal from './EditSourceModal'
import swal from 'sweetalert';

import { connect } from 'react-redux';
import { editSource, deleteSource } from '../addsource/AddSourceApi'
import { SketchPicker } from 'react-color';
import envirionment from '../../../common/utils/envirionment'
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';


class SourceSortTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      source_name: '',
      color: '',
      search: '',
      sourceList: [],
      editIndex: -1,
      open: false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  // show = (size) => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  handleSort = (clickedColumn) => () => {
    const { column, sourceList, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        sourceList: _.sortBy(sourceList, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      sourceList: sourceList.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }


  //  handleDelete = ()=>{
  //   swal({
  //     title: "Hold up, wait a minute.",
  //     text: "Are you sure you want to delete this source on all its respective jobs? This cannot be undone.",
  //     textAlign: "center",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //   .then((willDelete) => {
  //     if (willDelete) {
  //       swal("Item has been deleted!", {
  //         icon: "success",
  //       });
  //     }
  //   });
  //  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }



  show = (size, source_name, sid, index) =>()=> {
    this.setState({
      size: size,
      source_name: source_name,
      id: sid,
      editIndex: index,
      open:true
    })
  }

  handleSourceData() {
    console.log("Calling --- ");
    fetch(envirionment.BASE_URL + 'project-source/sourcelist', {

      method: "POST",

    }).then(res => res.json())
      .then(res2 => {
        console.log("Size --- " + res2.list.length);
        //let allList = JSON.stringify(res2.list)
        // console.log("All List --- " + allList);
        this.setState({
          sourceList: res2.list
        });

        console.log("Project Names --- " + JSON.stringify(this.state.sourceList));




      })
    console.log("Calling --- End ---  ");
    this.forceUpdate();

  }


  componentDidMount = () => {
    this.handleSourceData();

  }


  handleSubmit(e) {
    e.preventDefault();

    const editSource = {

      source_name: this.state.source_name,
      //color: this.state.color,

      id: this.state.id
    }

    // this.state.sourceList[this.state.editIndex].source_name = this.state.source_name


    this.props.editSource(editSource, this.props.history);


    //this.resetField();
    this.close();
  }


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


  handleDelete(e) {
    e.preventDefault();
    const deleteSource = {
      id: this.state.id
    }

    this.setState((prevState) => ({
      sourceList: prevState.sourceList.filter((_, i) => i !== this.state.delIndex)
    }));

    this.props.deleteSource(deleteSource, this.props.history);
    this.close();
  }

  onSearchChange = e => {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    const { column, sourceList, direction, open1, search, open, size } = this.state;


    // const filteredSourceList = sourceList.filter(source =>{
    //   return  source.source_name.toLowerCase().indexOf(search.toLowerCase()) === -1
    // })



    return (
      <div>
        {/* <Input
          fluid
          icon='search'
          iconPosition='left'
          placeholder='Search...'
          onChange={this.onSearchChange}
        /> */}
        <Input fluid placeholder="Search Name" iconPosition='left' icon="search" onChange={this.onSearchChange} />

        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={this.handleSort('name')}
              >
                Source Name
            </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={this.handleSort('name')}
              >
                Projects
            </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'age' ? direction : null}

              >
                Actions
            </Table.HeaderCell>

            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(sourceList, ({ source_name, id, i }) => {

              if (search !== "" && source_name.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                return null
              }

              return <>

                <Table.Row key={source_name}>
                  <Table.Cell> <text > <Icon name='circle' size="tiny" style={{ color: "red" }} /> &nbsp;{source_name}</text></Table.Cell>
                  <Table.Cell></Table.Cell>

                  <Table.Cell><Button style={{ background: "white", textAlign: "center" }} onClick={this.show("small", source_name, id, i)}  > <text ><Icon name='cog' />Edit</text></Button><Button style={{ background: "white", textAlign: "center" }} onClick={(e) => this.handleClickDelete(id, i)}> <text ><Icon name='trash' />Delete</text></Button> </Table.Cell>





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

                  <Modal size={size} open={open} onClose={this.close}>
                    <Modal.Header>  Edit Sourse</Modal.Header>
                    <Modal.Content>




                      <Form onSubmit={this.handleSubmit} >

                        <Form.Field>
                          <label>Source name*</label>
                          <Input type="text" name="source_name" value={this.state.source_name} onChange={this.handleChange}
                          />
                        </Form.Field>


                        <Form.Field>
                          <label>Source name*</label>
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


                        </Form.Field>




                        <Divider></Divider>



                        <Button primary type="submit" style={{ float: "right", marginRight: "30px", }}>
                          Save
            </Button>

                      </Form>
                      <Button secondary onClick={this.close} style={{ float: "right" }}>
                        Cancel
            </Button>&nbsp;
            </Modal.Content>
                  </Modal>


                </Table.Row>

              </>
            })}


          </Table.Body>
        </Table>

      </div>
    )
  }
}



SourceSortTable.propTypes = {

  editSource: PropTypes.func.isRequired,
  deleteSource: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  source: state.source,
  errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { editSource, deleteSource })(SourceSortTable);

import _ from 'lodash'
import React, { Component } from 'react'
import { Modal, Form,Table, Icon, Button ,Divider,Dropdown} from 'semantic-ui-react'

import swal from 'sweetalert';
import EditIncomModal from './EditIncomeModal'
import envirionment from '../../../common/utils/envirionment'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {editIncome,deleteIncome } from './ChartOfAccountApi'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const options = [
  { key: 'm', text: 'Sales', value: 'Sales' },
  { key: 'f', text: 'Service', value: 'Service' },
  { key: 'o', text: 'OthNon-Operatinger', value: 'OthNon-Operatinger' },
]




class IncomeSortTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [],
      direction: null,
      incomeList: [],
      income_name:'',
      income_type:'',
      id: '',
      editIndex: -1,
      open: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  close = () => this.setState({ open: false })

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  show = (size, income_name, income_type, aid, index) =>()=> {
    this.setState({
      size: size,

      income_name: income_name,
      income_type: income_type,
    
      id: aid,
      editIndex: index,
      open: true
    })
  }



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
    fetch(envirionment.BASE_URL + "chartofacc/list-income", {

      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded ' }
    }).then(res => res.json())
      .then(res2 => {
        console.log("Size --- " + res2.incomelist.length);

        this.setState({
          data: res2.incomelist
        });



        console.log('project list------' + JSON.stringify(this.state.data));


      })
    console.log("Calling --- End ---  ");
    this.forceUpdate();

  }


  componentDidMount = () => {
    this.handleData();

  }

  handleSubmit(e) {
    e.preventDefault();
    
    let editIncome = {

        income_name: this.state.income_name,
    
        income_type: this.state.income_type,

        id : this.state.id
    }

    //this.state.data[this.state.editIndex].income_name = this.state.income_name


    this.props.editIncome(editIncome, this.props.history);


    //this.resetField();
    this.close();
}



  handleClick(name, incid, index) {
    
    this.setState({
      open: true,
      income_name: name,
      id: incid,
      editIndex: index,
    });
  }

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
   
    const deleteIncome = {
      id: this.state.id
    }

    this.setState((prevState) => ({
      data: prevState.data.filter((_, i) => i !== this.state.delIndex)
    }));

    this.props.deleteIncome(deleteIncome, this.props.history);
    this.close();
  }

  handleIncomeChange = (e, { value }) => this.setState((prevState, props) => {
    let newState = { ...prevState }
    newState.income_type = value;
    return { ...newState };
});

  render() {
    const { column, data, direction,open1,open,size } = this.state
   


    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>

            <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={this.handleSort('name')}
            >
              Category
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'age' ? direction : null}
              onClick={this.handleSort('age')}
            >
              Type
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'gender' ? direction : null}
              onClick={this.handleSort('gender')}
            >
              Total
            </Table.HeaderCell>

            <Table.HeaderCell


            >
              Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          
             {/* {this.state.data && this.state.data.map((income, i) => */}
              {_.map(data, ({ income_name,income_type, id, i }) => (

<>

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

              
              <Table.Row key={income_name}>
                <Table.Cell> {income_name}</Table.Cell>
                <Table.Cell>{income_type}</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell ><Button style={{ background: "white" }} onClick={this.show("small",income_name,income_type,id,i)}><Icon name="cog" /></Button><Icon name='trash' onClick={(e)=>this.handleClickDelete(id,i)} /> View Transactions</Table.Cell>

              </Table.Row>


              <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>   Add Income Category </Modal.Header>
                        <Modal.Content>

           


                            <Form onSubmit={this.handleSubmit} >
                              

                                <Form.Field>
                                    <label>Name</label>
                                    <input name="income_name" value={this.state.income_name} onChange={this.handleChange} />
                                </Form.Field>

                                <Form.Field >
                                    <label>Status*</label>
                                    <Dropdown
                                        fluid
                                        selection
                                        multiple={false}
                                        search={true}
                                        options={options}
                                        value={this.state.income_type}
                                        placeholder='Select your income type'
                                        onChange={this.handleIncomeChange}

                                        disabled={false}
                                        loading={false}
                                    />
                                </Form.Field>

                          


                         <br /><br />


                                <Divider></Divider>


                              
                            <Button primary  type="submit" style={{ float: "right", marginRight: "30px", }}>
                                    Edit
                            </Button>

                            </Form>
                            <Button secondary onClick={this.close} style={{ float: "right" }}>
                                    Cancel
                            </Button>&nbsp;
                            </Modal.Content>
                    </Modal>
              </>
          

   ))}


        </Table.Body>
      </Table>
    )
  }
}


IncomeSortTable.propTypes = {
  
  editIncome: PropTypes.func.isRequired,
  deleteIncome: PropTypes.func.isRequired,
  
};

const mapStateToProps = state => ({
  incexp: state.incexp,
  errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps,{editIncome,deleteIncome})(IncomeSortTable);
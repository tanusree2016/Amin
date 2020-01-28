import _ from 'lodash'
import React, { Component } from 'react'
import {Modal, Form, Table, Icon, Button ,Divider,Dropdown} from 'semantic-ui-react'

import swal from 'sweetalert';
import EditIncomModal from './EditIncomeModal'
import envirionment from '../../../common/utils/envirionment'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {editExpense,deleteExpense } from './ChartOfAccountApi'

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


class ExpenseSortTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [],
      direction: null,
      expenseList: [],
      expense_name:'',
      expense_type:'',
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
  show = (size, expensename, expensetype, aid, index) =>()=> {
    this.setState({
      size: size,

      expense_name: expensename,
      expense_type: expensetype,
    
      id: aid,
      editIndex: index,
      open:true
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
    fetch(envirionment.BASE_URL + "chartofacc/list-expense", {

      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded ' }
    }).then(res => res.json())
      .then(res2 => {
        console.log("Size --- " + res2.expenselist.length);

        this.setState({
          data: res2.expenselist
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

    let editExpense = {

        expense_name: this.state.expense_name,
    
        expense_type: this.state.expense_type,

        id : this.state.id
    }

    this.state.data[this.state.editIndex].expense_name = this.state.expense_name


    this.props.editExpense(editExpense, this.props.history);


    //this.resetField();
    this.close();
}



  // handleClick(name, incid, index) {
    
  //   this.setState({
  //     open: true,
  //     income_name: name,
  //     id: incid,
  //     editIndex: index,
  //   });
  // }

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
    const deleteExpense = {
      id: this.state.id
    }

    this.setState((prevState) => ({
      data: prevState.data.filter((_, i) => i !== this.state.delIndex)
    }));

    this.props.deleteExpense(deleteExpense, this.props.history);
    this.close();
  }

  handleExpenseChange = (e, { value }) => this.setState((prevState, props) => {
    let newState = { ...prevState }
    newState.expense_type = value;
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
          
             {this.state.data && this.state.data.map((expense, i) =>
             

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

              
              <Table.Row key={expense.expense_name}>
                <Table.Cell> {expense.expense_name}</Table.Cell>
                <Table.Cell>{expense.expense_type}</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell ><Button style={{ background: "white" }}><Icon name="cog" onClick={this.show("small",expense.expense_name,expense.expense_type,expense.id,i)}/></Button><Icon name='trash' onClick={(e)=>this.handleClickDelete(expense.id,i)} /> View Transactions</Table.Cell>

              </Table.Row>

              <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>   Edit Expense Category</Modal.Header>
                        <Modal.Content>
           

            
            


                            <Form onSubmit={this.handleSubmit} >

                            <Form.Field>
                                    <label>Name</label>
                                    <input name="income_name" value={this.state.expense_name} onChange={this.handleChange} />
                                </Form.Field>

                               


                         

                                <Form.Field >
                                    <label>Type</label>
                                    <Dropdown
                                        fluid
                                        selection
                                        multiple={false}
                                        search={true}
                                        options={options}
                                        value={this.state.expense_type}
                                        placeholder='Select your Expense type'
                                        onChange={this.handleExpenseChange}

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
          

   )}


        </Table.Body>
      </Table>
    )
  }
}


ExpenseSortTable.propTypes = {
  
  editExpense: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  
};

const mapStateToProps = state => ({
  incexp: state.incexp,
  errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps,{editExpense,deleteExpense})(ExpenseSortTable);
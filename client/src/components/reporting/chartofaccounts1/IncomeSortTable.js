import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Icon ,Button} from 'semantic-ui-react'
import swal from 'sweetalert';
import EditIncomModal from './EditIncomeModal'
const tableData = [
  { name: 'John', age: 15, gender: 'Male' },
  { name: 'Amber', age: 40, gender: 'Female' },
  { name: 'Leslie', age: 25, gender: 'Other' },
  { name: 'Ben', age: 70, gender: 'Male' },
]

export default class IncomeSortTable extends Component {
  state = {
    column: null,
    data: tableData,
    direction: null,
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

  handleDelete = ()=>{
    swal({
      title: "Woah, woah, woah",
      text: "Are you sure you'd like to remove this invoice?",
      textAlign: "center",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Invoice has been deleted!", {
          icon: "success",
        });
      }
    });
   }

  render() {
    const { column, data, direction } = this.state

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
          {_.map(data, ({ age, gender, name }) => (
            <Table.Row key={name}>
               <Table.Cell> {name}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{age}</Table.Cell>
              <Table.Cell ><Button style={{background:"white"}}><EditIncomModal/></Button><Icon name='trash'  onClick={this.handleDelete} /> View Transactions</Table.Cell>
        
            </Table.Row>
          ))}

       
        </Table.Body>
      </Table>
    )
  }
}

import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Icon } from 'semantic-ui-react'
import swal from 'sweetalert';
import envirionment from '../../../common/utils/envirionment'

export default class TableExampleSortable extends Component {
  state = {
    column: null,
    
    direction: null,
    transactionList:[]
  }

  handleSort = (clickedColumn) => () => {
    const { column, transactionList, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        transactionList: _.sortBy(transactionList, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      transactionList: transactionList.reverse(),
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


   handleData() {
    console.log("Calling --- ");
    fetch(envirionment.BASE_URL + "transaction/list-transaction", {

        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded ' }
    }).then(res => res.json())
        .then(res2 => {
            console.log("Size --- " + res2.Transactionlist.length);

            console.log('project list------' + JSON.stringify(this.state.data));

            this.setState({
                transactionList: res2.Transactionlist,

            })


        })
    console.log("Calling --- End ---  ");
    this.forceUpdate();

}


componentDidMount = () => {
    this.handleData();

}


  render() {
    const { column, transactionList, direction } = this.state

    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'date' ? direction : null}
              onClick={this.handleSort('date')}
            >
            Date
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'project' ? direction : null}
              onClick={this.handleSort('project')}
            >
              Project
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'client' ? direction : null}
              onClick={this.handleSort('client')}
            >
              Client
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'incomecategory' ? direction : null}
              onClick={this.handleSort('incomecategory')}
            >
              Categories
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'method' ? direction : null}
              onClick={this.handleSort('method')}
            >
              Method
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'description' ? direction : null}
              onClick={this.handleSort('description')}
            >
              Discription
            </Table.HeaderCell>
            <Table.HeaderCell
           sorted={column === 'gender' ? direction : null}
           onClick={this.handleSort('gender')}
             
            >
              Spent
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'gender' ? direction : null}
              onClick={this.handleSort('gender')}
            >
              Recieved
            </Table.HeaderCell>
            <Table.HeaderCell
         
          
            >
              Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(transactionList, ({ date, project, client,incomecategory,method,description, }) => (
            <Table.Row key={date}>
  <Table.Cell>{date}</Table.Cell>
          <Table.Cell>{project}</Table.Cell>
          <Table.Cell>{client}</Table.Cell>
          <Table.Cell>{incomecategory}</Table.Cell>
          <Table.Cell>{method}</Table.Cell>
              <Table.Cell>{description} </Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
        
            </Table.Row>
          ))}

       
        </Table.Body>
      </Table>
    )
  }
}

import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Icon,Input } from 'semantic-ui-react'

const tableData = [
  { name: 'John', age: 15, gender: 'Male' },
  { name: 'Amber', age: 40, gender: 'Female' },
  { name: 'Leslie', age: 25, gender: 'Other' },
  { name: 'Ben', age: 70, gender: 'Male' },
]

export default class TableExampleSortable extends Component {
  state = {
    column: null,
    data: tableData,
    direction: null,
    search:''
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

  onSearchChange = e =>{
    this.setState({
        search : e.target.value
    })
}

  render() {
    const { column, data, direction,search } = this.state

    return (
      <div>
      <Input  fluid placeholder="Search Name" iconPosition='left' icon="search" onChange={this.onSearchChange} />

      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={this.handleSort('name')}
            >
              Summary
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={this.handleSort('name')}
            >
              Project
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'age' ? direction : null}
              onClick={this.handleSort('age')}
            >
              Assignee
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'gender' ? direction : null}
              onClick={this.handleSort('gender')}
            >
              Due
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ age, gender, name }) => {
             if (search !== "" && gender.toLowerCase().indexOf(search.toLowerCase()) === -1) {
              return null
          }

           return <Table.Row key={name}>
              <Table.Cell> <Icon name='check circle outline' /> &nbsp;{name}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{age}</Table.Cell>
              <Table.Cell>{gender} &nbsp;<Icon name='remove' style={{ float: "right" }} />&nbsp;<Icon name=' clone outline' style={{ float: "right" }} /> </Table.Cell>
            </Table.Row>
  })}

    
        </Table.Body>
      </Table>
      </div>
    )
  }
}

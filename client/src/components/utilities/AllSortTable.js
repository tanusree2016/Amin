import React from 'react'
import { Table,Icon } from 'semantic-ui-react'

const TableExampleVerticalAlign = () => (
  <Table striped celled selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Item</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell>Project</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Tax</Table.HeaderCell>
        <Table.HeaderCell>User</Table.HeaderCell>
        <Table.HeaderCell>Rate/hr</Table.HeaderCell>
        <Table.HeaderCell>Time</Table.HeaderCell>
        <Table.HeaderCell>Total</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row verticalAlign='top'>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell verticalAlign='top'>
          Notes
          <br />
          1<br />
          2<br />
        </Table.Cell>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell verticalAlign='top'>
          Notes
          <br />
          1<br />
          2<br />
        </Table.Cell>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell verticalAlign='top'>
        <Icon name="caret square right" style={{float:"right"}}/>
          <br />
          <Icon name="edit" style={{float:"right"}}/><br />
          <Icon name="trash" style={{float:"right"}}/><br />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell verticalAlign='top'>
          Notes
          <br />
          1<br />
          2<br />
        </Table.Cell>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell verticalAlign='top'>
          Notes
          <br />
          1<br />
          2<br />
        </Table.Cell>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell verticalAlign='top'>
          <Icon name="caret square right" style={{float:"right"}}/>
          <br />
          <Icon name="edit" style={{float:"right"}}/><br />
          <Icon name="trash" style={{float:"right"}}/><br />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell verticalAlign='top'>
          Notes
          <br />
          1<br />
      
        </Table.Cell>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell verticalAlign='top'>
          Notes
          <br />
          1<br />
       
        </Table.Cell>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell verticalAlign='top'>
        <Icon name="copy"  style={{float:"right"}}/><br />
        <Icon name="trash" style={{float:"right"}}/><br />
      
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default TableExampleVerticalAlign

import React from 'react'
import { Tab, Dropdown, Menu, Input, Grid, Image, Button, Segment, Checkbox,Icon} from 'semantic-ui-react'
import EditPaymentSchedule from './paymentschedule/EditPaymentSchedule'
import InvoiceSortTable from './InvoiceSortTable'
import RecurringSortTable from './RecurringSortTable'
import ExpensesModal from './ExpensesModal'


const options1 = [
  { key: 'copy', text: 'Copy', value: 'copy' },
  { key: 'delete', text: 'Dlete', value: 'delete' },

]

const options = [
  { key: 1, text: 'Choice 1', value: 1 },
  { key: 2, text: 'Choice 2', value: 2 },
  { key: 3, text: 'Choice 3', value: 3 },
]
const panes = [
  {
    menuItem: 'Invoice List',
    render: () => <Tab.Pane attached={false} >

      <Button style={{ float: "right" }}>Add</Button><br /><br />

      <InvoiceSortTable />
      <div style={{ float: "right" }}>
        <Menu compact>
          <Dropdown text='Time Tracker' options={options} simple item />
        </Menu>  <Menu compact>
          <Dropdown text='Packages' options={options} simple item />
        </Menu>
        <Menu compact>
          <Dropdown text='Send' options={options} simple item />
        </Menu><br />
        <Menu compact>
          <Dropdown text='Apply' options={options} simple item />
        </Menu>
      </div>
      <div>
        <text><b>Invoice</b></text><br /><br />
        <text><b>Number</b> :13</text><br />
        <text><b>Title:</b>(Invoice title for portal)</text>
      </div><br />
      <b>Date :</b> <Input type="date" />

      <br />
      <div style={{ padding: "20px" }}>
        <Grid columns='equal'>
          <Grid.Row >
            <Grid.Column>
              Item
      </Grid.Column>
            <Grid.Column width={3}>
              Description
      </Grid.Column>
            <Grid.Column width={3}>
              Category
      </Grid.Column>
            <Grid.Column>
              Quantity
      </Grid.Column>
            <Grid.Column>
              Price
      </Grid.Column>
            <Grid.Column>
              Discount
      </Grid.Column>
            <Grid.Column>
              Tax
      </Grid.Column>
            <Grid.Column width={3}>
              Subtotal
      </Grid.Column>
          </Grid.Row>

        </Grid>
        <hr />
        <Grid columns='equal'>
          <Grid.Row >
            <Grid.Column>
              Add-on 2
      </Grid.Column>
            <Grid.Column width={3}>
              <ul>
                <li>This is my item</li>
                <li>This is too</li>
                <li>And this!</li>
              </ul>
            </Grid.Column >
            <Grid.Column width={3}>
              Unrecognized
      </Grid.Column>
            <Grid.Column>
              1
      </Grid.Column>
            <Grid.Column>
              $15.00
      </Grid.Column>
            <Grid.Column>

            </Grid.Column>
            <Grid.Column>

            </Grid.Column>
            <Grid.Column width={3}>
              $15.00



                <Dropdown

                icon="angle down"
                options={options1}
                trigger={<text></text>}
                style={{ float: "right", background: "white", }}

              />

            </Grid.Column>
          </Grid.Row>

        </Grid>
        <hr />
        <Button>New Line Item</Button>  <Button>Notes</Button>

        <Button.Group >
          <Button>Select Discount</Button>
          <Dropdown
            className='button icon'
            floating
            options={options}
            trigger={<React.Fragment />}
          />
        </Button.Group>
        <div>
          <Segment.Group>
            <Segment>
              <label>INVOICE ITEM NAME</label><br />
              <input placeholder='Item Name' style={{ background: "transparent", border: "0px solid", outline: "none" }} />

            </Segment>
            <Segment>
              <Checkbox toggle style={{ float: "right" }} /><label>DESCRIPTION</label><br />
              <textarea fluid placeholder='Description of the item' style={{ background: "transparent", border: "0px solid", outline: "none", width: "100%" }} />

            </Segment>
            <Segment.Group horizontal>
              <Segment>
                <label>QUANTITY</label><br />
                <input placeholder='Item Name' value="-2" style={{ background: "transparent", border: "0px solid", outline: "none" }} />

              </Segment>
              <Segment>
                <label>PRICE</label><br />
                <input placeholder='Price' value="$0.00" style={{ background: "transparent", border: "0px solid", outline: "none" }} />

              </Segment>
              <Segment>
                <label>ITEM SUBTOTAL</label><br />
                <text>$0.00</text>

              </Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment>
                <label>TAX</label><br />
                <input placeholder='Select tax if applicable' style={{ background: "transparent", border: "0px solid", outline: "none" }} />
                <Button style={{ float: "right" }}>New Tax Item</Button>
              </Segment>
              <Segment>
                <label>APPLY DISCOUNT</label>

              </Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment>
                <label>CATEGORY</label><br />
                <input placeholder='Select a category' style={{ background: "transparent", border: "0px solid", outline: "none" }} />
                <Button style={{ float: "right" }}>New Category</Button>

              </Segment>
            </Segment.Group>
          </Segment.Group>

          <div>
            <div style={{ textAlign: "right" }}>
              <Button>Add Item</Button> <Button>Cancel</Button>
            </div>
            <hr />
            <EditPaymentSchedule />
            <br />
            <div style={{ textAlign: "right" }}>
              <text><b>Subtotal:</b>$0.00</text><br />
              <text><b>Tax:</b>$0.00</text><br />
              <text><b>Total:</b>$0.00</text><br />

            </div>
          </div>
        </div>
      </div>

    </Tab.Pane>,
  },
  {
    menuItem: 'Recurring Invoices',
    render: () => <Tab.Pane attached={false} >

      <Button style={{ float: "right" }}>Add</Button><br /><br />

      <RecurringSortTable />

      <div>
        <Button style={{ float: "right" }}>Start Recurrence</Button>
        <h3>Recurrence Settings</h3><br/>
        
      

            <Input type="number" value="1" style={{ width: "20%" }} />&nbsp;&nbsp;&nbsp;
           
            <Menu compact>
          <Dropdown text='Time Tracker' options={options} simple item />
        </Menu> 
  &nbsp;&nbsp;&nbsp;

            <Input  type="date" />&nbsp;&nbsp;&nbsp;
            <Input  type="date" />
     
      </div><br /><br />
      <div style={{ float: "right" }}>
        <Menu compact>
          <Dropdown text='Time Tracker' options={options} simple item />
        </Menu>  <Menu compact>
          <Dropdown text='Packages' options={options} simple item />
        </Menu>
        <Menu compact>
          <Dropdown text='Send' options={options} simple item />
        </Menu><br />
        <Menu compact>
          <Dropdown text='Apply' options={options} simple item />
        </Menu>
      </div>
      <div>
        <text><b>Invoice</b></text><br /><br />
        <text><b>Number</b> :13</text><br />
        <text><b>Title:</b>(Invoice title for portal)</text>
      </div><br />
      <b>Date :</b> <Input type="date" />

      <br />
      <div style={{ padding: "20px" }}>
        <Grid columns='equal'>
          <Grid.Row >
            <Grid.Column>
              Item
      </Grid.Column>
            <Grid.Column width={3}>
              Description
      </Grid.Column>
            <Grid.Column width={3}>
              Category
      </Grid.Column>
            <Grid.Column>
              Quantity
      </Grid.Column>
            <Grid.Column>
              Price
      </Grid.Column>
            <Grid.Column>
              Discount
      </Grid.Column>
            <Grid.Column>
              Tax
      </Grid.Column>
            <Grid.Column width={3}>
              Subtotal
      </Grid.Column>
          </Grid.Row>

        </Grid>
        <hr />
        <Grid columns='equal'>
          <Grid.Row >
            <Grid.Column>
              Add-on 2
      </Grid.Column>
            <Grid.Column width={3}>
              <ul>
                <li>This is my item</li>
                <li>This is too</li>
                <li>And this!</li>
              </ul>
            </Grid.Column >
            <Grid.Column width={3}>
              Unrecognized
      </Grid.Column>
            <Grid.Column>
              1
      </Grid.Column>
            <Grid.Column>
              $15.00
      </Grid.Column>
            <Grid.Column>

            </Grid.Column>
            <Grid.Column>

            </Grid.Column>
            <Grid.Column width={3}>
              $15.00



                <Dropdown

                icon="angle down"
                options={options1}
                trigger={<text></text>}
                style={{ float: "right", background: "white", }}

              />

            </Grid.Column>
          </Grid.Row>

        </Grid>
        <hr />
        <Button>New Line Item</Button>  <Button>Notes</Button>

        <Button.Group >
          <Button>Select Discount</Button>
          <Dropdown
            className='button icon'
            floating
            options={options}
            trigger={<React.Fragment />}
          />
        </Button.Group>
        <div>
          <Segment.Group>
            <Segment>
              <label>INVOICE ITEM NAME</label><br />
              <input placeholder='Item Name' style={{ background: "transparent", border: "0px solid", outline: "none" }} />

            </Segment>
            <Segment>
              <Checkbox toggle style={{ float: "right" }} /><label>DESCRIPTION</label><br />
              <textarea fluid placeholder='Description of the item' style={{ background: "transparent", border: "0px solid", outline: "none", width: "100%" }} />

            </Segment>
            <Segment.Group horizontal>
              <Segment>
                <label>QUANTITY</label><br />
                <input placeholder='Item Name' value="-2" style={{ background: "transparent", border: "0px solid", outline: "none" }} />

              </Segment>
              <Segment>
                <label>PRICE</label><br />
                <input placeholder='Price' value="$0.00" style={{ background: "transparent", border: "0px solid", outline: "none" }} />

              </Segment>
              <Segment>
                <label>ITEM SUBTOTAL</label><br />
                <text>$0.00</text>

              </Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment>
                <label>TAX</label><br />
                <input placeholder='Select tax if applicable' style={{ background: "transparent", border: "0px solid", outline: "none" }} />
                <Button style={{ float: "right" }}>New Tax Item</Button>
              </Segment>
              <Segment>
                <label>APPLY DISCOUNT</label>

              </Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment>
                <label>CATEGORY</label><br />
                <input placeholder='Select a category' style={{ background: "transparent", border: "0px solid", outline: "none" }} />
                <Button style={{ float: "right" }}>New Category</Button>

              </Segment>
            </Segment.Group>
          </Segment.Group>

          <div>
            <div style={{ textAlign: "right" }}>
              <Button>Add Item</Button> <Button>Cancel</Button>
            </div>
            <hr />
            <EditPaymentSchedule />
            <br />
            <div style={{ textAlign: "right" }}>
              <text><b>Subtotal:</b>$0.00</text><br />
              <text><b>Tax:</b>$0.00</text><br />
              <text><b>Total:</b>$0.00</text><br />

            </div>
          </div>
        </div>
      </div>

    </Tab.Pane>,
  },
  {
    menuItem: 'Invoice Options',
    render: () => <Tab.Pane attached={false} >
        <div style={{float:"right"}}>
      <h3 > Invoice Options</h3>
      <Button >Override</Button><br/> <br/>
      <Checkbox label='Bill to Company Name' />
      
      </div>
      <div>
      <h3 >Payment Options</h3>
    <Button>Override</Button> <br/> <br/>
    <Checkbox label='Credit Cards' />&nbsp;&nbsp;
      <Checkbox label='Bank Payments' />&nbsp;&nbsp;
      <Checkbox label='Gratuity' />
      </div><br/>
    
   <Button>Save</Button>
   

      </Tab.Pane>,
  },
  {
    menuItem: 'Expenses',
    render: () => <Tab.Pane attached={false} >
      <div>
       <text style={{float:"right"}}><ExpensesModal/></text> 
       <h3>EXPENSES</h3>
       <text>11/18/19 - tyuytuytu ($0.00)</text><Icon name="cog"/>&nbsp;<Icon name="trash"/><br/>
       <text><b>Net profit:</b>$0.00</text>
      </div>
    

      </Tab.Pane>,
  },
]

const InvoiceTabs = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
)

export default InvoiceTabs








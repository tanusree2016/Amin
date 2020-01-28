import React, { Component } from 'react';
import { Segment, Grid, Button,Dropdown,Icon } from 'semantic-ui-react';
import ClientSortTable from './ClientSortTable'
import AddClientModal from './AddClientModal'
import AddBoardModal from './AddBoardModal'

const options = [
    { key: 'edit', text: 'Edit Post', value: 'edit' },

  ]

export default class Calendars extends Component {
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "60px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
                <Button style={{ float: "right",}}> <AddClientModal /></Button>
                <Button disabled style={{ float: "right",}}> Import</Button>
                    {/* <text style={{ float: "right" }}><BoardDropdownInput /></text> */}
                    
                  

                    <Dropdown text='Export' floating labeled button className='icon' style={{ float: "right" }} >
    <Dropdown.Menu className='right'>
      <Dropdown.Item>
       
        <span className='text'>Email Addresses</span>
        </Dropdown.Item>  
        </Dropdown.Menu>    
        </Dropdown>     
                    <text style={{ color: "white" }}><h3>Address Book</h3></text>
                </div>
                <div style={{ padding: "20px", background: "white" }}>
                    <div >
                     <ClientSortTable/>
                    </div>




                </div>

            </div>



        )
    }
}
import React, { Component } from 'react';
import { Segment, Grid, Button,Dropdown } from 'semantic-ui-react';
import DatePickers from './DatePickers'

const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
  ]
  
export default class Financials extends Component {
    render() {
        return (

            <div >
                <div style={{ height: "60px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "15px 15px 0 0" }}>
                <Button style={{ float: "right", border: "1px solid grey", borderRadius: "5px", padding: "0px", height: "30px" }}><DatePickers/> to <DatePickers/></Button>

                
                <text style={{ color: "white" }}><h3>Financials</h3></text>
                  
                     

                   
                </div>
                <div style={{padding:"15px", background:"white",borderRadius:"0 0 15px 15px"}}>
                    <div style={{height:"200px"}}>
                      <h4 >Income</h4>
                    </div>
                    <div style={{height:"200px"}}>
                      <h4>Expenses</h4>
                      </div>
                      <div style={{height:"200px"}}>
                      <h4>Profit</h4>
                      </div>




                </div>

            </div>



        )
    }
}
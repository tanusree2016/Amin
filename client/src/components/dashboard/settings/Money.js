import React,{Component} from 'react'
import {Checkbox,Button} from 'semantic-ui-react'
export default class Money extends Component{
    render(){
        return(
            <div>
              <text style={{fontSize:"18px"}}>Tax Column</text><br/>
                <text >When this feature is turned on, it will show the tax column on each line item of the invoice as well as at the end of the invoice. When turned off, it will remove the tax column from displaying on each line item and only show a total tax at the bottom of the invoice.</text>
            <br/>   <br/>
            <text> <Checkbox toggle label="Off" /></text>  <br/>
            <text style={{fontSize:"18px"}}>Company Name</text><br/>
            <text>This will replace the client's contact information on an invoice with the company contact information associated with that client.</text>
            <br/><br/>
            <Checkbox label='Show Company Name' /><Button style={{float:"right"}}>Edit Terms</Button>
)    <br/><br/>
            
            </div>
        )
    }
}
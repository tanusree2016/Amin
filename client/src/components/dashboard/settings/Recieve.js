import React,{Component} from 'react'
import Country from './Country'
import { Input } from 'semantic-ui-react'
export default class Recieve extends Component{
    render(){
        return(
            <div>
                <text style={{fontSize:"18px"}}>Receiving Money</text><br/>
                <text>Allow users to pay you through the invoices you send through Dubsado.</text><br/>
                <text>This will take you through the steps to authorize our system to accept money on your behalf. We do not take a commission on the sales, though, the usual credit card processing fees (2.9% + 30¢ per transaction) still apply.
                </text><br/><br/>
                <text>
Base country

</text><br/><br/>
<Country/><br/>
<text>Currency to receive</text><br/><br/>
<Input fluid/><br/>
<text>To choose a payment processor you must first save your country and currency settings</text>
                        </div>
        )
    }
}
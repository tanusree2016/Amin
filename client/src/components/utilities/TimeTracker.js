import React, { Component } from 'react';
import { Segment, Grid, Button,Dropdown ,Image,Input,Popup,Form,TextArea} from 'semantic-ui-react';
//import FormSortTable from './FormSortTable'
import TimeTrackerTabs from './TimeTrackerTabs'
const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
  ]
  
export default class Calendars extends Component {
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "60px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
              
                  
                    <text style={{ color: "white" }}><h3>Time Tracker</h3></text>
                </div>
                <div style={{ padding: "20px", background: "white" }}>
                    <div>
                    <Grid>
                    <Grid.Column width={7}>
                    <Input placeholder='Search...' />
    </Grid.Column>

    <Grid.Column width={3}>
    <text style={{fontSize:"20px",color:"geen"}}>

    <Popup
    content={<div style={{width:"240px",padding:"20px"}}>
         <label><b>Project</b></label><br/>
        <Dropdown clearable options={options} selection  labeled /> <br/>  <br/>
        <label><b>Invoice</b></label><br/>
        <Dropdown clearable options={options} selection labeled />
   
       </div>}
    on='click'

    position='bottom center'
    trigger={<text>Projects</text>}
    
/>

    </text>
    </Grid.Column>
  
    <Grid.Column width={3}>
    <text style={{fontSize:"20px",color:"geen"}}> 
    <Popup
    content={<div style={{padding:"20px",}}>
         <Form>
     
           <Form.Field
          control={TextArea}
          label='Description'
          placeholder='Press Enter to create a new line'
        />
          <Form.Field
            control={Input}
            label='Hourly Rate'
           
          />
            <Form.Field
            control={Input}
            label='Tax Item(s)'
            placeholder='Select tax if applicable'
          />
          <label><b>Category</b></label><br/>
            <Form.Field
            control={Input}
            label='Name'
            
          />
            <Form.Field
            control={Input}
            label='Type'
         
          />
          <Button secondary>Cancel</Button><Button primary>Create</Button>
       
       </Form>
   
       </div>}
    on='click'

    position='top center'
    trigger={<text>$</text>}
    
/>
    
    </text>
    </Grid.Column>
    <Grid.Column width={3}>
      <Image src='/images/wireframe/media-paragraph.png' />
    </Grid.Column>
  </Grid>
                    </div><br/>
                    <div >
                   
                   <TimeTrackerTabs/>
                    </div>




                </div>

            </div>



        )
    }
}
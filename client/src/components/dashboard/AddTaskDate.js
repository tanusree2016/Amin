import React, { Component } from 'react'
//import { Accordion, Input, Grid, Segment, Icon, Button, Checkbox, Form, Radio } from 'semantic-ui-react'

import "react-datepicker/dist/react-datepicker.css";
import { Form,  } from 'semantic-ui-react'
import {DatePickr,TimePickr} from './DateRange';

class AddDate extends React.Component {
  state = {
    start_date : '',
    end_date : '',
    start_time : '',
    end_time : '',
    is_all_day : '',
    show_me: '',
    available : '',
    busy : ''
}
  handleCheck = (e,id) => {
    
    if((document.getElementById(id).style.display=="inline") )
   { document.getElementById(id).style.display="none";}
  
    else if((document.getElementById(id).style.display=="none") ){
      document.getElementById(id).style.display="inline";
    
    }
    
    
    }
    handleStartDate = (event) => {
      this.setState({

          startdate: event.target.value
      });
  }
  handleEndDate = (event) => {
      this.setState({

          enddate: event.target.value
      });
  }
  handleAllDay = (event) => {
      this.setState({

          allday: event.target.value
      });
  }
  handleAvailable = (event) => {
      this.setState({

          available: event.target.value
      });
  }
  handleBusy = (event) => {
      this.setState({

          busy: event.target.value
      });
  }
  
  handleData = () => {
    fetch('/list')
    .then(response => response.json())
    .then(res2 => this.setState({ createproject: res2 }))
    .catch(function (err) {
      console.log(err)
  })

}

handleSubmit = (event) => {
  //   console.log(this.state.)

  alert('A list was submitted: ' + this.state.client + "" + this.state.projectTitle
  + "" + this.state.status+ "" + this.state.firstname+ "" + this.state.lastname
  + "" + this.state.companyname+ "" + this.state.emailaddress+ "" + this.state.phoneno
  + "" + this.state.tags+ "" + this.state.notes+ "" + this.state.allday);
  event.preventDefault();
  var data = new URLSearchParams();
  for(const pair of new FormData(event.target)){
    data.append(pair[0],pair[1])
  }
  //localhost:5000/sent
 fetch('/create-project',{
     method:"post",
     body:data,
    
 }).then(res=>res.json())
 .then(res2 => {
   console.log(res2)
 
   this.setState({
     createproject:[...this.state.createproject,res2]
   })
 })
 .catch(function (err) {
  console.log(err)
})
}

 componentDidMount =()=> {
  this.handleData();
}

  render() {
    const { value } = this.state
    return (
      <Form style={{padding:"20px"}}>

      
      
        

          <div className="ui icon input" style={{ float: "left",height:"50px" }}>

            <DatePickr />
            <i aria-hidden="true" className="calendar alternate outline icon" style={{marginTop:"-12px"}}></i>
           
          </div><input id="101" type="time"style ={{display:"inline"}}/>
          
       
          
          <Form.Check  label="All Day" onClick={(e)=>this.handleCheck(e,101)} style={{ float: "right" }}/>
        

          
        
        
       


     
       

      </Form>
     

    )
  }
}

export default  AddDate;
 


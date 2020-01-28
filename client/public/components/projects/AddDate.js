import React from 'react'
import { Accordion ,Input, Grid,Segment,} from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import {Form} from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";
const level1Panels = [
  { key: 'panel-1a', title: 'Level 1A', content: 'Level 1A Contents' },
  { key: 'panel-ba', title: 'Level 1B', content: 'Level 1B Contents' },
]
class Example extends React.Component {
    state = {
      startDate: new Date()
    };
   
    handleChange = date => {
      this.setState({
        startDate: date
      });
    };
   
    render() {
      return (
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
      );
    }
  }

const Level1Content = (
  <div>
  <input type="date"/><input type="time"/><br/><input type="date"/><input type="time"/><br/>
  <Form>
        <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="All day" />
                            </Form.Group>
  </Form>

  </div>
)



const rootPanels = [
  { key: 'panel-1', title: 'Add Dates', content: { content: Level1Content } },
  
]

const AccordionExampleNested = () => (
  <Accordion panels={rootPanels} style={{textAlign:"center"}}/>
)

export default AccordionExampleNested

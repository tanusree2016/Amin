import React from 'react'


import { Form,Grid, Image, Checkbox, Dropdown, Input, Button,ButtonGroup, Segment } from 'semantic-ui-react'
import NewProject from './NewProject'
import ProjectSortTable from './ProjectSortTable'
import {Link,withRouter} from 'react-router-dom'
const panels = [
  {
    key: 'details',
    title: 'Optional Details',
    content: {
      as: Form.Input,
      label: 'Maiden Name',
      placeholder: 'Maiden Name',
    },
  },
]
class Navs extends React.Component {

  handleFilter = (e, id) => {
    id = id + 1
    if (document.getElementById(id).style.display == "none") {
      document.getElementById(id).style.display = "block";
      

    }

    else {
    

      document.getElementById(id).style.display = "none";

    }
  }


  render() {

    return (
      <div>
        <div>
          <Grid doubling columns={5} centered>

            <Grid.Column>
              <div style={{
                width: "70px", height: "35px", padding: "10px", border: "1px solid #ccc",
                borderRadius: "4px",background:"#e9768d",color:"white"
              }}>
                <Checkbox />
                <Dropdown>
                  <Dropdown.Menu>
                    <Dropdown.Item>Delete</Dropdown.Item>
                    <Dropdown.Item>Archive</Dropdown.Item>
                    <Dropdown.Item>Update project status</Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>

              </div>

            </Grid.Column>
            <Grid.Column>
              <div id="111"></div>
              <ButtonGroup>
              <Button
                style={{background:"#e9768d",color:"white"}}
                onClick={(e) => this.handleFilter(e, 111)}
              >Filter
                
                {/* <Dropdown.Menu>
                <Dropdown.Header content='Search Issues' />
                <Input icon='search' iconPosition='left' name='search' />
                <Dropdown.Header icon='tags' content='Filter by tag' />
                <Dropdown.Divider />
                <Dropdown.Item
                  label={{ color: 'red', empty: true, circular: true }}
                  text='Important'
                />
                <Dropdown.Item
                  label={{ color: 'blue', empty: true, circular: true }}
                  text='Announcement'
                />
                <Dropdown.Item
                  label={{ color: 'black', empty: true, circular: true }}
                  text='Discussion'
                />
              </Dropdown.Menu> */}
              </Button>
              <Button style={{background:"#e9768d",color:"white"}}  onClick={(e) => this.handleFilter(e, 111)}><i aria-hidden="true" class="filter icon"></i></Button>
              </ButtonGroup>
            </Grid.Column>
            <Grid.Column>
              <NewProject />

            </Grid.Column>
            <Grid.Column>
              <Button style={{background:"#e9768d",color:"white"}}><Link to="/emails"  style={{color:"white"}}> Export</Link></Button>
            </Grid.Column>
            <Grid.Column>
              <Button style={{background:"#e9768d"}}><Link to="/customize" style={{color:"white"}}>Customize</Link></Button>
            </Grid.Column>
          </Grid>

        </div><br />
        <div id="112" style={{display:"none" , width:"50%"}}>
        {/* <Form>
  <Form.Group controlId="exampleForm.ControlInput1">
  
    <Form.Control icon='search' iconPosition='left' placeholder='Search by project title'/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
  
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
   
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
   
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  
  </Form> */}
                </div><br/>
                <div style={{borderRadius:"15px",background:"white",padding:"5px"}}>
                   <ProjectSortTable />
                </div>
       



      </div>
    )
  }
}

export default withRouter(Navs);

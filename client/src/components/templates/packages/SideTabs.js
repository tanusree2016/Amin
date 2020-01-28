
import React,{Component} from 'react'
import { Tab, Segment, Icon, Divider, Grid,Button } from 'semantic-ui-react'
// import Branding from './settings/Branding'
// import Dashboard from './settings/Dashboard'
// import Portal from './settings/Portal'
// import UserManagement from './settings/UserManagement'
// import InternationalSettings from './settings/InternationalSettings'
// import RecieveMoney from './settings/RecieveMoney'
import {Link} from 'react-router-dom' 
import swal from 'sweetalert'

class SideTabs extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  handleDelete = ()=>{
    
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } 
    });
  }

  render(){

    const panes = [
      {
        menuItem: 'No Package Name', render: () => <Segment>No Package Name
      
    <Icon name="trash" style={{ float: "right" }} onClick={this.handleDelete}/><Icon name="copy outline" style={{ float: "right" }} /><Link to='/packagesettings' style={{textDecoration:"none",color:"black"}}> <Icon name="cog" style={{ float: "right" }} /></Link>
        </Segment>
      },
      {
        menuItem: 'Sample Add-On Package', render: () => <Segment>Sample Add-On Package
      
    <Icon name="trash" style={{ float: "right" }} onClick={this.handleDelete}/><Icon name="copy outline" style={{ float: "right" }} /><Link to='/packagesettings' style={{textDecoration:"none",color:"black"}}> <Icon name="cog" style={{ float: "right" }} /></Link>
          <Divider></Divider>
    
          <Grid style={{ paddingLeft: "20px" }}>
            <Grid.Row columns={2} only='large screen'>
              <Grid.Column>
                Add-On 2
          </Grid.Column>
              <Grid.Column>
                $15.00
          </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider></Divider>
    
          <Grid style={{ paddingLeft: "20px" }}>
            <Grid.Row columns={2} only='large screen'>
              <Grid.Column>
                TOTAL
          </Grid.Column>
              <Grid.Column>
                $15.00
          </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      },
      {
        menuItem: 'Sample Discount Package', render: () => <Segment>Sample Discount Package
    <Icon name="trash" style={{ float: "right" }} onClick={this.handleDelete} /><Icon name="copy outline" style={{ float: "right" }} /><Link to='/packagesettings' style={{textDecoration:"none",color:"black"}}> <Icon name="cog" style={{ float: "right" }} /></Link>
          <Divider></Divider>
          <Grid style={{ paddingLeft: "20px" }}>
            <Grid.Row columns={2} only='large screen'>
              <Grid.Column>
                Discount
          </Grid.Column>
              <Grid.Column>
                -$50.00
          </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider></Divider>
    
          <Grid style={{ paddingLeft: "20px" }}>
            <Grid.Row columns={2} only='large screen'>
              <Grid.Column>
                TOTAL
          </Grid.Column>
              <Grid.Column>
                -$50.00
          </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      },
      {
        menuItem: 'ffgfg', render: () => <Segment>ffgfg
    <Icon name="trash" style={{ float: "right" }} onClick={this.handleDelete}/><Icon name="copy outline" style={{ float: "right" }} /><Link to='/packagesettings' style={{textDecoration:"none",color:"black"}}> <Icon name="cog" style={{ float: "right" }} /></Link>
          <Divider></Divider><br /><Divider></Divider>
    
        </Segment>
      },
      {
        menuItem: 'dfgfdgdff', render: () => <Segment>dfgfdgdff
      
    <Icon name="trash" style={{ float: "right" }} onClick={this.handleDelete}/><Icon name="copy outline" style={{ float: "right" }} /><Link to='/packagesettings' style={{textDecoration:"none",color:"black"}}> <Icon name="cog" style={{ float: "right" }} /></Link>
          <Divider></Divider><br /><Divider></Divider>
        </Segment>
      },
      {
        menuItem: 'dfgfdgfg', render: () => <Segment>dfgfdgfg
    <Icon name="trash" style={{ float: "right" }} onClick={this.handleDelete}/><Icon name="copy outline" style={{ float: "right" }} /><Link to='/packagesettings' style={{textDecoration:"none",color:"black"}}> <Icon name="cog" style={{ float: "right" }} /></Link>
          <Divider></Divider><br /><Divider></Divider>
    
        </Segment>
      },
      {
        menuItem: 'yuytuu', render: () => <Segment>yuytuu
      
    <Icon name="trash" style={{ float: "right" }} onClick={this.handleDelete}/><Icon name="copy outline" style={{ float: "right" }} /><Link to='/packagesettings' style={{textDecoration:"none",color:"black"}}> <Icon name="cog" style={{ float: "right" }} /></Link>
          <Divider></Divider><br /><Divider></Divider>
        </Segment>
      },
    ]
    return(
<div>
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='left'
      panes={panes}
    />
  </div>
    )
  }

} 
  


export default SideTabs
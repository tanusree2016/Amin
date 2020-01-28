import React, { Component } from 'react'
import { Grid,Icon, Divider } from 'semantic-ui-react'
import swal from 'sweetalert'
export default class Users extends Component {

    handleClick = () =>{
        swal({
            title: "Requires Paid Account",
            text: "Adding team members requires a paid account.",
            textAlign: "center",
          
            button: true,
   
          })
         
    }
    render() {
        return (
            <div>
                <text style={{ fontSize: "25px" }}>Users</text><br />

                <text>Dubsado offers multiple user access throughout the different parts of your dashboard. The prices listed below are in addition to the base charge for your account. Users cannot be added until you are on a paid plan.</text>
                <br />
                <div style={{ padding: "20px" }}>
                    <Grid >
                        <Grid.Row columns={4}>
                            <Grid.Column>
                                <div style={{ width: "150px", height: "100px", border: "1px solid #ddd",textAlign:"center",padding:"20px" }}>
                                <text style={{textAlign:"center"}}>FIRST 3</text><Icon name="circle"/><br /><br />
                                    <text style={{textAlign:"center"}}>$0/month</text>

                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div style={{ width: "150px", height: "100px", border: "1px solid #ddd",textAlign:"center",padding:"20px" }}>
                                    <text style={{textAlign:"center"}}>4-10 USERS</text><br /><br />
                                    <text style={{textAlign:"center"}}>$25/month</text>

                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div style={{ width: "150px", height: "100px", border: "1px solid #ddd",textAlign:"center",padding:"20px" }}>
                                <text style={{textAlign:"center"}}>11-20 USERS</text><br /><br />
                                    <text style={{textAlign:"center"}}>$45/month</text>

                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div style={{ width: "150px", height: "100px", border: "1px solid #ddd",textAlign:"center",padding:"20px" }}>

                                <text style={{textAlign:"center"}}>21-30 USERS</text><br /><br />
                                    <text style={{textAlign:"center"}}>$60/month</text>
                                </div>
                            </Grid.Column>
                        </Grid.Row>


                        <Grid.Row columns={4}>
      <Grid.Column>
      Name
      </Grid.Column>
      <Grid.Column>
      Email
      </Grid.Column>
      <Grid.Column>
       
      </Grid.Column>
      <Grid.Column>
      Status/Role
      </Grid.Column>
    </Grid.Row>
                    </Grid>

                </div>
<Divider></Divider>

<text style={{color:" #66e0ff",fontWeight:"bold"}} onClick={this.handleClick}><u>Invite New User</u>s</text>

            </div>
        )
    }
}
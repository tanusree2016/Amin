import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Icon, Header, Reveal, Image } from 'semantic-ui-react';
import Image0 from './photo1.jpg'
import Image1 from './p2.jpeg'
import FormsModal from './FormsModal'
const options = [
    { key: 1, text: "fgfg", value: 1, content: "jjj" },
    { key: 2, text: <FormsModal />, value: 2, description: "Contact" },
    { key: 3, text: 'Choice 3', value: 3 },
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
]

export default class Forms extends Component {
    constructor(props) {
        super(props);
    }
    handleMouseOver = (e, id) => {
        id = id + 1;
     if((document.getElementById(id+1).style.display="inline")){
        document.getElementById(id+1).style.display="none"
        document.getElementById(id).style.display="inline"

     }else if(document.getElementById(id).style.display="inline"){
        document.getElementById(id).style.display="none"
        document.getElementById(id+1).style.display="inline"
      

     }

    }
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "60px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>

                    <text style={{ color: "white" }}><h3>Forms</h3></text>
                </div>
                <div style={{ padding: "5px", background: "white" }}>
                    <div >
                        <Dropdown clearable fluid options={options} selection />
                        <Segment style={{ width: "35%", textAlign: "center" }}>
                            <Icon name="clipboard outline" /><br />
                            <text>Questionaries</text><br />
                            <text style={{ fontSize: "12px" }}> New Questionaries</text><br /><br />
                            <Button size="tiny" color='blue'>Link Only</Button><Button size="tiny" color='orange'>Needs Sending</Button><br /><br />
                            <br />
                            <div id="11"></div>
                            <div onMouseOver={(e) => this.handleMouseOver(e, 11)}>
                                <div id="12" style={{ fontSize: "11px", display: "none" }}> sdsgfgfgghghh</div><br />
                            <div id="13" style={{ fontSize: "11px", display: "inline" }} > Client Viewed : N/A</div><br />

                            </div>
                            



                        </Segment>

                        <Segment style={{ width: "35%", textAlign: "center" }}>
                            <Icon name="file outline" /><br />
                            <text>Proposal</text><br />
                            <text style={{ fontSize: "12px" }}> New Proposal</text><br /><br />
                            <Button size="tiny" color='blue'>Link Only</Button><Button size="tiny" color='orange'>Needs Sending</Button><br /><br />
                            <text style={{ fontSize: "11px" }}> Client Viewed : N/A</text>
                        </Segment>
                        <Segment style={{ width: "35%", textAlign: "center" }}>
                            <Icon name="copy outline" /><br />
                            <text>Sub Agreement</text><br />
                            <text style={{ fontSize: "12px" }}> New Agreement</text><br /><br />
                            <Button size="tiny" color='blue'>Link Only</Button><Button size="tiny" color='orange'>Needs Sending</Button><br /><br />
                            <text style={{ fontSize: "11px" }}> Client Viewed : N/A</text>
                        </Segment>

                    </div>




                </div>

            </div>



        )
    }
}
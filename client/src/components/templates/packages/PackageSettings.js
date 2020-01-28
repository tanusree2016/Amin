import React, { Component } from 'react';
import { Segment, Grid, Button, Dropdown, Input, Checkbox, ButtonGroup, Form } from 'semantic-ui-react';



export default class PackageSettings extends Component {
    render() {
        return (

            <div style={{ padding: "10px" }}>
                <div style={{ height: "70px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>

                    <text style={{ float: "right" }}></text>

                    <text style={{ float: "right" }}></text>
                    <text style={{ float: "right" }}></text><text style={{ color: "white" }}><h3>Packages</h3></text>
                    <text style={{ fontSize: "12px", color: "white" }}>Create sets of invoice items</text>
                </div>
                <div style={{ padding: "20px", background: "white" }}>
                    <div >

                        <Grid columns='equal'>
                            <Grid.Column>
                                Item
                            </Grid.Column>
                            <Grid.Column width={4}>
                                Description
                            </Grid.Column>
                            <Grid.Column>
                                Category
                            </Grid.Column>
                            <Grid.Column>
                                Quantity
                            </Grid.Column>
                            <Grid.Column >
                                Price
                            </Grid.Column>
                            <Grid.Column>
                                Discount
                            </Grid.Column>
                            <Grid.Column>
                                Tax
                            </Grid.Column>

                            <Grid.Column>
                                Subtotal
                            </Grid.Column>
                        </Grid>


                    </div><br />
                    {/* <div style={{ border: "1px solid #ddd", height: "70px", padding: "10px", }}>
                        <label>INVOICE ITEM NAME</label><br />
                        <input placeholder='Item Name' style={{ background: "transparent", border: "0px solid", outline: "none" }} />
                    </div>
                    <div style={{ border: "1px solid #ddd", height: "100px", padding: "10px", }}>
                        <Checkbox toggle style={{ float: "right" }} /><label>DESCRIPTION</label><br />
                        <textarea fluid placeholder='Description of the item' style={{ background: "transparent", border: "0px solid", outline: "none", width: "100%" }} />

                    </div>
                    <div style={{ border: "1px solid #ddd", height: "80px" }} >
                        <Form>

                    <Form.Group>
            
                        <div style={{ border: "1px solid #ddd", height: "80px",width:"33%" }}>

                        </div>
                        <div style={{ border: "1px solid #ddd", height: "80px",width:"33%"  }}>

                        </div>
                        <div style={{ border: "1px solid #ddd", height: "80px",width:"33%"  }}>

                        </div>  </Form.Group>  </Form>
                    </div>
                    <div style={{ border: "1px solid #ddd", height: "80px" }}>

                    </div>
                    <div style={{ border: "1px solid #ddd", height: "80px" }}>

                    </div>




               */}
               <Button>New Line Item</Button><Button>Notes</Button><br/>

                    <Segment.Group>
                        <Segment>
                            <label>INVOICE ITEM NAME</label><br />
                            <input placeholder='Item Name' style={{ background: "transparent", border: "0px solid", outline: "none" }} />

                        </Segment>
                        <Segment>
                            <Checkbox toggle style={{ float: "right" }} /><label>DESCRIPTION</label><br />
                            <textarea fluid placeholder='Description of the item' style={{ background: "transparent", border: "0px solid", outline: "none", width: "100%" }} />

                        </Segment>
                        <Segment.Group horizontal>
                            <Segment>
                                <label>QUANTITY</label><br />
                                <input placeholder='Item Name' value="-2" style={{ background: "transparent", border: "0px solid", outline: "none" }} />

                            </Segment>
                            <Segment>
                                <label>PRICE</label><br />
                                <input placeholder='Price' value="$0.00" style={{ background: "transparent", border: "0px solid", outline: "none" }} />

                            </Segment>
                            <Segment>
                                <label>ITEM SUBTOTAL</label><br />
                                <text>$0.00</text>

                            </Segment>
                        </Segment.Group>
                        <Segment.Group horizontal>
                            <Segment>
                                <label>TAX</label><br />
                                <input placeholder='Select tax if applicable' style={{ background: "transparent", border: "0px solid", outline: "none" }} />
                                <Button style={{ float: "right" }}>New Tax Item</Button>
                            </Segment>
                            <Segment>
                                <label>APPLY DISCOUNT</label>

                            </Segment>
                        </Segment.Group>
                        <Segment.Group horizontal>
                            <Segment>
                                <label>CATEGORY</label><br />
                                <input placeholder='Select a category' style={{ background: "transparent", border: "0px solid", outline: "none" }} />
                                <Button style={{ float: "right" }}>New Category</Button>

                            </Segment>
                        </Segment.Group>
                    </Segment.Group>

                    <div style={{ textAlign: "right" }}>
                        <Button>Add Item</Button> <Button>Cancel</Button><br />
                        <text><b>Subtotal:</b>$0.00</text><br/>
                        <text><b>Tax:</b>$0.00</text><br/>
                        <text><b>Total:</b>$0.00</text><br/>
                        <Button>Return to packages</Button> 
                    </div>

                </div> </div>



        )
    }
}
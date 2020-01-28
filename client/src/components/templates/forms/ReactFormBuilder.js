// import React,{Component} from 'react'
// import { ReactFormBuilder } from 'react-form-builder2';

// //import * as variables from './variables';
// export default class Proposal extends Component{
//     render(){
//         return(
//             <div>
//             <ReactFormBuilder 
//     url='/api/formdata'
//     saveUrl='/api/formdata'
//   />
 
                
             
//             </div>
//         )
//     }
// }


import React, { Component } from 'react';
import { Input, Image, Grid, Segment, Icon, Button, Form, Dropdown, Modal } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import '../../../App.css';
import "react-datepicker/dist/react-datepicker.css";

const src1 = '/images/wireframe/image.png'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

class FormBuilders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submenu: [],
      showChild: true,
      fields: [{ value: '' }],
      columns: [{ value: '' }],
      fields1: [{ value: '' }],
      columns1: [{ value: '' }],
      fields2: [{ value: '' }],
      columns2: [{ value: '' }],
      fields3: [{ value: '' }],
      columns3: [{ value: '' }],
      fields4: [{ value: '' }],
      columns4: [{ value: '' }],
      fields5: [{ value: '' }],
      columns5: [{ value: '' }],
      fields6: [{ value: '' }],
      columns6: [{ value: '' }],
      fields7: [{ value: '' }],
      columns7: [{ value: '' }],
      fields8: [{ value: '' }],
      columns8: [{ value: '' }],
      fields9: [{ value: '' }],
      columns9: [{ value: '' }],
      fields10: [{ value: '' }],
      columns10: [{ value: '' }],
      inputValues: {},
      dropdownBox: '',
      startDate: new Date(),
      open: false
    }

  }

  show = (size) => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  show1 = (size) => () => this.setState({ size, open: true })
  close1 = () => this.setState({ open: false })

  show2 = (size) => () => this.setState({ size, open: true })
  close2 = () => this.setState({ open: false })

  show3 = (size) => () => this.setState({ size, open: true })
  close3 = () => this.setState({ open: false })

  show4 = (size) => () => this.setState({ size, open: true })
  close4 = () => this.setState({ open: false })

  show5 = (size) => () => this.setState({ size, open: true })
  close5 = () => this.setState({ open: false })

  show6 = (size) => () => this.setState({ size, open: true })
  close6 = () => this.setState({ open: false })

  show7 = (size) => () => this.setState({ size, open: true })
  close7 = () => this.setState({ open: false })

  show8 = (size) => () => this.setState({ size, open: true })
  close8 = () => this.setState({ open: false })

  show9 = (size) => () => this.setState({ size, open: true })
  close9 = () => this.setState({ open: false })

  show10 = (size) => () => this.setState({ size, open: true })
  close10 = () => this.setState({ open: false })

  handleChangeRadio(e, i, { value }){this.setState({ value })}
  handleDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleAddValue(event) {

    this.state.inputValues = event.target.value;
    if (!this.state.inputValues == "")
      this.state.submenu.push(this.state.inputValues)

    this.props.handlerfordata(this.state.submenu);
  }

  onChange(name, { target: { value } }) {
    const inputValues = this.state.inputValues;
    inputValues[name] = value;
    this.setState({ inputValues })
    this.state.subMenu = inputValues

    console.log('finalValue is ', inputValues);
    this.props.handlerfordata(inputValues);
  }

  handleChange = (i, event) => {
    let values = [...this.state.fields];
    values[i].value = event.target.value;
    this.setState({
      fields: values
    })
  }

  // handleShowReminder = (e, id) => {
  //     id = id + 1
  //     if (document.getElementById(id).style.display = "none") {
  //         document.getElementById(id).style.display = "block";
  //         document.getElementById(id + 1).style.display = "none";
  //     }

  // }
  handleAdd = (e, id) => {

    id = id + 1
    if (document.getElementById(id).style.display = "none") {
      document.getElementById(id).style.display = "block";
      if (document.getElementById(id).style.display = "block") {
        let values = [...this.state.fields];
        values.push({ value: null });
        this.setState({
          fields: values
        })
      }
    }
  }

  handleAdd1 = (e, id) => {


    if (document.getElementById(id).style.display = "none") {
      document.getElementById(id).style.display = "block";
      if (document.getElementById(id).style.display = "block") {
        let values = [...this.state.fields1];
        values.push({ value: null });
        this.setState({
          fields1: values
        })
      }
    }

  }

  handleAdd2 = (e, id) => {


    if (document.getElementById(id).style.display = "none") {
      document.getElementById(id).style.display = "block";
      if (document.getElementById(id).style.display = "block") {
        let values = [...this.state.fields2];
        values.push({ value: null });
        this.setState({
          fields2: values
        })
      }
    }

  }


  handleAdd3 = (e, id) => {


    if (document.getElementById(id).style.display = "none") {
      document.getElementById(id).style.display = "block";
      if (document.getElementById(id).style.display = "block") {
        let values = [...this.state.fields3];
        values.push({ value: null });
        this.setState({
          fields3: values
        })
      }
    }

  }


  handleAdd4 = (e, id) => {


    if (document.getElementById(id).style.display = "none") {
      document.getElementById(id).style.display = "block";
      if (document.getElementById(id).style.display = "block") {
        let values = [...this.state.fields4];
        values.push({ value: null });
        this.setState({
          fields4: values
        })
      }
    }

  }

  handleAdd5 = (e, id) => {


    if (document.getElementById(id).style.display = "none") {
      document.getElementById(id).style.display = "block";
      if (document.getElementById(id).style.display = "block") {
        let values = [...this.state.fields5];
        values.push({ value: null });
        this.setState({
          fields5: values
        })
      }
    }

  }

  handleAdd6 = (e, id) => {


    if (document.getElementById(id).style.display = "none") {
      document.getElementById(id).style.display = "block";
      if (document.getElementById(id).style.display = "block") {
        let values = [...this.state.fields6];
        values.push({ value: null });
        this.setState({
          fields6: values
        })
      }
    }

  }

  handleAdd7 = (e, id) => {


    if (document.getElementById(id).style.display = "none") {
      document.getElementById(id).style.display = "block";
      if (document.getElementById(id).style.display = "block") {
        let values = [...this.state.fields7];
        values.push({ value: null });
        this.setState({
          fields7: values
        })
      }
    }

  }

  handleAdd8 = (e, id) => {


    if (document.getElementById(id).style.display = "none") {
      document.getElementById(id).style.display = "block";
      if (document.getElementById(id).style.display = "block") {
        let values = [...this.state.fields8];
        values.push({ value: null });
        this.setState({
          fields8: values
        })
      }
    }

  }

  handleAdd9 = (e, id) => {


    if (document.getElementById(id).style.display = "none") {
      document.getElementById(id).style.display = "block";
      if (document.getElementById(id).style.display = "block") {
        let values = [...this.state.fields9];
        values.push({ value: null });
        this.setState({
          fields9: values
        })
      }
    }

  }

  handleAdd10 = (e, id) => {


    if (document.getElementById(id).style.display = "none") {
      document.getElementById(id).style.display = "block";
      if (document.getElementById(id).style.display = "block") {
        let values = [...this.state.fields10];
        values.push({ value: null });
        this.setState({
          fields10: values
        })
      }
    }

  }
  handleRemove = (i) => {
    let values = [...this.state.fields];
    values.splice(i, 1);
    this.setState({
      fields: values
    })
  }

  handleRemove1 = (i) => {
    let values = [...this.state.fields1];
    values.splice(i, 1);
    this.setState({
      fields1: values
    })
  }

  handleRemove2 = (i) => {
    let values = [...this.state.fields2];
    values.splice(i, 1);
    this.setState({
      fields2: values
    })
  }

  handleRemove3 = (i) => {
    let values = [...this.state.fields3];
    values.splice(i, 1);
    this.setState({
      fields3: values
    })
  }
  handleRemove4 = (i) => {
    let values = [...this.state.fields4];
    values.splice(i, 1);
    this.setState({
      fields4: values
    })
  }
  handleRemove5 = (i) => {
    let values = [...this.state.fields5];
    values.splice(i, 1);
    this.setState({
      fields5: values
    })
  }
  handleRemove6 = (i) => {
    let values = [...this.state.fields6];
    values.splice(i, 1);
    this.setState({
      fields6: values
    })
  }

  handleRemove7 = (i) => {
    let values = [...this.state.fields7];
    values.splice(i, 1);
    this.setState({
      fields7: values
    })
  }
  handleRemove8 = (i) => {
    let values = [...this.state.fields8];
    values.splice(i, 1);
    this.setState({
      fields8: values
    })
  }
  handleRemove9 = (i) => {
    let values = [...this.state.fields9];
    values.splice(i, 1);
    this.setState({
      fields9: values
    })
  }
  handleRemove10 = (i) => {
    let values = [...this.state.fields10];
    values.splice(i, 1);
    this.setState({
      fields10: values
    })
  }


  handleDelete = (i) => {
    let cvalues = [...this.state.columns];
    cvalues.splice(i, 1);
    this.setState({
      columns: cvalues
    })
  }

  handleDelete1 = (i) => {
    let cvalues = [...this.state.columns1];
    cvalues.splice(i, 1);
    this.setState({
      columns1: cvalues
    })
  }

  handleDelete2 = (i) => {
    let cvalues = [...this.state.columns2];
    cvalues.splice(i, 1);
    this.setState({
      columns2: cvalues
    })
  }

  handleDelete3 = (i) => {
    let cvalues = [...this.state.columns3];
    cvalues.splice(i, 1);
    this.setState({
      columns3: cvalues
    })
  }

  handleDelete4 = (i) => {
    let cvalues = [...this.state.columns4];
    cvalues.splice(i, 1);
    this.setState({
      columns4: cvalues
    })
  }
  handleDelete5 = (i) => {
    let cvalues = [...this.state.columns5];
    cvalues.splice(i, 1);
    this.setState({
      columns5: cvalues
    })
  }
  handleDelete6 = (i) => {
    let cvalues = [...this.state.columns6];
    cvalues.splice(i, 1);
    this.setState({
      columns6: cvalues
    })
  }

  handleDelete7 = (i) => {
    let cvalues = [...this.state.columns7];
    cvalues.splice(i, 1);
    this.setState({
      columns7: cvalues
    })
  }

  handleDelete8 = (i) => {
    let cvalues = [...this.state.columns8];
    cvalues.splice(i, 1);
    this.setState({
      columns8: cvalues
    })
  }

  handleDelete9 = (i) => {
    let cvalues = [...this.state.columns9];
    cvalues.splice(i, 1);
    this.setState({
      columns9: cvalues
    })
  }

  handleDelete10 = (i) => {
    let cvalues = [...this.state.columns10];
    cvalues.splice(i, 1);
    this.setState({
      columns10: cvalues
    })
  }


  handleColumn = () => {
    let cvalues = [...this.state.columns];
    cvalues.push({ value: null });
    this.setState({
      columns: cvalues

    })
  }

  handleColumn1 = () => {
    let cvalues = [...this.state.columns1];
    cvalues.push({ value: null });
    this.setState({
      columns1: cvalues

    })
  }

  handleColumn2 = () => {
    let cvalues = [...this.state.columns2];
    cvalues.push({ value: null });
    this.setState({
      columns2: cvalues

    })
  }

  handleColumn3 = () => {
    let cvalues = [...this.state.columns3];
    cvalues.push({ value: null });
    this.setState({
      columns3: cvalues

    })
  }


  handleColumn4 = () => {
    let cvalues = [...this.state.columns4];
    cvalues.push({ value: null });
    this.setState({
      columns4: cvalues

    })
  }

  handleColumn5 = () => {
    let cvalues = [...this.state.columns5];
    cvalues.push({ value: null });
    this.setState({
      columns5: cvalues

    })
  }

  handleColumn6 = () => {
    let cvalues = [...this.state.columns6];
    cvalues.push({ value: null });
    this.setState({
      columns6: cvalues

    })
  }

  handleColumn7 = () => {
    let cvalues = [...this.state.columns7];
    cvalues.push({ value: null });
    this.setState({
      columns7: cvalues

    })
  }

  handleColumn8 = () => {
    let cvalues = [...this.state.columns8];
    cvalues.push({ value: null });
    this.setState({
      columns8: cvalues

    })
  }

  handleColumn9 = () => {
    let cvalues = [...this.state.columns9];
    cvalues.push({ value: null });
    this.setState({
      columns9: cvalues

    })
  }

  handleColumn10 = () => {
    let cvalues = [...this.state.columns10];
    cvalues.push({ value: null });
    this.setState({
      columns10: cvalues

    })
  }


  handleBoxChange = (e, { value }) => this.setState((prevState, props) => {
    let newState = { ...prevState }
    newState.dropdownBox = value;
    return { ...newState };
  });

  handleMouseOver = (e,id) => {
     id = id+1;
    document.getElementById(id).style.display = "block"

    // var x = document.getElementByClassName(id);
    // var i;
    // for (i = 0; i < x.length; i++) {
    //   x[i].style.display = 'block';
    // }

  }

  handleMouseOut = (e,id) => {
     id = id + 1;
     document.getElementById(id).style.display = "none"

  //   var x = document.getElementByClassName(id);
  //   var i;
  //   for (i = 0; i < x.length; i++) {
  //     x.style.display = 'none';
  // }
}


handleSegOver = (e,id) => {
  id = id+1;
 document.getElementById(id).style.background = "#ddd"


}

handleSegOut = (e,id) => {
  id = id+1;
  document.getElementById(id).style.background = "none"


}

  render() {
    const style1 = {
      width: "100px",
      height: "100px",
      padding: "0px",
      textAlign: "center"
    };

    const { value, open, size } = this.state;

    return (

      <div style={{ padding: "20px" }}>

        <Grid>
          <Grid.Column floated='left' width={12}>
            <Form>
              <Input fluid placeholder="New contract" /><br />
              <div id="1">
                <Modal size={size} open={open} onClose={this.close}>
                  <Modal.Header>Edit Container</Modal.Header>
                  <Modal.Content>
                    <Input fluid /><br />
                    <Button secondary onClick={this.close}>Close</Button>
                    <Button primary >Edit</Button>
                  </Modal.Content>
                </Modal>
              </div>

              <div id="116" className="div" style={{ display: "none" }} onMouseOver={(e) => this.handleMouseOver(e, 1)} onMouseOut={(e) => this.handleMouseOut(e, 1)}>



                {this.state.columns.map((idc,i) => {
                  return (
                    <div>


                      <div >
                        {this.state.fields.map((idx) => {
                          return (
                            <div style={{ minHeight: "120px" }} key={i}>
                              <div id="2" style={{ display: "none" }}>
                                <Icon key={`${idx}`} name="trash" onClick={() => this.handleRemove(idx)} style={{ float: "right" }} />
                                <Icon name="copy" style={{ float: "right" }} />
                                <Icon name="cog" style={{ float: "right" }} onClick={this.show('small')} />
                              </div>
                              <h1>Enter Column</h1>


                            </div>
                          )
                        })}</div>




                    </div>
                  )



                }

                )}<br />

              </div>


              {/* ====================================================================================== */}
              <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>Edit Container</Modal.Header>
                <Modal.Content>
                  <Input fluid /><br />

                  <Button secondary onClick={this.close1}>Close</Button>
                  <Button primary >Edit</Button>
                </Modal.Content>


              </Modal>

              <div id="117" className="div" style={{ display: "none" }} onMouseOver={(e) => this.handleMouseOver(e, 1)} onMouseOut={(e) => this.handleMouseOut(e, 1)}>

                {this.state.columns1.map((idc) => {
                  return (
                    <div>

                      <div>
                        {this.state.fields1.map((idx) => {
                          return (
                            <div style={{ minHeight: "120px" }}>
                              <div id="2" >
                             <Icon key={`${idx}`} name="trash" onClick={() => this.handleRemove1(idx)} style={{ float: "right" }} />
                              <Icon name="copy" style={{ float: "right" }} />
                              <Icon name="cog" style={{ float: "right" }} onClick={this.show1('small')} />
                              </div>
                              <Form.TextArea label='About' placeholder='Tell us more about you...' />


                            </div>
                          )
                        })}</div>




                    </div>
                  )



                }

                )}<br />

              </div>
              {/* ===================================================================================== */}

              <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>Edit Container</Modal.Header>
                <Modal.Content>
                  <Input fluid /><br />

                  <Button secondary onClick={this.close}>Close</Button>
                  <Button primary >Edit</Button>
                </Modal.Content>


              </Modal>
              <div id="118" className="div" style={{ display: "none" }} onMouseOver={(e) => this.handleMouseOver(e, 1)} onMouseOut={(e) => this.handleMouseOut(e, 1)}>

                {this.state.columns2.map((idc) => {
                  return (
                    <div>


                      <div>
                        {this.state.fields2.map((idx) => {
                          return (
                            <div style={{ minHeight: "120px" }}>
                               <div className="myDIV" >
                              <Icon key={`${idx}`} name="trash" onClick={() => this.handleRemove2(idx)} style={{ float: "right" }} />
                              <Icon name="copy" style={{ float: "right" }} />
                              <Icon name="cog" style={{ float: "right" }} onClick={this.show2('small')} />
                             </div>
                              <Image src={src1} size='small' centered />


                            </div>
                          )
                        })}</div>




                    </div>
                  )



                }

                )}<br />

              </div>
              {/* ===================================================================================== */}

              <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>Edit Container</Modal.Header>
                <Modal.Content>
                  <Input fluid /><br />

                  <Button secondary onClick={this.close}>Close</Button>
                  <Button primary >Edit</Button>
                </Modal.Content>


              </Modal>
              {/* ===================================================================================== */}
              <div id="119" className="div" style={{ display: "none" }} onMouseOver={(e) => this.handleMouseOver(e, 1)} onMouseOut={(e) => this.handleMouseOut(e, 1)}>

                {this.state.columns3.map((idc,i) => {
                  return (
                    <div>


                      <div>
                        {this.state.fields3.map((idx) => {
                          return (
                            <div style={{ minHeight: "120px" }} key={i}>
                               <div className="myDIV" >
                              <Icon key={`${idx}`} name="trash" onClick={() => this.handleRemove3(idx)} style={{ float: "right" }} />
                              <Icon name="copy" style={{ float: "right" }} />
                              <Icon name="cog" style={{ float: "right" }} onClick={this.show3('small')} />
                              </div>
                              <Form.Group inline>
                                <label>Are you happy and you know it?</label>
                                <Form.Radio
                                  label='Yes'
                                  value='sm'
                                  name='sm'
                                  checked={value === 'sm'}
                                  onChange={this.handleChangeRadio.bind(this,i)}
                                />
                                <Form.Radio
                                  label='No'
                                  value='md'
                                  name='md'
                                  checked={value === 'md'}
                                  onChange={this.handleChangeRadio.bind(this,i)}
                                />

                              </Form.Group>



                            </div>
                          )
                        })}</div>




                    </div>
                  )



                }

                )}<br />

              </div>



              {/* ===================================================================================== */}

              <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>Edit Container</Modal.Header>
                <Modal.Content>
                  <Input fluid /><br />

                  <Button secondary onClick={this.close4}>Close</Button>
                  <Button primary >Edit</Button>
                </Modal.Content>


              </Modal>

              <div id="120" className="div" style={{ display: "none" }} onMouseOver={(e) => this.handleMouseOver(e, 1)} onMouseOut={(e) => this.handleMouseOut(e, 1)}>

                {this.state.columns4.map((idc) => {
                  return (
                    <div>


                      <div>
                        {this.state.fields4.map((idx) => {
                          return (
                            <div style={{ minHeight: "120px" }}>
                               <div className="myDIV" >
                              <Icon key={`${idx}`} name="trash" onClick={() => this.handleRemove4(idx)} style={{ float: "right" }} />
                              <Icon name="copy" style={{ float: "right" }} />
                              <Icon name="cog" style={{ float: "right" }} onClick={this.show4('small')} />
                              </div>
                              <Form.TextArea label='About' placeholder='Tell us more about you...' />




                            </div>
                          )
                        })}</div>




                    </div>
                  )



                }

                )}<br />

              </div>



              {/* ===================================================================================== */}

              <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>Edit Container</Modal.Header>
                <Modal.Content>
                  <Input fluid /><br />

                  <Button secondary onClick={this.close5}>Close</Button>
                  <Button primary >Edit</Button>
                </Modal.Content>


              </Modal>

              <div id="121" className="div" style={{ display: "none" }} onMouseOver={(e) => this.handleMouseOver(e, 1)} onMouseOut={(e) => this.handleMouseOut(e, 1)}>

                {this.state.columns5.map((idc) => {
                  return (
                    <div>




                      <div>
                        {this.state.fields5.map((idx) => {
                          return (
                            <div style={{ minHeight: "120px" }}>
                              <div className="myDIV" >
                              <Icon key={`${idx}`} name="trash" onClick={() => this.handleRemove5(idx)} style={{ float: "right" }} />
                              <Icon name="copy" style={{ float: "right" }} />
                              <Icon name="cog" style={{ float: "right" }} onClick={this.show5('small')} />
                             </div>
                              <br />

                              <Input fluid placeholder="New contract" /><br />



                            </div>
                          )
                        })}</div>




                    </div>
                  )



                }

                )}<br />

              </div>



              {/* ===================================================================================== */}

              <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>Edit Container</Modal.Header>
                <Modal.Content>
                  <Input fluid /><br />

                  <Button secondary onClick={this.close6}>Close</Button>
                  <Button primary >Edit</Button>
                </Modal.Content>


              </Modal>

              <div id="122" className="div" style={{ display: "none" }} onMouseOver={(e) => this.handleMouseOver(e, 1)} onMouseOut={(e) => this.handleMouseOut(e, 1)}>

                {this.state.columns6.map((idc) => {
                  return (
                    <div>



                      <div>
                        {this.state.fields6.map((idx) => {
                          return (
                            <div style={{ minHeight: "120px" }}>
                               <div className="myDIV" >
                              <Icon key={`${idx}`} name="trash" onClick={() => this.handleRemove6(idx)} style={{ float: "right" }} />
                              <Icon name="copy" style={{ float: "right" }} />
                              <Icon name="cog" style={{ float: "right" }} onClick={this.show6('small')} />
                               </div> 
                              <Form.Field >
                                <label>How many times per day do you go to starbucks?</label>
                                <Dropdown
                                  fluid
                                  selection
                                  multiple={false}
                                  search={true}
                                  options={options}
                                  value={this.state.dropdownBox}
                                  placeholder='Select your project status'
                                  onChange={this.handleBoxChange}

                                  disabled={false}
                                  loading={false}
                                />
                              </Form.Field>



                            </div>
                          )
                        })}</div>




                    </div>
                  )



                }

                )}<br />

              </div>

              {/* ===================================================================================== */}

              <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>Edit Container</Modal.Header>
                <Modal.Content>
                  <Input fluid /><br />

                  <Button secondary onClick={this.close7}>Close</Button>
                  <Button primary >Edit</Button>
                </Modal.Content>


              </Modal>

              <div id="123" className="div" style={{ display: "none" }} onMouseOver={(e) => this.handleMouseOver(e, 1)} onMouseOut={(e) => this.handleMouseOut(e, 1)}>

                {this.state.columns7.map((idc) => {
                  return (
                    <div>

                      <div>
                        {this.state.fields7.map((idx) => {
                          return (
                            <div style={{ minHeight: "120px" }}>
                               <div className="myDIV" >
                              <Icon key={`${idx}`} name="trash" onClick={() => this.handleRemove7(idx)} style={{ float: "right" }} />
                              <Icon name="copy" style={{ float: "right" }} />
                              <Icon name="cog" style={{ float: "right" }} onClick={this.show7('small')} />
                              </div>
                              <Form.Group inline>
                                <label>Check all that you are looking for assistance with</label>
                                <Form.Checkbox label='Website' />
                                <Form.Checkbox label='Logo Design' />
                                <Form.Checkbox label='Stationery' />
                              </Form.Group>


                            </div>
                          )
                        })}</div>




                    </div>
                  )



                }

                )}<br />

              </div>

              {/* ===================================================================================== */}

              <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>Edit Container</Modal.Header>
                <Modal.Content>
                  <Input fluid /><br />

                  <Button secondary onClick={this.close8}>Close</Button>
                  <Button primary >Edit</Button>
                </Modal.Content>


              </Modal>

              <div id="124" className="div" style={{ display: "none" }} onMouseOver={(e) => this.handleMouseOver(e, 1)} onMouseOut={(e) => this.handleMouseOut(e, 1)}>

                {this.state.columns8.map((idc) => {
                  return (
                    <div>


                      <div>
                        {this.state.fields8.map((idx) => {
                          return (
                            <div style={{ minHeight: "120px" }}>
                              <div className="myDIV">
                              <Icon key={`${idx}`} name="trash" onClick={() => this.handleRemove8(idx)} style={{ float: "right" }} />
                              <Icon name="copy" style={{ float: "right" }} />
                              <Icon name="cog" style={{ float: "right" }} onClick={this.show8('small')} />
                             </div>
                             <DatePicker fluid
                                selected={this.state.startDate}
                                onChange={this.handleDateChange}
                              />



                            </div>
                          )
                        })}</div>




                    </div>
                  )



                }

                )}<br />

              </div>

              {/* ===================================================================================== */}

              <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>Edit Container</Modal.Header>
                <Modal.Content>
                  <Input fluid /><br />

                  <Button secondary onClick={this.close9}>Close</Button>
                  <Button primary >Edit</Button>
                </Modal.Content>


              </Modal>

              <div id="125" className="div" style={{ display: "none" }} onMouseOver={(e) => this.handleMouseOver(e, 1)} onMouseOut={(e) => this.handleMouseOut(e, 1)}>

                {this.state.columns9.map((idc) => {
                  return (
                    <div>


                      <div>
                        {this.state.fields9.map((idx) => {
                          return (
                            <div style={{ minHeight: "120px" }}>
                              <div className="myDIV">
                              <Icon key={`${idx}`} name="trash" onClick={() => this.handleRemove9(idx)} style={{ float: "right" }} />
                              <Icon name="copy" style={{ float: "right" }} />
                              <Icon name="cog" style={{ float: "right" }} onClick={this.show9('small')} />
                              <Input placeholder="Initials" /> <text>I understand that refunds are not available.</text>
                              </div>


                            </div>
                          )
                        })}</div>




                    </div>
                  )



                }

                )}<br />

              </div>

              {/* ===================================================================================== */}

              <Modal size={size} open={open} onClose={this.close}>
                <Modal.Header>Edit Container</Modal.Header>
                <Modal.Content>
                  <Input fluid /><br />

                  <Button secondary onClick={this.close10}>Close</Button>
                  <Button primary >Edit</Button>
                </Modal.Content>


              </Modal>

              <div id="126" className="div" style={{ display: "none" }} onMouseOver={(e) => this.handleMouseOver(e, 1)} onMouseOut={(e) => this.handleMouseOut(e, 1)}>

                {this.state.columns10.map((idc) => {
                  return (
                    <div>

                      <div>
                        {this.state.fields10.map((idx) => {
                          return (
                            <div style={{ minHeight: "120px" }}>

                              <Form.Field>
                              <div className="myDIV" >
                                <Icon key={`${idx}`} name="trash" onClick={() => this.handleRemove10(idx)} style={{ float: "right" }} />
                                <Icon name="copy" style={{ float: "right" }} />
                                <Icon name="cog" style={{ float: "right" }} onClick={this.show10('small')} />
                               </div>
                                <label>I agree to the terms and condition of this contract</label>

                              </Form.Field>
                              <Form.Group inline>


                                <Input placeholder="First Name" />

                                <Input placeholder="Last Name" />
                                <DatePicker fluid
                                  selected={this.state.startDate}
                                  onChange={this.handleDateChange}
                                />

                              </Form.Group>


                            </div>
                          )
                        })}</div>




                    </div>
                  )



                }

                )}<br />

              </div>

            </Form>

          </Grid.Column>
          <Grid.Column floated='right' width={4}>
            <Segment.Group style={{ background: "white" }} >

              <Segment.Group horizontal >

                <Segment id="seg" style={style1} onClick={(e) => this.handleAdd(e, 115)} >
                  <div id="127" style={{minHeight:"100px",minWidth:"100px",paddingTop:"15px"}} onMouseOver={(e) => this.handleSegOver(e,126)} onMouseOut={(e) => this.handleSegOut(e,126)}>
                  <Icon name="columns" size="big" /><br /><br />



                  <text>Columns</text>
                  </div>
                </Segment>
            
                <Segment style={style1} onClick={(e) => this.handleAdd1(e, 117)}>
                <div id="127" style={{minHeight:"100px",minWidth:"100px",paddingTop:"15px"}} onMouseOver={(e) => this.handleSegOver(e,126)} onMouseOut={(e) => this.handleSegOut(e,126)}>
               
                  <Icon name="paragraph" size="big" /><br /><br />
                  Text Box
                  </div>
                  </Segment>
              </Segment.Group>

              <Segment.Group horizontal>

                <Segment style={style1} onClick={(e) => this.handleAdd2(e, 118)}>
                <div id="127" style={{minHeight:"100px",minWidth:"100px",paddingTop:"15px"}} onMouseOver={(e) => this.handleSegOver(e,126)} onMouseOut={(e) => this.handleSegOut(e,126)}>
               
                  <Icon name="images" size="big" /><br /><br />
                  Images
                  </div>
                  </Segment>
                <Segment style={style1} onClick={(e) => this.handleAdd3(e, 119)}>
                <div id="127" style={{minHeight:"100px",minWidth:"100px",paddingTop:"15px"}} onMouseOver={(e) => this.handleSegOver(e,126)} onMouseOut={(e) => this.handleSegOut(e,126)}>
               
                  <Icon name="question" size="big" /><br /><br />
                  Yes/No Question
                  </div>
                  </Segment>
              </Segment.Group>
              <Segment.Group horizontal>

                <Segment style={style1} onClick={(e) => this.handleAdd4(e, 120)}>
                <div id="127" style={{minHeight:"100px",minWidth:"100px",paddingTop:"15px"}} onMouseOver={(e) => this.handleSegOver(e,126)} onMouseOut={(e) => this.handleSegOut(e,126)}>
               
                  <Icon name="edit" size="big" /><br /><br />
                  Free Response
                  </div>
                  </Segment>
                <Segment style={style1} onClick={(e) => this.handleAdd5(e, 121)}>
                <div id="127" style={{minHeight:"100px",minWidth:"100px",paddingTop:"15px"}} onMouseOver={(e) => this.handleSegOver(e,126)} onMouseOut={(e) => this.handleSegOut(e,126)}>
               
                  <Icon name="pencil" size="big" /><br /><br />
                  Short Answer
                  </div>
                  </Segment>
              </Segment.Group>
              <Segment.Group horizontal>

                <Segment style={style1} onClick={(e) => this.handleAdd6(e, 122)}>
                <div id="127" style={{minHeight:"100px",minWidth:"100px",paddingTop:"15px"}} onMouseOver={(e) => this.handleSegOver(e,126)} onMouseOut={(e) => this.handleSegOut(e,126)}>
               
                  <Icon name="sidebar" size="big" /><br /><br />
                  Dropdown Box
                  </div>
                  </Segment>
                <Segment style={style1} onClick={(e) => this.handleAdd7(e, 123)}>
                <div id="127" style={{minHeight:"100px",minWidth:"100px",paddingTop:"15px"}} onMouseOver={(e) => this.handleSegOver(e,126)} onMouseOut={(e) => this.handleSegOut(e,126)}>
               
                  <Icon name="check square outline" size="big" /><br /><br />
                  Checkboxes
                  </div>
                  </Segment>
              </Segment.Group>
              <Segment.Group horizontal>

                <Segment style={style1} onClick={(e) => this.handleAdd8(e, 124)}>
                <div id="127" style={{minHeight:"100px",minWidth:"100px",paddingTop:"15px"}} onMouseOver={(e) => this.handleSegOver(e,126)} onMouseOut={(e) => this.handleSegOut(e,126)}>
               
                  <Icon name="calendar" size="big" /><br /><br />
                  Date Select
                  </div>
                  </Segment>
                <Segment style={style1} onClick={(e) => this.handleAdd9(e, 125)}>
                <div id="127" style={{minHeight:"100px",minWidth:"100px",paddingTop:"15px"}} onMouseOver={(e) => this.handleSegOver(e,126)} onMouseOut={(e) => this.handleSegOut(e,126)}>
               
                  <Icon name="info" size="big" /><br /><br />
                  Initials
                  </div>
                  </Segment>
              </Segment.Group>
              <Segment.Group horizontal>

                <Segment style={style1} onClick={(e) => this.handleAdd10(e, 126)}>
                <div id="127" style={{minHeight:"100px",minWidth:"100px",paddingTop:"15px"}} onMouseOver={(e) => this.handleSegOver(e,126)} onMouseOut={(e) => this.handleSegOut(e,126)}>
               
                  <Icon name="paint brush" size="big" /><br /><br />
                  Signature Area
                  </div>
                  </Segment>

              </Segment.Group>
            </Segment.Group>
          </Grid.Column>
        </Grid>
      </div>
    )
  }

}

export default FormBuilders;
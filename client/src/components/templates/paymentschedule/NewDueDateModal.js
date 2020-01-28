import React, { Component, useState } from 'react'


import { Button, Dropdown, Divider, Form, Input, Select, Label, Icon ,Modal,} from 'semantic-ui-react'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]
class NewDueDateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submenu: [],
            showChild: true,
            fields: [{ value: '' }],
            columns: [{ value: '' }],
            inputValues: {},
            open: false
        }
    }

    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleShow = (show) => {
        this.setState({
            show: show
        })
    }

    resetField = () => {
        this.setState({

            tag: '',

        })
    }

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

    handleShowReminder = (e, id) => {
        id = id + 1
        if (document.getElementById(id).style.display = "none") {
            document.getElementById(id).style.display = "block";
            document.getElementById(id + 1).style.display = "none";
        }

    }
    handleAdd = (e, id) => {


        let values = [...this.state.fields];
        values.push({ value: null });
        this.setState({
            fields: values
        })





    }

    handleRemove = (i) => {
        let values = [...this.state.fields];
        values.splice(i, 1);
        this.setState({
            fields: values
        })
    }

    handleDelete = (i) => {
        let cvalues = [...this.state.columns];
        cvalues.splice(i, 1);
        this.setState({
            columns: cvalues
        })
    }

    handleColumn = () => {
        let cvalues = [...this.state.columns];
        cvalues.push({ value: null });
        this.setState({
            columns: cvalues

        })
    }


    // handleSubmit = (e) => {

    //     e.preventDefault();

    //     let addTag = {
    //         tag: this.state.tag,

    //     }

    //     this.props.addTag(addTag, this.props.history);
    //     this.resetField();
    //     this.handleShow(false);

    // }

    handleDueDateRelative = (e, id) => {
        id = id + 1

        document.getElementById(id).style.display = "block";
        document.getElementById(id + 1).style.display = "none";

    }
    handleDueDateFixed = (e, id) => {
        id = id + 2

        document.getElementById(id).style.display = "block";
        document.getElementById(id - 1).style.display = "none";

    }

    handleAmountPercentage = (e, id) => {
        id = id + 2

        document.getElementById(id).style.display = "block";
        document.getElementById(id - 1).style.display = "none";

    }
    handleAmountFixed = (e, id) => {
        id = id + 1

        document.getElementById(id).style.display = "block";
        document.getElementById(id + 1).style.display = "none";

    }

    render() {

        const { open, size } = this.state;
        // const list = this.state.createproject.map(item => {
        //     return <h1>{item.dub_project}</h1>
        // })
        //    {if(projectTitle===this.state.projectTitle&&client===this.state.client&&status===this.state.status)?}
        return (

            <div style={{ width: "500px" }} >
                <>


                    {/* <Button color='green' onClick={() => this.handleShow(true)}>New Project</Button> */}
                    <Button color='#eee' style={{ border: "1px solid #aaa" }} onClick={this.show('small')}>New Due Date</Button>
                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>    Add Scheduled Payment</Modal.Header>
                        <Modal.Content>
                    
                            <div >

                                <Form onSubmit={this.handleSubmit} >
                                    <Form.Field>
                                        <label>Due Date</label>
                                        <div id="111"></div>
                                        <Button onClick={(e) => this.handleDueDateRelative(e, 111)}>Relative</Button><Button onClick={(e) => this.handleDueDateFixed(e, 111)}>Fixed</Button><br /><br />

                                        <div id="113" style={{ display: "none" }}>
                                            <input type="date" />
                                        </div>

                                        <div id="112" style={{ display: "none" }}>

                                            <Form.Group inline>
                                                <Form.Field>
                                                    <input type="number" style={{ width: "60px" }} value="2" />
                                                </Form.Field>
                                                <Form.Field
                                                    control={Select}
                                                    options={genderOptions}

                                                    placeholder='Gender'
                                                    search
                                                    searchInput={{ id: 'form-select-control-gender' }}
                                                />
                                                <Form.Field
                                                    control={Select}
                                                    options={genderOptions}

                                                    placeholder='Gender'
                                                    search
                                                    searchInput={{ id: 'form-select-control-gender' }}
                                                />

                                            </Form.Group>
                                        </div>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Amount</label>
                                        <Button onClick={(e) => this.handleAmountFixed(e, 113)}>Fixed</Button><Button onClick={(e) => this.handleAmountPercentage(e, 113)} >Percentage</Button><br /><br />
                                        <div id="114" style={{ display: "none" }}>
                                            <input type="text" value="$0.00" />
                                        </div>
                                        <div id="115" style={{ display: "none" }}>
                                            <input type="number" placeholder="% should be less than 100" />
                                        </div>

                                    </Form.Field>


                                    <Form.Group inline>
                                        <Form.Field >
                                            <label>Reminder</label>
                                            <div id="117" style={{ display: "inline" }}>
                                                <Button onClick={(e) => this.handleShowReminder(e, 115)}>Add Reminder</Button>
                                            </div>

                                        </Form.Field>
                                    </Form.Group>

                                    <Form.Field>
                                        <div id="116" style={{ display: "none" }}>

                                            {this.state.columns.map((idc) => {
                                                return (
                                                    <div>

                                                        {/* <text>fdffgfgfg</text> <Icon key={`${idc}`} name="trash" style={{ paddingLeft: "110px" }} onClick={() => this.handleDelete(idc)} /> <br /><br /> */}
                                                        {/* <Button style={{ width: "180px", border: "1px solid grey", background: "#fff" }} onClick={() => this.handleAdd()}>
                                        +</Button> */}



                                                        <form className="reg" noValidate>

                                                            <div>
                                                                {this.state.fields.map((idx) => {
                                                                    return (
                                                                        <div>

                                                                            <hr />
                                                                            <Form>
                                                                                <Form.Field>
                                                                                    <label>Set Date</label> <br/> 
                                                                                    <Button>Relative</Button><Button>Fixed</Button><Icon key={`${idx}`} name="trash" onClick={() => this.handleRemove(idx)} style={{float:"right"}} /><br /><br />
                                                                                    <input type="date" />
                                                                                </Form.Field>

                                                                                <Form.Field
                                                                                    control={Select}
                                                                                    options={genderOptions}
                                                                                    label={{ children: 'Template:', htmlFor: 'form-select-control-gender' }}
                                                                                    placeholder='Gender'
                                                                                    search
                                                                                    searchInput={{ id: 'form-select-control-gender' }}
                                                                                /></Form>
                                                                            &nbsp;&nbsp;
                                                 

                                                                            <br />

                                                                        </div>
                                                                    )
                                                                })}</div>
                                                        </form>



                                                    </div>
                                                )



                                            }

                                            )}<br />
                                            <Button onClick={(e) => this.handleAdd(e, 115)}>Add Reminder</Button>
                                        </div>


                                    </Form.Field>





                                    <hr />

                                
                            <Button primary type="submit" style={{ float: "right" }}>
                                        Apply
                            </Button>

                                </Form>

                                <Button secondary  onClick={this.close} style={{ float: "right" }}>
                                        Cancel
                            </Button>&nbsp;
                            </div>






                            </Modal.Content>
                    </Modal>
                </>



            </div>

        )
    }
}




NewDueDateModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    //addTag: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//     project: state.project,
//     errors: state.errors
// });

//export default withStyles(styles)(Company);
export default connect(null)(NewDueDateModal);


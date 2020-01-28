

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditTaskEvent from './EditTaskEvent'
import { Button, Input, Icon, Grid, Dropdown } from 'semantic-ui-react';
//import MenuList from './MenuList';
//import { addMenu } from '../authentication';

const options = [
    { key: 'copy', text: 'Copy', value: 'copy' },
    { key: 'delete', text: 'Dlete', value: 'delete' },

]

class AddSubMenu1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submenu: [],
            showChild: true,
            fields: [{ value: '' }],
            columns: [{ value: '' }],
            inputValues: {},
        }
        //this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChangeValue(event) {
        console.log(event);
        this.setState({ [event.target.name]: event.target.value })
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


    resetField = () => {
        this.setState({ subMenu: '' });
    }

    handleChange = (e, id) => {
        id = id + 1
        if (document.getElementById(id).style.display == "none") {
            document.getElementById(id).style.display = "block";
        }
        else {
            document.getElementById(id).style.display = "none";
        }
    }

    handleChange = (i, event) => {
        let values = [...this.state.fields];
        values[i].value = event.target.value;
        this.setState({
            fields: values
        })
    }


    handleAdd = () => {
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

    render() {
        const { name, onChange } = this.props;

        return (

            <div style={{ height: "600px", background: "#eee", padding: "20px" }}>

                <Button.Group style={{ float: "right" }}>

                    <Dropdown
                        className='button icon'
                        icon="angle down"
                        options={options}
                        trigger={<React.Fragment />}
                        style={{ float: "right", background: "white", fontSize: "21px", background: "#eee" }}

                    />
                </Button.Group>



                <h4>sdfsdfdf</h4>



                <br /><br />
                <Grid>
                    {this.state.columns.map((idc) => {
                        return (
                            <div>
                                <Grid.Column>
                                    <text>fdffgfgfg</text> <Icon key={`${idc}`} name="trash" style={{ paddingLeft: "110px" }} onClick={() => this.handleDelete(idc)} /> <br /><br />
                                    <Button style={{ width: "180px", border: "1px solid grey", background: "#fff" }} onClick={() => this.handleAdd()}>
                                        +
                </Button>

                                    <br /><br />
                                    <form className="reg" noValidate>

                                        <div>
                                            {this.state.fields.map((idx) => {
                                                return (
                                                    <div>
                                                        <Input
                                                            placeholder="Add "
                                                        //id={name}
                                                        //onChange={this.props.onChange}
                                                        //onChange={(ev) => this.handleInputChangeValue(ev)}
                                                        //onBlur={(ev) => this.handleAddValue(ev)}

                                                        />
                                                        &nbsp;&nbsp;
                                                       <Icon key={`${idx}`} name="trash" onClick={() => this.handleRemove(idx)} />

                                                        <br /><br />
                                                    </div>
                                                )
                                            })}</div>
                                    </form>

                                </Grid.Column>

                            </div>
                        )



                    }

                    )}


                    {/* <Button onClick={() => this.handleAdd()} style={{width:"180px",border:"1px solid grey"}}>
            +
      </Button> */}
                    <text onClick={() => this.handleColumn()}><i><b>New</b> Column</i></text>
                </Grid>

                <br />
                <Input name="add" /> &nbsp;<Button secondary ><Icon inverted name="check" /></Button><Button secondary><Icon inverted name="remove" /> </Button>
                <br /><br />
                <div style={{ width: "180px", height: "50px", background: "white", border: "1px solid #ddd", padding: "8px" }}>
                    <Icon name='check circle outline' />
                    <Button style={{background:"#fff"}}><EditTaskEvent/></Button>
                    <Button.Group style={{ float: "right" }}>

                        <Dropdown
                            className='button icon'
                            icon="angle down"
                            options={options}
                            trigger={<React.Fragment />}
                            style={{ float: "right", background: "white",}}

                        />
                    </Button.Group>
                </div>
            </div>
        )
    }
}

AddSubMenu1.propTypes = {
    classes: PropTypes.object.isRequired,
    addMenu: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(AddSubMenu1)

import React, { Component, useState } from 'react'

import { Dropdown, Divider, Icon, Popup, Button, Modal, Form, } from 'semantic-ui-react'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addSource } from './addsource/AddSourceApi'
import { SketchPicker } from 'react-color';

class AddSourceModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source_name: '',
            color: '',
            open: false

        }
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    handleCheck = (e, id) => {

        if ((document.getElementById(id).style.display == "block")) { document.getElementById(id).style.display = "none"; }

        else if ((document.getElementById(id).style.display == "none")) {
            document.getElementById(id).style.display = "block";

        }
    }

    handleChange = (e) => {
        console.log("sgfgfdgfdg")
        this.setState({ [e.target.name]: e.target.value })
    }
    handleShow = (show) => {
        this.setState({
            show: show
        })
    }



    resetField = () => {
        this.setState({
            source_name: '',
            color: ','
        });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        let addSource = {

            source_name: this.state.source_name,
            color: this.state.color,

        }

        this.props.addSource(addSource, this.props.history);
        this.resetField();
        this.handleShow(false);
    }


    render() {
        const { open, size } = this.state;
        return (

            <div>
                <>

                    <div style={{ width: "80px", height: "15px" }} onClick={this.show('small')}>Add Source</div>

                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header>  Add a New Source</Modal.Header>
                        <Modal.Content>



                            <Form onSubmit={this.handleSubmit} >
                                <Form.Field>
                                    <label>Source name*</label>
                                    <input name="title" placeholder='Enter a source name' name="source_name" value={this.state.source_name} onChange={this.handleChange} />
                                </Form.Field>


                                <Form.Field>

                                    <label><b>Select color*</b></label>
                                    <br />
                                    <Icon name="stop" size="big" style={{ color: "red" }} />
                                    <Icon name="stop" size="big" style={{ color: "yellow" }} />
                                    <Icon name="stop" size="big" style={{ color: "pink" }} />
                                    <Icon name="stop" size="big" style={{ color: "arange" }} />
                                    <Icon name="stop" size="big" style={{ color: "blue" }} />
                                    <Icon name="stop" size="big" style={{ color: "green" }} /><br />
                                    <Icon name="stop" size="big" style={{ color: "grey" }} />
                                    <Icon name="stop" size="big" style={{ color: "teal" }} />
                                    <Icon name="stop" size="big" style={{ color: "yellow" }} />
                                    <Icon name="stop" size="big" style={{ color: "pink" }} />
                                    <Icon name="check square" size="big" style={{ color: "red" }} />




                                    <Popup
                                        trigger={
                                            <Icon name="plus square outline" size="big" content='Activate doomsday device' />
                                        }

                                        content={<div>
                                            <b>Custom color picker</b> <br />
                                            <SketchPicker /><br />
                                            <Button type="submit">Add</Button><br />
                                            <Divider></Divider>
                                            <text><b>Applied color</b></text><br /><br />
                                            <Icon name="check square" size="big" style={{ color: "red" }} />
                                            <Divider></Divider>
                                            <b style={{ textAlign: "center" }}>Use this color</b>
                                        </div>}
                                        on='click'
                                        position='right center'
                                        size='mini'
                                    />


                                </Form.Field>


                                <Divider></Divider>



                                <Button primary disabled={!(this.state.source_name)} type="submit" style={{ float: "right", marginRight: "30px", background: "#e9768d" }}>
                                    Create
                            </Button>

                            </Form>
                            <Button secondary onClick={this.close} style={{ float: "right" }}>
                                Cancel
                            </Button>&nbsp;<br /><br />
                        </Modal.Content>
                    </Modal>
                </>
            </div>

        )
    }
}




AddSourceModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    addSource: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    source: state.source,
    errors: state.errors
});

//export default withStyles(styles)(Company);
export default connect(mapStateToProps, { addSource })(AddSourceModal);


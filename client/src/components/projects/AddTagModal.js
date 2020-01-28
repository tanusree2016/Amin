import React, { Component} from 'react'


import { Modal, Form, Button,Input } from 'semantic-ui-react'

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addTag } from './customize/AddTagApi'

class AddTagModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: '',
            color:'',
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

    handleSubmit = (e) => {

        e.preventDefault();

        let addTag = {
            tag: this.state.tag,

        }

        this.props.addTag(addTag, this.props.history);
        this.resetField();
        this.handleShow(false);

    }

    render() {
        const { size , open} = this.state
        // const list = this.state.createproject.map(item => {
        //     return <h1>{item.dub_project}</h1>
        // })
        //    {if(projectTitle===this.state.projectTitle&&client===this.state.client&&status===this.state.status)?}
        return (

            <div>
                <>
                    <Button onClick={this.show('small')}>Add Tag</Button>
                    <Modal size={size} open={open} onClose={this.close}>
                        <Modal.Header> Add Tag</Modal.Header>
                        <Modal.Content>

                            <Form onSubmit={this.handleSubmit} >
                            <Form.Group inline>
                                <Form.Field>
                                    <label>Tag name</label>
                                    <input placeholder="Tag name" name="tag" value={this.state.tag} onChange={this.handleChange} />
                                  </Form.Field>

                               
                             
                                     <input type="color" name="color" value={this.state.color} onChange={this.handleChange} />
                              

                                </Form.Group>



                          
                            <Button primary disabled={!(this.state.tag)} type="submit" style={{ float: "right" }}>
                                Save
                            </Button>

                            </Form>
                            <Button secondary onClick={this.close} style={{ float: "right" }}>
                                Cancel
                            </Button>&nbsp;
                        </Modal.Content>

                  <br/>
                </Modal>
                </>

            </div >

        )
    }
}




AddTagModal.propTypes = {
    //classes: PropTypes.object.isRequired,
    addTag: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//     project: state.project,
//     errors: state.errors
// });

//export default withStyles(styles)(Company);
export default connect(null, { addTag })(AddTagModal);


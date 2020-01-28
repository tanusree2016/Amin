import React, { Component, useState } from 'react'
import { Button, Modal, Form, ButtonToolbar, OverlayTrigger, Col, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Divider } from 'semantic-ui-react'
import AddDate from './AddDate'

function Modals() {
    const [show, setShow] = useState(false);




    return (
        <div>
            <>
                {/* <Button color ="green" onClick={() => setShow(true)}>
        New Project
      </Button> */}
                <Button color='green' onClick={() => setShow(true)}>New Project</Button>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                    
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Custom Modal Styling
                  </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address*</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control as="select">
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Or</Form.Label><br />
                                        <Button variant="light">Create New Client</Button>
                                    </Form.Group>
                                </Form.Row>

                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status*</Form.Label>
                                <Form.Label style={{ float: "right" }}> <ButtonToolbar>
                                    {['top'].map(placement => (
                                        <OverlayTrigger
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Tooltip id={`tooltip-${placement}`}>
                                                    Tooltip on <strong>{placement}</strong>.
                                                 </Tooltip>
                                            }
                                        >
                                            <text style={{ color: "green" }}>What is this?</text>
                                        </OverlayTrigger>
                                    ))}
                                </ButtonToolbar></Form.Label>
                               
                                        <Form.Label>State</Form.Label>
                                        <Form.Control as="select">
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </Form.Control>
                                
                            </Form.Group>
                            <Divider horizontal>Optional</Divider>



                            <Form.Group>
                                <Form.Label>Tags</Form.Label>
                                <Form.Label style={{ float: "right" }}> <ButtonToolbar>
                                    {['top'].map(placement => (
                                        <OverlayTrigger
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Tooltip id={`tooltip-${placement}`}>
                                                    Tooltip on <strong>{placement}</strong>.
                                                 </Tooltip>
                                            }
                                        >
                                            <text style={{ color: "green" }}>What is this?</text>
                                        </OverlayTrigger>
                                    ))}
                                </ButtonToolbar></Form.Label>
                                <Form.Control as="select">
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control type="email" placeholder="Add some notes" />
                            </Form.Group>

                            <AddDate />
                            <br />

                            <Button variant="secondary" type="submit" style={{ float: "right" }}>
                                Cancel
                            </Button>&nbsp;
                            <Button variant="primary" type="submit" style={{ float: "right", marginRight: "30px" }}>
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>

        </div>
    )
}


export default Modals;

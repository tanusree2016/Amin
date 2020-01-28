import React, { Component } from 'react'
import { Button, Modal, Dropdown } from 'semantic-ui-react'
const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit'},
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
]

class ModalExampleSize extends Component {
    state = { open: false }

    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    render() {
        const { open, size } = this.state

        return (
            <div>

                <div onClick={this.show('large')}>
                    <text>New Contact</text>
                </div>


                <Modal size={size} open={open} onClose={this.close}>
                    <Modal.Header>Preview:  New Sub Agreement
          <Button.Group color='grey' style={{ float: "right" }}>
                            <Button>Add</Button>
                            <Dropdown
                                className='button icon'
                                floating
                                options={options}
                                trigger={<React.Fragment />}
                            />
                        </Button.Group><Button style={{ float: "right" }}>Cancel</Button>
                        <Button style={{ float: "right" }}>Copy link</Button>
                        <Button style={{ float: "right" }}>Open</Button>
                        <Button style={{ float: "right" }}>Send</Button>
                        <Button style={{ float: "right" }}>Edit</Button>
                        <Button style={{ float: "right" }}>X</Button>

                    </Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete your account</p>
                    </Modal.Content>
                    <Modal.Header></Modal.Header>
                    <Modal.Header>
                        
          <Button.Group color='grey' style={{ float: "right" }}>
                            <Button>Add</Button>
                            <Dropdown
                                className='button icon'
                                floating
                                options={options}
                                trigger={<React.Fragment />}
                            />
                        </Button.Group><Button style={{ float: "right" }}>Cancel</Button>
                        <Button style={{ float: "right" }}>Copy link</Button>
                        <Button style={{ float: "right" }}>Open</Button>
                        <Button style={{ float: "right" }}>Send</Button>
                        <Button style={{ float: "right" }}>Edit</Button>
                        <Button style={{ float: "right" }}>X</Button>
<br/>
                    </Modal.Header>
                </Modal>
            </div>
        )
    }
}

export default ModalExampleSize

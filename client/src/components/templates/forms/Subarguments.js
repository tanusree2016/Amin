import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import QuesTabs from './QuesTabs'
export default class Contacts extends Component {
    render() {
        return (
            <div style={{ padding: "10px" }}>
                <div style={{ height: "60px", padding: "10px", background: "rgb(240, 114, 135)", borderRadius: "10px 10px 0 0" }}>
                    <Button style={{ float: "right", }}>Save as Template </Button>
                    <text style={{ float: "right" }}></text>

                    <text style={{ float: "right" }}></text>
                    <text style={{ float: "right" }}></text><text style={{ color: "white" }}><h3>Create Form</h3></text>

                </div>
                <div style={{ background: "white" }}>
                    <QuesTabs />
                 
                </div>

            </div>
        )
    }
}
import React, { Component } from 'react'
import { Tab, Grid, Segment, Input } from 'semantic-ui-react'
import ReactFormBuilder from './ReactFormBuilder'
import SettingsTabs from './SettingsTabs'



class Tabs extends Component {
    state = {}

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const panes = [
            {
                menuItem: 'Form',
                render: () => <div attached={false} style={{ width: "1069px", padding: "20px", marginLeft: "-450px" }}>
                    <div>
                        <ReactFormBuilder />

                    </div>

                </div>
            },
            {
                menuItem: 'Settings',
                render: () => <div attached={false} style={{ width: "1000px", marginLeft: "-450px" ,padding:"20px"}}>
                    <SettingsTabs />

                </div>,
            },

        ]
        const { value } = this.state
        return (
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} style={{ width: "150px", marginLeft: "450px" }} />
        )
    }
}

export default Tabs








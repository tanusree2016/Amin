import React, { Component } from 'react'
import { Tab, Grid, Segment, Input } from 'semantic-ui-react'
import SideTabs from './SideTabs'
import DiscountSortTable from './DiscountSortTable'




class PackageTabs extends Component {
    state = {}

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const panes = [
            {
                menuItem: 'Packages',
                render: () => <div attached={false} style={{ width: "1069px", padding: "20px", marginLeft: "-450px" }}>
                    <div>
                        <SideTabs />

                    </div>

                </div>
            },
            {
                menuItem: 'Discounts',
                render: () => <div attached={false} style={{ width: "1000px", marginLeft: "-450px" }}>
                    <DiscountSortTable />
                </div>,
            },

        ]
        const { value } = this.state
        return (
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} style={{ width: "182px", marginLeft: "450px" }} />
        )
    }
}

export default PackageTabs








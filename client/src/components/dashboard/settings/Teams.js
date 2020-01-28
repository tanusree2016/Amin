import React, { Component } from 'react'
import NewTeamModal from './NewTeamModal'
export default class Teams extends Component {
    render() {
        return (
            <div>
                <text style={{ fontSize: "25px" }}>Teams</text><br />
                <text>A group of users that you can easily assign to projects.</text><br /><br />

                <text>You currently have no teams</text><br /><br />
                <NewTeamModal /><br /><br />
                <text>You have not created any teams yet!</text>
            </div>
        )
    }
}
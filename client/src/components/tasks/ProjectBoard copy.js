import React from 'react'
import { Button, Dropdown } from 'semantic-ui-react'

const options = [
    { key: 'copy', icon: 'copy', text: 'Copy', value: 'copy' },
    { key: 'delete', icon: 'delete', text: 'Delete', value: 'delete' },

]

const ProjectBoard = () => (

    <div style={{ height: "160px", border: "1px solid #ccc", borderRadius: "5px", padding: "30px" }}>
        <text>sfdsfd</text><br /><br/>
        <text style={{fontSize:"12px"}}><b>Project : sfffgfd</b></text><br/>
        <text style={{fontSize:"12px"}}><b>Privacy : sfffgfd</b></text>
        <Button.Group style={{ float: "right" }}>

            <Dropdown
                className='button icon'
                icon="angle down"
                options={options}
                trigger={<React.Fragment />}
                style={{ float: "right", background: "white", fontSize: "21px" }}

            />
        </Button.Group>
    </div>


)

export default ProjectBoard

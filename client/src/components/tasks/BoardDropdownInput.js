import React from 'react'
import { Dropdown, Button } from 'semantic-ui-react'

const friendOptions = [
    {
        key: 'allboards',
        text: 'All Boards',
        value: 'All Boards',

    },
    {
        key: 'projectboards',
        text: 'Project Boards',
        value: 'Project Boards',

    },
    {
        key: 'generalboards',
        text: 'General Boards',
        value: 'General Boards',

    },

]

const DropdownInput = () => (
    <span>
        <text >
          View :   <Dropdown
                inline
                options={friendOptions}
                defaultValue={friendOptions[0].value}
            />
        </text>


    </span>
)

export default DropdownInput

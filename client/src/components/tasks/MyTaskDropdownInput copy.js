import React from 'react'
import { Dropdown, Button } from 'semantic-ui-react'

const friendOptions = [
    {
        key: 'all',
        text: 'All',
        value: 'All',

    },
    {
        key: 'complete',
        text: 'Complete',
        value: 'Complete',

    },
    {
        key: 'incomplete',
        text: 'Incomplete',
        value: 'Incomplete',

    },

]

const DropdownInput = () => (
    <span>
        <Button style={{ width:"100px" }} size="mini">
            <Dropdown
                inline
                options={friendOptions}
                defaultValue={friendOptions[0].value}
            />
        </Button>


    </span>
)

export default DropdownInput

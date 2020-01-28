import React from 'react'
import { Dropdown, Button } from 'semantic-ui-react'

const friendOptions = [
    {
        key: 'all',
        text: 'All',
        value: 'All',

    },
    {
        key: 'alltasks',
        text: 'All Tasks',
        value: 'All Tasks',

    },
 

]

const DropdownInput = () => (
    <span>
        <Button size="mini">
            <Dropdown
                inline
                options={friendOptions}
                defaultValue={friendOptions[0].value}
            />
        </Button>


    </span>
)

export default DropdownInput

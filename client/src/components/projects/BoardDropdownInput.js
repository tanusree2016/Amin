import React from 'react'
import { Dropdown, Button, Divider } from 'semantic-ui-react'

const tagOptions = [
    {
      key: 'Important',
      text: 'Important',
      value: 'Important',
      label: { color: 'red', empty: true, circular: true },
    },
    {
      key: 'Announcement',
      text: 'Announcement',
      value: 'Announcement',
      label: { color: 'blue', empty: true, circular: true },
    },
    {
      key: 'Cannot Fix',
      text: 'Cannot Fix',
      value: 'Cannot Fix',
      label: { color: 'black', empty: true, circular: true },
    },
    
  
  ]
  
const DropdownInput = () => (
    <span>
        <Button style={{ border: "1px solid grey", borderRadius: "5px", padding: "0px", height: "30px",width:"160px" }}>
          Jobs :   <Dropdown
                inline
                labeled
                options={tagOptions}
                defaultValue={tagOptions[0].value}
            >
 <Dropdown.Menu>
     
     
      <Dropdown.Header content='Jobs' />
      <Dropdown.Menu scrolling>
        {tagOptions.map((option) => (
          <Dropdown.Item key={option.value} {...option} />
        ))}
      </Dropdown.Menu>
      <Divider></Divider>
      <Dropdown.Header content='Leads' />
      <Dropdown.Menu scrolling>
        {tagOptions.map((option) => (
          <Dropdown.Item key={option.value} {...option} />
        ))}
      </Dropdown.Menu>
    </Dropdown.Menu>

            </Dropdown>
         
        </Button>


    </span>
)

export default DropdownInput

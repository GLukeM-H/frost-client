import React from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
 } from 'reactstrap';

class AppTools extends React.Component {
 
    render(){
        return (
            <Dropdown nav isOpen={true} toggle={() => {return}}>
                <DropdownToggle nav caret>
                    Tools
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Header and lots and lots and lots and lots of text</DropdownItem>
                    <DropdownItem disabled>Action</DropdownItem>
                    <DropdownItem>Another Action</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }
}

export default AppTools;
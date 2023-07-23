import React from 'react';
import {Menu} from 'antd';

const Navbar = () => {
    return (
        <Menu mode="horizontal">
            <Menu.Item key="home">
                Home
            </Menu.Item>
            <Menu.Item key="catalog">
                Catalog
            </Menu.Item>
            <Menu.Item key="contacts">
                Contacts
            </Menu.Item>
            <Menu.Item key="about" style={{marginLeft: 'auto'}}>
                About
            </Menu.Item>
        </Menu>
    )
}

export {Navbar};
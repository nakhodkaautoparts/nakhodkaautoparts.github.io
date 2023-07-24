import React from 'react';
import {Menu, MenuProps} from 'antd';

const items: MenuProps['items'] = [
    {
        key: 'home',
        label: 'Home',
    },
    {
        key: 'catalog',
        label: 'Catalog',
    },
    {
        key: 'contacts',
        label: 'Contacts',
    },
    {
        key: 'about',
        label: 'About',
        style: {marginLeft: 'auto'}
    }
];

const Navbar = () => {
    return (
        <Menu mode="horizontal" style={{position: 'fixed', width: '100%'}} items={items}/>
    )
}

export {Navbar};
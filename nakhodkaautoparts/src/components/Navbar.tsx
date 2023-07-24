import React from 'react';
import {Menu, MenuProps} from 'antd';
import {Link} from "react-router-dom";

const items: MenuProps['items'] = [
    {
        key: 'home',
        label: <Link to="/">Home</Link>,
    },
    {
        key: 'catalog',
        label: <Link to="/catalog">Catalog</Link>,
    },
    {
        key: 'contact',
        label: <Link to="/contact">Contact</Link>,
    },
    {
        key: 'about',
        label: <Link to="/about">About</Link>,
        style: {marginLeft: 'auto'}
    }
];

const Navbar = () => {
    return (
        <Menu mode="horizontal" items={items}/>
    )
}

export {Navbar};
import React from 'react';
import {Menu, MenuProps} from 'antd';
import {Link, useLocation} from "react-router-dom";

const items: MenuProps['items'] = [
    {
        key: 'home',
        label: <Link to="/">Главная</Link>,
    },
    {
        key: 'catalog',
        label: <Link to="/catalog">Запчасти</Link>,
    },
    {
        key: 'contact',
        label: <Link to="/contact">Связаться с нами</Link>,
        style: {marginLeft: 'auto'}
    }
];

const Navbar = () => {
    const location = useLocation();
    const currentPage = location.pathname.slice(1) || 'home';
    return (
        <Menu mode="horizontal" items={items} selectedKeys={[currentPage]}/>
    )
}

export {Navbar};
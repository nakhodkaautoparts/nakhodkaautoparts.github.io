import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { Header } from "antd/es/layout/layout";
import { Navbar } from "./components/Navbar";
import { Layout } from "antd";
import ReactGA from "react-ga4";

const PATHS_TO_PAGES = [
    {
        path: '/',
        title: 'Home'
    },
    {
        path: '/catalog',
        title: 'Catalog'
    },
    {
        path: '/contact',
        title: 'Contact'
    },
];

function App() {
    const [isSet, setIsSet] = useState(false);
    const location = useLocation();
    const isProd = window.location.protocol !== 'http:';

    useEffect(() => {
        if (isProd && !isSet && process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
            ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
            setIsSet(true);
        }
    }, [isSet, isProd]);

    useEffect(() => {
        if (isProd && isSet) {
            ReactGA.send({
                hitType: "pageview",
                page: location.pathname,
                title: PATHS_TO_PAGES.find(path => path.path === location.pathname)?.title
            });
        }
    }, [isProd, isSet, location]);

    return (
        <Layout style={{height: '100%'}}>
            <Header style={{paddingInline: 0}}><Navbar/></Header> {/* TODO: better solution for padding? maybe fine */}
            <div className="App">
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/catalog' element={<Catalog/>}/>
                <Route path='/contact' element={<Contact/>}/>
            </Routes>
        </div>
        </Layout>
    );
}

export default App;

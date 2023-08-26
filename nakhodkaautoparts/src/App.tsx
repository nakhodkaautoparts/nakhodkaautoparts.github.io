import React from 'react';
import { Route, Routes } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { Header } from "antd/es/layout/layout";
import { Navbar } from "./components/Navbar";
import { Layout } from "antd";

function App() {
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

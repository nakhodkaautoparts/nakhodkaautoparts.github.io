import React from 'react';
import { Route, Routes } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { Header } from "antd/es/layout/layout";
import { Navbar } from "./components/Navbar";
import { Layout } from "antd";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function App() {
    return (
        <Layout style={{height: '100%'}}>
            <Header style={{paddingInline: 0}} css={headerStyle}><Navbar/></Header> {/* TODO: better solution for padding? maybe fine */}
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

const headerStyle = css`
  @media (max-width: 380px) {
    .ant-menu-item {
      margin-left: 0 !important;
    }
  }
`;
import React from 'react';
import './App.css';
import Home from "./pages/Home";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
        <Navbar />
        <Home />
    </div>
  );
}

export default App;

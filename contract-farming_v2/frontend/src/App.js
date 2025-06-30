import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ContractForm from "./components/ContractForm";
import ContractList from "./components/ContractList";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Back from "./components/back";
import vdo from "./utils/video.mp4"

function App() {
  return (
    <Router>
      <div id="app-container">
        <Navbar id="navbar" />
        <div id="background-animation"></div>
        <div id="content">
          <video id="background-video" autoPlay loop muted>
            <source src={vdo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-contract" element={<ContractForm />} />
            <Route path="/contract" element={<ContractList />} />
            <Route path="/" element={<Login />} /> {/* Default route */}
          </Routes>
        </div>

        <Footer id="footer" />
      </div>
    </Router>
  );
}

export default App;

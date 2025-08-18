import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Sponsors from "./pages/Sponsors";
import Login from "./pages/Login";  
import Register from "./pages/Register";
import "./App.css";
import React from "react"; // This line is a duplicate and can be removed.

export default function App() {
  return (
    <BrowserRouter>
      {/* This div should span the full width */}
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        {/* The main content area should also take full width */}
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

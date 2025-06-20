import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import ScrollToTop from "./Blocks/ScrollToTop/ScrollToTop";
import Footer from './Components/Footer/Footer';

export default function AppRouter() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/scanners" element={<Scanners />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PortfolioRoutes from './portfolioRoutes';
import Header from './components/Header';
import './App.css';

export default () => (
  <div className="min-h-[100vh] bg-[#1e2134]">
  <Router>
    <Header />
    <Routes>
      <Route path='/' element={<PortfolioRoutes />} />
    </Routes>
  </Router>
  </div>

);


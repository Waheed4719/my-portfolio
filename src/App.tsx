import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PortfolioRoutes from './portfolioRoutes';
import Header from './components/Header';
import './App.css';
import { DisplayModeProvider } from './contexts/DisplayModeContext';

export default () => (
  <DisplayModeProvider>
    <div className="min-h-[100vh] bg-[#1e2134] dark:bg-white">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<PortfolioRoutes />} />
        </Routes>
      </Router>
    </div>
  </DisplayModeProvider>


);


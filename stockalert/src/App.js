import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

import './App.css';

import HomePage from './pages/HomePage';
import StockSearchPage from './pages/StockSearchPage';
import Navigation from './components/Navigation';
import Particles from './components/Particles';

function App() {

  
  return (
    <>

      <header>
            <h1>ATHENA</h1>
            <p> Designed for Beginner Traders. Never Miss The RocketShip Up Again!</p>
      </header>
      <Particles />

      <Router>
        <Navigation />

        <Routes>      
              <Route path="/" element={<HomePage />} />
              <Route path="/stock-search" element={<StockSearchPage />} />
        </Routes>      
          

          <footer>
            <p>Copyright Statement: <cite>&copy; 2023 Sunny Patel</cite></p>
          </footer>
         
      </Router>
    </>
  );
}

export default App;

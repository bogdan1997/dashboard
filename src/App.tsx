import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/feature/Dashboard';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

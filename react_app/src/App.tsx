import React from 'react';

import { BrowserRouter  as Router, Route, Routes } from 'react-router-dom'
import Header from './layout/Header'
import Footer from './layout/Footer'

import Home from './pages/Home';

const App: React.FunctionComponent = () => {
  return (
    <div className="react-app">
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} ></Route> 
            </Routes>
          </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;

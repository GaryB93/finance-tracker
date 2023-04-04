import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import History from './History';
import Income from './Income';

class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Login />}/>
  
          <Route path="/home" element={<Home />}/>
  
          <Route path="/history" element={<History />}/>
          
          <Route path="/income" element={<Income />}/>
        </Routes>
      </div>
    )
  }
}

export default App;
import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import History from './History';
import Income from './Income';
import Expenses from './Expenses';

class App extends Component {
  render() {
    return (
      <div id="main-container">
        <h1>CashView</h1>
        <Routes>
          <Route path="/" element={<Login />}/>
  
          <Route path="/home" element={<Home />}/>
  
          <Route path="/history" element={<History />}/>
          
          <Route path="/income" element={<Income />}/>

          <Route path="/expenses" element={<Expenses />}/>
        </Routes>
      </div>
    )
  }
}

export default App;
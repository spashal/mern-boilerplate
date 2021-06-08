import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import Dashboard from './components/Dashboard'


function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout} />
        <Route path="/dashboard" component={Dashboard}/>
      </div>
    </Router>
  );
}

export default App;

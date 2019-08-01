import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NavBar from './components/nav/NavBar';
import HomePage from './components/HomePage';


const App = () => (
  <div>
    <NavBar />
    <Route exact path="/" component={HomePage} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </div>
)


export default App;

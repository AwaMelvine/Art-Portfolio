import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NavBar from './components/nav/NavBar';


const App = () => (
  <div>
    <NavBar />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </div>
)


export default App;

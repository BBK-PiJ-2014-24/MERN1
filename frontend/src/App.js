import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Users />
        </Route>
        <Route exact path='/places/new'>
          <NewPlace />
        </Route>
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
